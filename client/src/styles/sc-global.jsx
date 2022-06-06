import styled from "styled-components";


export const StyledButton = styled.button`
width: 80px;
height: 30px;
border: none;
border-radius: 5px;
box-shadow: 0 5px #999;
cursor: pointer;
outline: none;

&:active {
    box-shadow: 0 3px #666;
    transform: translateY(3px);
}
`

export const Input = styled.input`
width: 100%;
height: 30px;
font-size: large;
border: 1px solid black;
outline: 0;
border-radius: 5px;

&:focus {
    outline: 0;
    border: 1px solid rgba(81, 203, 238, 1);
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
}
`