import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBoard, checkValidDirections } from '../functions';
import { BoardContainer, BoardWrapper } from '../styles/sc-board';
import Scoreboard from './scoreboard';
import WinnerModal from './winner-modal';


export default function Board({ socket }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [startingPlayer, setStartingPlayer] = useState(null);
    const [turn, setTurn] = useState(null);
    const [turnFlag, setTurnFlag] = useState(false);
    const [player1Moves, setPlayer1Moves] = useState(0);
    const [player2Moves, setPlayer2Moves] = useState(0);
    const [winner, setWinner] = useState(null);


    useEffect(() => {
        if (socket.connected === false) {
            navigate('/');
        }
        socket.off('user disconnected').on('user disconnected', (user) => {
            console.log(`${user} has disconnected and you will be transfer back to the lobby`);
            navigate(`/`);
        });

        socket.off('getting data').on('getting data', (users) => {
            if (users) {
                let flag = true;
                users.forEach(({ username: name, id, color }) => {
                    let player;

                    if (!startingPlayer || (player1 && startingPlayer !== player2)) {
                        if (flag) {
                            player = { name, id, pos: 1, color: color || 'red' }
                            setPlayer1(player);
                            setStartingPlayer(player);
                            flag = false;
                        } else {
                            player = { name, id, pos: 49, color: color || 'lightblue' }
                            setPlayer2(player);
                        }
                    } else {
                        if (flag) {
                            player = { name, id, pos: 49, color: color || 'lightblue' }
                            setPlayer2(player);
                            setStartingPlayer(player);
                            flag = false;
                        } else {
                            player = { name, id, pos: 1, color: color || 'red' }
                            setPlayer1(player);
                        }
                    }
                });
            }
        });

        socket.off('changing turn').on('changing turn', (nextPlayer) => {
            checkValidDirections(Number(nextPlayer.pos), document.getElementById(`${nextPlayer.id}`).parentNode);
        });

        socket.off('winner').on('winner', (winner) => {
            setWinner(winner);
        })
        // eslint-disable-next-line
    }, [socket]);

    useEffect(() => {
        socket.emit('starting game', id)
        // eslint-disable-next-line
    }, [id]);

    // useEffect(() => { }, [player1, player2, turnFlag, turn, winner])

    useEffect(() => {
        if (startingPlayer) {
            setTurn(startingPlayer)

            if (startingPlayer === player2) {
                setTurnFlag(true);
            } else {
                setTurnFlag(false);
            }
        }
        // eslint-disable-next-line
    }, [startingPlayer]);

    useEffect(() => {
        socket.emit('player move counter', player1Moves, player2Moves);
        // eslint-disable-next-line  
    }, [player1Moves, player2Moves]);

    const newTurn = (currentPlayer) => {
        let nextPlayer;
        if (turnFlag) {
            setPlayer2(currentPlayer);
            setPlayer2Moves(player2Moves + 1);
            nextPlayer = player1;
        } else {
            setPlayer1(currentPlayer);
            setPlayer1Moves(player1Moves + 1);
            nextPlayer = player2;
        }
        setTurnFlag(current => !current);
        setTurn(nextPlayer);
        socket.emit('change turn', nextPlayer);
    }

    const getWinner = (player) => {
        socket.emit('set winner', player);
    }

    const rematch = () => {
        setTurn(null);
        setWinner(null);
        setPlayer1Moves(0);
        setPlayer2Moves(0);
        (startingPlayer.id === player1.id) ? setStartingPlayer(player2) : setStartingPlayer(player1);
    }

    return (
        <BoardContainer>
            {
                turn &&
                <>
                    <Scoreboard players={[player1.name, player2.name]} moves={[player1Moves, player2Moves]} winner={winner} />
                    <BoardWrapper>{(turn) ? createBoard(socket, player1, player2, turn, newTurn, getWinner) : <div>no users</div>}</BoardWrapper>
                </>
            }
            {winner && <WinnerModal socket={socket} winner={winner} players={[player1, player2]} rematch={rematch} />}
        </BoardContainer>
    )
}