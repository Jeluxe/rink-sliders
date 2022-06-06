import styled from 'styled-components';
import { StyledButton } from './sc-global';


export const ModalContainer = styled.div`
z-index: 1000;
position: absolute;
width: 100vw;
height: 100vh;
font-weight: bold;
`

export const Overlay = styled.div`
pointer-events: none;
position: absolute;
width: 100vw;
height: 100vh;
background-color: rgba(83, 83, 83, 0.219);
`

export const ModalWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 700px;
`

export const Modal = styled.div`
margin: auto;
position: absolute;
background: white;
border: none;
border-radius: 5px;
width: 200px;
display: flex;
flex-direction: column;
box-shadow: 0 0 4px 1px;
`

export const PlayerStatusContainer = styled.div`
font-size: 16px;
font-weight: 700;
display: flex;
justify-content: space-evenly;
`

export const WinnerName = styled.div`
display: flex;
justify-content: center;
margin: 10px 0;
`

export const PlayerStatusWrapper = styled.div`
display: flex;
flex-direction: column;  
align-items: center;
`

export const Status = styled.div`
box-shadow: 0 0 3px 1px inset black;
padding: 3px 10px;
margin-left: 10px;
border-radius: 10px;

${({ color }) => `color: ${color}`}
`

export const ModalBtnsWrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin: 20px 0;
`

export const RematchBtn = styled(StyledButton)`
background-color: #03a503;

&:hover,&:active {
    background-color: green;
}
`

export const LeaveBtn = styled(StyledButton)`
background-color: red;

&:hover,&:active {
    background-color: #b90101;
}
`