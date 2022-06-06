import styled from "styled-components";


export const ColorsContainer = styled.div`
display: flex;
align-items: center ;
margin: 20px 0;
height: 30px;
`

export const Color = styled.div`
margin: 10px;
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