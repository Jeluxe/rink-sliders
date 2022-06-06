import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledTitle } from "../styles/sc-title";


export default function Title({ socket }) {
    const navigate = useNavigate();
    const onclick = () => {
        socket.emit('clear room');
        navigate('/');
    }
    return (
        <StyledTitle><span onClick={onclick}>Rink Sliders</span></StyledTitle>
    )
}