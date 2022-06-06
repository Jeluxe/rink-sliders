import styled from 'styled-components';


{/* <Tab color={this.state.color} onClick={this.handleButton}></Tab> */ }

const Tab = styled.button`
  width: 100%;
  outline: 0;
  border: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
  line-height: 0.2;

  ${({ color }) => color && `
    background: ${color};
  `}
`;