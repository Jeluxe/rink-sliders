import React, { useEffect } from "react";
import Buttons from "./buttons";
import Player from './player';
import { playerMove } from '../event-functions';
import {
    checkValidDirections,
    getDirectionType,
    hideBtns,
    playerAnimation
} from '../functions';

export default function Slider({ socket, player, turn, setTurn, getWinner }) {
    useEffect(() => {
        socket.off('player moving').on('player moving', ({ turn, currentPlayerID, tgtPos }) => {
            let slider = null;
            let currentPlayer = document.querySelector(`[id='${currentPlayerID}']`);
            let playerBlockPos = currentPlayer.parentNode.parentNode.id;
            playerBlockPos = Number(playerBlockPos)
            tgtPos = Number(tgtPos);

            if (playerBlockPos !== tgtPos) {
                try {
                    slider = document.querySelector(`.blocks:nth-child(${tgtPos})`).children[0];

                    if (slider && !slider.children[1] && checkSurroundings(turn, playerBlockPos, tgtPos)) {
                        hideBtns(currentPlayer.parentNode);
                        const direction = getDirectionType(playerBlockPos, tgtPos);
                        playerAnimation(currentPlayer, direction);
                        currentPlayer.addEventListener('transitionend', () => {
                            currentPlayer.style.transform = null;
                            playerMove(currentPlayer, slider);
                            checkValidDirections(tgtPos, slider);
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
        // eslint-disable-next-line
    }, [socket]);

    const onClick = ({ target: { parentNode: { parentNode: { id: tgtPos } } } }) => {
        if (socket.id === turn.id) {
            socket.emit('move player', { turn, currentPlayerID: turn.id, tgtPos });
        }
    }

    if (player) {
        return (
            <div className="sliders" onClick={(e) => onClick(e)} >
                <Player player={player} />
                <Buttons socket={socket} turn={turn} setTurn={setTurn} getWinner={getWinner} />
            </div>
        )
    }
    return (
        <div className="sliders" onClick={(e) => onClick(e)} >
            <Buttons socket={socket} turn={turn} setTurn={setTurn} getWinner={getWinner} />
        </div>
    )
}

// grid-template-areas:
//         ". upBtn ."
//         "leftBtn . rightBtn"
//         ". downBtn .";


// socket.emit('check-player', currentPlayer.id, cb)
// const cb = (answer) => {
//     console.log(answer);
//     return answer;
// }