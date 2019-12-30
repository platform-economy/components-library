import styled from 'styled-components';

export const Icon = styled.button`
  font-size: 1em;
  outline: none;
  text-align: center;
  vertical-align: middle;
  border: none;
  padding: 0px;
  transition: 100ms all ease-in-out;
  background-color: transparent;
  color: ${({ theme }) => theme.palette.text};

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover, &:focus {
    color: ${({ theme }) => theme.palette.active_hovered};
    cursor: pointer;
  }

  &:active {
    color: ${({ theme }) => theme.palette.active_lowered};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.inactive};
    cursor: not-allowed;
  }
`;
