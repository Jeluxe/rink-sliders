import React, { useEffect } from "react";
import { moveSlider } from '../event-functions';
import {
    hideBtns,
    sliderAnimation
} from '../functions';
import { ButtonContainer } from "../styles/sc-arrow-buttons";
//UpBtn, DownBtn, LeftBtn, RightBtn

export default function Buttons({ socket, turn, setTurn, getWinner }) {
    const buttons = [['up', 'rotate(270)'], ['down', 'rotate(90)'], ['left', 'rotate(180)'], ['right', 'rotate(0)']];

    useEffect(() => {
        socket.off('slider moving').on('slider moving', ({ srcPos, tgtPos, turn, counter, direction }) => {
            try {
                counter = Number(counter);
                let block = document.querySelector(`.blocks:nth-child(${srcPos})`);
                let src = block.children[0];
                hideBtns(src.children[0]);
                let tgt = document.getElementsByClassName('blocks')[Number(tgtPos) - 1];
                if (src !== undefined) {
                    sliderAnimation(src, counter, direction)
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

    return (
        <ButtonContainer>
            {buttons.map((set, idx) => {
                return <button type="button" key={idx} className={set[0] + 'Btn hide button'} onClick={(e) => moveSlider(e, socket, turn, set[0])}>
                    <svg width="20" height="20" viewBox="0 0 24 24" transform={set[1]}>
                        <path d="M22 12l-20 12 5-12-5-12z" />
                    </svg>
                </button>
            })}
        </ButtonContainer>
    )
}