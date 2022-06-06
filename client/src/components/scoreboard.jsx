import React, { useEffect, useState } from "react";
import { ScoreboardContainer, ScoreboardTimeContainer, ScoreBoardPlayer, StyledScoreboardElements } from "../styles/sc-scoreboard";


export default function Scoreboard({ players, moves, winner }) {
    const [displayTime, setDisplayTime] = useState('');

    useEffect(() => {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        const interval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            let secs = (seconds < 10) ? "0" + seconds : "" + seconds;
            let mins = (minutes < 10) ? "0" + minutes : "" + minutes;
            let hrs = (hours < 10) ? "0" + hours : "" + hours;
            if (!winner) {
                setDisplayTime(hrs + ':' + mins + ':' + secs);
            }
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, [winner])

    return (
        <ScoreboardContainer>
            <ScoreBoardPlayer>
                <StyledScoreboardElements id="player1-name"><b>player1: {players[0]}</b></StyledScoreboardElements>
                <StyledScoreboardElements id="player1-moves"><b>moves: {moves[0]}</b></StyledScoreboardElements>
            </ScoreBoardPlayer>
            <ScoreboardTimeContainer>
                <StyledScoreboardElements id="time-title"><b>time:</b></StyledScoreboardElements>
                <StyledScoreboardElements id="time">{displayTime}</StyledScoreboardElements>
            </ScoreboardTimeContainer>
            <ScoreBoardPlayer>
                <StyledScoreboardElements id="player2-name"><b>player2: {players[1]}</b></StyledScoreboardElements>
                <StyledScoreboardElements id="player2-moves"><b>moves: {moves[1]}</b></StyledScoreboardElements>
            </ScoreBoardPlayer>
        </ScoreboardContainer>
    )
}