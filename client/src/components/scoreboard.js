import React, { useEffect, useState } from "react";


export default function Scoreboard({ players, moves, winner }) {
    // eslint-disable-next-line
    let x = null;
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
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            <div className="scoreboard-players">
                <div className="scoreboard-name">
                    <b>player1: {players[0]}</b>
                </div>
                <div className="scoreboard-moves">
                    <b>moves: {moves[0]}</b>
                </div>
            </div>
            <div className="scoreboard-time-container">
                <div className="scoreboard-time-title"><b>time:</b></div>
                <div id="timer" className="scoreboard-time">{displayTime}</div>
            </div>
            <div className="scoreboard-players">
                <div className="scoreboard-name">
                    <b>player2: {players[1]}</b>
                </div>
                <div className="scoreboard-moves">
                    <b>moves: {moves[1]}</b>
                </div>
            </div>
        </div>
    )
}