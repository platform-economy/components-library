import styled from 'styled-components';

import { Button } from './Button';

export const Red = styled(Button)`
  color: ${({ theme }) => theme.palette.text_highlight};
  background-color: ${({ theme }) => theme.palette.negative};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.palette.negative_hovered};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
    cursor: pointer;
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.negative_lowered};
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.23);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.inactive};
    color: ${({ theme }) => theme.palette.text_inverted};
    cursor: not-allowed;
  }
`;
