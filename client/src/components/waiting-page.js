import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
}

const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    borderRadius: '5px',
    fontSize: '20px',
    backgroundColor: '#fdecbc'
}

export default function WaitingPage({ socket }) {
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('move to game', (roomID) => {
            navigate(`/game/${roomID}`);
        })
    }, [socket, navigate])

    socket.on('joined the room', (room) => {
        if (room.usersLen === 2) {
            socket.emit('move to game', room.id)
        }
    })

    return (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                <div>waiting for another player to join</div>
                <div> please wait . . . </div>
            </div>
        </div>
    )
}