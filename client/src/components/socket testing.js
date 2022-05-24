import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Testing({ socket }) {
    const navigate = useNavigate();

    if (!socket) {
        navigate('/')
    }

    useEffect(() => {
        socket.off('user disconnected').on('user disconnected', (msg) => {
            console.log(msg)
            socket.disconnect()
            navigate('/');
        })
    }, [socket, navigate])

    const disconnect = () => {
        socket.emit('user disconnecting');
    }

    return (
        <div>
            <button type='button' onClick={disconnect}>disconnect</button>
        </div>
    )
}