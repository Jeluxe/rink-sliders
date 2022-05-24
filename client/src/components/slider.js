import React, { useEffect } from "react";
import Buttons from "./buttons";
import Player from './player';
import { checkValidDirections, borders, hideBtns } from '../functions';

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
                        animation(currentPlayer, direction);
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

const playerMove = (currentPlayer, tgt) => {
    hideBtns(currentPlayer.parentNode);
    currentPlayer.parentNode.removeChild(currentPlayer);
    tgt.append(currentPlayer);
}

const checkSurroundings = (turn, playerPos, tgt) => {
    let tgtPos = Number(tgt);
    if (playerPos - 7 === tgtPos && borders(tgtPos, 'up')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos + 7 === tgtPos && borders(tgtPos, 'down')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos - 1 === tgtPos && borders(tgtPos + 1, 'left')) {
        turn.pos = tgtPos;
        return true;
    }
    else if (playerPos + 1 === tgtPos && borders(tgtPos - 1, 'right')) {
        turn.pos = tgtPos;
        return true;
    } else {
        return false;
    }
}

const getDirectionType = (playerPos, tgtPos) => {
    if (playerPos - 7 === tgtPos) {
        return 'up';
    }
    else if (playerPos + 7 === tgtPos) {
        return 'down';
    }
    else if (playerPos - 1 === tgtPos) {
        return 'left';
    }
    else if (playerPos + 1 === tgtPos) {
        return 'right';
    }
}

const animation = (player, type) => {
    if (type === 'left') {
        player.style.transform = 'translateX(' + (-100) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (type === 'right') {
        player.style.transform = 'translateX(' + (100) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (type === 'up') {
        player.style.transform = 'translateY(' + (-100) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
    else if (type === 'down') {
        player.style.transform = 'translateY(' + (100) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
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