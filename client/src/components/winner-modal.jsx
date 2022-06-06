import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPlayerStatus } from '../functions';
import {
    ModalContainer,
    ModalWrapper,
    Modal,
    ModalBtnsWrapper,
    Overlay,
    WinnerName,
    PlayerStatusContainer,
    PlayerStatusWrapper,
    Status,
    RematchBtn,
    LeaveBtn,
} from '../styles/sc-winner-modal';


export default function WinnerModal({ socket, winner, players, rematch }) {
    const navigate = useNavigate();
    const [player1Status, setPlayer1Status] = useState('waiting');
    const [player2Status, setPlayer2Status] = useState('waiting');

    useEffect(() => {
        socket.off('rematching').on('rematching', (player) => {
            if (player.id === players[0].id) {
                setPlayer1Status('Ready');
            }
            else {
                setPlayer2Status('Ready');
            }
        })

        socket.off('leaving').on('leaving', (player) => {
            if (player.id === players[0].id) {
                setPlayer1Status('Left');
            }
            else {
                setPlayer2Status('Left');
            }
        })
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        if (player1Status === 'Ready' && player2Status === 'Ready') {
            setPlayer1Status('waiting');
            setPlayer2Status('waiting');
            document.getElementById('mc').classList.add('hide');
            rematch();
        }
        else if (player1Status === 'Left' || player2Status === 'Left') {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [player1Status, player2Status]);

    const onReady = () => {
        if (socket.id === players[0].id) {
            socket.emit('rematch', players[0]);
        }
        else {
            socket.emit('rematch', players[1]);
        }
    }

    const onLeave = () => {
        if (socket.id === players[0].id) {
            socket.emit('leave', players[0]);
        }
        else {
            socket.emit('leave', players[1]);
        }
        socket.emit('clear room');
    }

    return (
        <ModalContainer>
            <Overlay />
            <ModalWrapper>
                <Modal>
                    <WinnerName>Winner:  {winner.name}</WinnerName>
                    <PlayerStatusContainer>
                        <PlayerStatusWrapper>
                            {players[0].name}:
                            <Status color={checkPlayerStatus(player1Status)}>
                                {player1Status}
                            </Status>
                        </PlayerStatusWrapper>
                        <PlayerStatusWrapper>
                            {players[1].name}:
                            <Status color={checkPlayerStatus(player2Status)}>
                                {player2Status}
                            </Status>
                        </PlayerStatusWrapper>
                    </PlayerStatusContainer>
                    <ModalBtnsWrapper>
                        <RematchBtn onClick={onReady}>Ready</RematchBtn>
                        <LeaveBtn onClick={onLeave}>Leave</LeaveBtn>
                    </ModalBtnsWrapper>
                </Modal>
            </ModalWrapper>
        </ModalContainer>
    )
}