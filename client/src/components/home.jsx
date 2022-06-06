import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onKeyPress } from '../event-functions';
import { Input } from "../styles/sc-global";
import { ChangeBtn, HomeContainer, HomeWrapper, JoinBtn } from "../styles/sc-home";
import Colors from "./colors";


export default function Home({ socket }) {
    let navigate = useNavigate();
    const [flag, setFlag] = useState(false);
    const [selectedColor, setSelectedColor] = useState('')
    const storedNickname = (window.localStorage.getItem('nickname')) ? JSON.parse(window.localStorage.getItem('nickname')) : '';

    useEffect(() => {
    }, [flag, selectedColor])

    const onClick = () => {
        const input = document.getElementById('input');
        if ((!storedNickname || flag) && input.value.length >= 3) {
            socket.emit('join room', input.value, selectedColor, (type, msg) => {
                if (type === 'room') {
                    window.localStorage.setItem('nickname', JSON.stringify(msg));
                    setFlag(false);
                    navigate(`/waiting-page`);
                }
                else if (type === 'error') {
                    alert(msg);
                }
            });
            input.value = '';
        } else {
            socket.emit('join room', storedNickname, selectedColor, (type, msg) => {
                if (type === 'room') {
                    navigate(`/waiting-page`);
                } else {
                    alert(msg);
                }
            });
        }
    }

    const getColor = (color) => {
        setSelectedColor(color);
    }

    return (
        <HomeContainer>
            <HomeWrapper>
                {(!storedNickname || flag) ?
                    <div style={{ margin: '10px 0' }}><b>pick username:</b></div> :
                    <div>Welcome back, {storedNickname}<ChangeBtn onClick={() => setFlag(true)}>change</ChangeBtn></div>
                }
                {(!storedNickname || flag) && <Input id="input" placeholder="type here..." onKeyPress={(e) => onKeyPress(e)} />}
                <Colors getColor={getColor} />
                <JoinBtn onClick={onClick}>Join Room</JoinBtn>
            </HomeWrapper>
        </HomeContainer>
    )
}