import styled from "styled-components";

const commonScoreboardProps = styled.div`
display: flex;
justify-content: center;
`


export const ScoreboardContainer = styled(commonScoreboardProps)`
margin: 10px 0;
`

export const ScoreBoardPlayer = styled(commonScoreboardProps)`
flex-direction: column;
margin: 0 80px;
`

export const ScoreboardTimeContainer = styled(commonScoreboardProps)`
flex-direction: column;
margin: 0 80px;

@media (max-width: 768px) {
margin: 0;
}
`

export const StyledScoreboardElements = styled(commonScoreboardProps)`
font-size: larger;

@media (max-width: 768px) {
    font-size: 10px;
}
`
