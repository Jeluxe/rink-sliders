import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPlayerStatus } from '../functions';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}


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
            document.getElementById('component-container').classList.add('hide');
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
        <div id='component-container' className='hide'>
            <div id="overlay">
            </div>
            <div className='modal-container'>
                <div className='modal'>
                    <div className='winner'>
                        <div><b>Winner:  {winner.name}</b></div>
                    </div>
                    <div className='player-status-title'>
                        <div style={style}>{players[0].name}: <span className='status' style={{ color: checkPlayerStatus(player1Status) }}><b>{player1Status}</b></span></div>
                        <div style={style}>{players[1].name}: <span className='status' style={{ color: checkPlayerStatus(player2Status) }}> <b>{player2Status}</b></span></div>
                    </div>
                    <div className="modal-btns">
                        <button id="rematch" type='button' onClick={onReady}><b>Ready</b></button>
                        <button id="leave" type='button' onClick={onLeave}><b>Leave</b></button>
                    </div>
                </div>
            </div>
        </div>
    )
}