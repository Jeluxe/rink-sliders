import React from "react";

export default function Player({ player: { name, id, color } }) {
    return (
        <div
            id={id}
            key={id}
            className="player"
            style={{ backgroundColor: color }}>
            {name}
        </ div >
    )
}