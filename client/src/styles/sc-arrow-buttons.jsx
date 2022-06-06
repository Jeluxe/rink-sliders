import styled from "styled-components";


const ArrowBtns = styled.button`
display: flex;
align-items: center;
justify-content: center;
padding: 0;
background: none;
border: none;
`

export const ButtonContainer = styled.div`
width: 100%;
height: 100%;
grid-area: btns;
display: grid;
grid-template-areas:
  ". upBtn ."
  "leftBtn . rightBtn"
  ". downBtn ."
`

export const UpBtn = styled(ArrowBtns)`
  align-items: flex-start;
  grid-area: upBtn;
`

export const DownBtn = styled(ArrowBtns)`
  align-items: flex-end;
  grid-area: downBtn;
`

export const LeftBtn = styled(ArrowBtns)`
  justify-content: flex-start;
  grid-area: leftBtn;
`

export const RightBtn = styled(ArrowBtns)`
  justify-content: flex-end;
  grid-area: rightBtn;
`