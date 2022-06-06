import styled from "styled-components";


export const ColorsContainer = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
margin-top: 20px;
height: 30px;
height: 100%;

`

export const ColorsWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`

export const Color = styled.div`
margin: 0 10px;
width: 25px;
height: 25px;
border-radius: 50%;

${({ bg }) => `background-color: ${bg}`};
${({ flag }) => (flag) ? `border: none; outline: none;` : ``};
`

export const ColorPicker = styled.input.attrs(() => ({ type: 'color' }))`
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
background-color: transparent ;
margin: 10px 0 5px  10px ;
border-radius: 50%;
width: 35px;
height: 35px;
border: none;

&::-webkit-color-swatch {
border-radius: 50%;
border: none;
}

&::-moz-color-swatch {
border-radius: 50%;
border: none;
}

${({ flag }) => (flag) ? `
border: 4px solid white;
outline: 2px solid orange;
`: `
border: none;
outline: none;
`}
`