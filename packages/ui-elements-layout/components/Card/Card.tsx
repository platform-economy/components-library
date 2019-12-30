import styled from 'styled-components';

export const Card = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.palette.surface};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 10px;
`;
