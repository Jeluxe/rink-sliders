import React from "react";
import { useNavigate } from "react-router-dom";
import { onKeyPress } from '../event-functions';

const style = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',

}

const style2 = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
    padding: '10px 40px',
    borderRadius: '25px',
    backgroundColor: '#ffff'
}

const style3 = {
    marginTop: '20px'
}

export default function Home({ socket }) {
    let navigate = useNavigate();

    return (
        <div style={style}>
            <div style={style2}>
                <div style={style3}>pick username:</div>
                <input id="input" placeholder="type here..." style={style3} onKeyPress={(e) => onKeyPress(e)} />
                <button type="button" id="join" onClick={() => onClick(socket, navigate)}>Join Room</button>
            </div>
        </div>
    )
}

const onClick = (socket, navigate) => {
    const input = document.getElementById('input');
    if (input.value.length >= 3) {
        socket.emit('join room', input.value, (type, msg) => {
            if (type === 'room') {
                navigate(`/waiting-page`);
            } else {
                alert(msg);
            }
        });
        input.value = '';
    }
}