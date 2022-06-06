import styled from "styled-components";


export const StyledPlayer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50px;
height: 50px;
position: absolute;
border: none;
border-radius: 15px;
font-size: 15px;
pointer-events: none;
transition: transform 1.5s;
grid-template: player;

${({ bg }) => `background-color: ${bg}`};

@media (max-width: 768px) {
width: 15px;
height: 15px;
font-size: 7px;
border-radius: 5px;
}
`