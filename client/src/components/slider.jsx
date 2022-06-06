import React, { useEffect } from "react";
import Buttons from "./buttons";
import Player from './player';
import { playerMove } from '../event-functions';
import {
    checkValidDirections,
    getDirectionType,
    checkSurroundings,
    hideBtns,
    playerAnimation
} from '../functions';
import { StyledSlider } from "../styles/sc-slider";


export default function Slider({ socket, player, turn, setTurn, getWinner }) {
    useEffect(() => {
        socket.off('player moving').on('player moving', ({ turn, tgtPos }) => {
            let slider = null;
            let currentPlayer = document.querySelector(`[id='${turn.id}']`);
            let currentPlayerPos = currentPlayer.parentNode.parentNode.id;
            currentPlayerPos = Number(currentPlayerPos)
            tgtPos = Number(tgtPos);

            if (currentPlayerPos !== tgtPos) {
                try {
                    slider = document.querySelector(`.blocks:nth-child(${tgtPos})`).children[0];

                    if (slider && !slider.children[1] && checkSurroundings(turn, currentPlayerPos, tgtPos)) {
                        hideBtns(currentPlayer.parentNode);
                        const direction = getDirectionType(currentPlayerPos, tgtPos);
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
            socket.emit('move player', { turn, tgtPos });
        }
    }

    if (player) {
        return (
            <StyledSlider onClick={(e) => onClick(e)} >
                <Player player={player} />
                <Buttons socket={socket} turn={turn} setTurn={setTurn} getWinner={getWinner} />
            </StyledSlider>
        )
    }
    return (
        <StyledSlider onClick={(e) => onClick(e)} >
            <Buttons socket={socket} turn={turn} setTurn={setTurn} getWinner={getWinner} />
        </StyledSlider>
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