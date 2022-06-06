import styled from "styled-components";
import { StyledButton } from "./sc-global";


export const HomeContainer = styled.div`
display: flex;
width: 100%;
justify-content: center;
`

export const HomeWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 30px;
padding: 10px 40px;
border-radius: 25px;
background-color: #ffff;
`

export const JoinBtn = styled(StyledButton)`
margin: 15px 0 10px 0;
color: black;
background-color: #99b9f3;

&:hover,&:active {
background-color: #679cfd;
}
`
export const ChangeBtn = styled.div`
display: flex;
justify-content: center;
color: blue;
background: transparent;
cursor: pointer;
text-decoration: underline;
` 