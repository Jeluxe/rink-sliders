import React from "react";
import { StyledPlayer } from "../styles/sc-player";

export default function Player({ player: { name, id, color } }) {
    return (
        <StyledPlayer
            id={id}
            key={id}
            bg={color}>
            {name}
        </StyledPlayer >
    )
}