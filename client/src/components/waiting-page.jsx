import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper } from "../styles/sc-waiting-page";


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
        <Container>
            <Wrapper>
                <div>waiting for another player to join</div>
                <div> please wait . . . </div>
            </Wrapper>
        </Container>
    )
}