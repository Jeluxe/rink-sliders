import React from "react";
import { useNavigate } from "react-router-dom";


export default function Title({ socket }) {
    const navigate = useNavigate();
    const onclick = () => {
        socket.emit('clear room');
        navigate('/');
    }
    return (
        <div id="title" style={{ width: '100%' }}><span onClick={onclick}>Rink Sliders</span></div>
    )
}