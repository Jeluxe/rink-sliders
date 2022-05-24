import React, { useEffect } from "react";
import { validBlock, getArray, hideBtns } from '../functions';
export default function Buttons({ socket, turn, setTurn, getWinner }) {

    useEffect(() => {
        socket.off('slider moving').on('slider moving', ({ srcPos, tgtPos, turn, counter, type }) => {
            try {
                counter = Number(counter);
                let block = document.querySelector(`.blocks:nth-child(${srcPos})`);
                let src = block.children[0];
                hideBtns(src.children[0]);
                let tgt = document.getElementsByClassName('blocks')[Number(tgtPos) - 1];
                if (src !== undefined) {
                    animation(src, counter, type)
                    src.ontransitionend = () => {
                        src.style.transform = null;
                        if (src.parentNode === block) {
                            block.removeChild(src);
                            tgt.append(src);
                            srcPos = tgt.id;
                            turn.pos = Number(tgtPos);

                            if (Number(turn.pos) === 25) {
                                return setTimeout(() => {
                                    getWinner(turn);
                                }, 500);
                            }

                            setTurn(turn);
                        }
                    }

                }
            } catch (error) {
                console.log(error)
            }
        });
    }, [socket, getWinner, setTurn]);

    const moveSlider = (e, type) => {
        e.stopPropagation();

        if (socket.id === turn.id) {
            let counter = 0;
            let num = null;
            let srcPos = Number(e.target.parentNode.parentNode.parentNode.id);

            if (type === 'up') {
                num = -7;
            }
            else if (type === 'down') {
                num = 7;
            }
            else if (type === 'left') {
                num = -1;
            }
            else if (type === 'right') {
                num = 1;
            } else {
                num = null;
            }
            let tempPos = srcPos;
            // eslint-disable-next-line 
            while (validBlock(tempPos + num) === true && !getArray(type).filter(number => number === tempPos).length) {
                tempPos += num;
                counter++;
            }
            socket.emit('move slider', { srcPos, tgtPos: Number(tempPos), turn, counter, type });
        }
    }

    return (
        <div className="btns">
            {[['up', 'rotate(270)'], ['down', 'rotate(90)'], ['left', 'rotate(180)'], ['right', 'rotate(0)']].map((set, idx) => {
                return <button type="button" key={idx} className={set[0] + 'Btn hide button'} onClick={(e) => moveSlider(e, set[0])}>
                    <svg width="20" height="20" viewBox="0 0 24 24" transform={set[1]}>
                        <path d="M22 12l-20 12 5-12-5-12z" />
                    </svg>
                </button>
            })}
        </div>
    )
}

const animation = (src, counter, type) => {
    if (type === 'left') {
        src.style.transform = 'translateX(' + (-111 * counter) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (type === 'right') {
        src.style.transform = 'translateX(' + (111 * counter) + 'px)';
        return 'translateX(' + (0) + 'px)';
    }
    else if (type === 'up') {
        src.style.transform = 'translateY(' + (-111 * counter) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
    else if (type === 'down') {
        src.style.transform = 'translateY(' + (111 * counter) + 'px)';
        return 'translateY(' + (0) + 'px)';
    }
}