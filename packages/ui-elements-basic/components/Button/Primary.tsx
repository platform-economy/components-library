import styled from 'styled-components';

import { Button } from './Button';

export const Primary = styled(Button)`
  color: ${({ theme }) => theme.palette.text_highlight};
  background-color: ${({ theme }) => theme.palette.active};
  box-shadow: 0 1px 3px 0 ${({ theme }) => theme.palette.shadow};

  &:hover, &:focus {
    background-color: ${({ theme }) => theme.palette.active_hovered};
    cursor: pointer;
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.active_lowered};
    box-shadow: 0 0 3px 0 ${({ theme }) => theme.palette.shadow};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.active_disabled}; ;
    color: ${({ theme }) => theme.palette.text_inverted};
    cursor: not-allowed;
  }
`;
