import styled from 'styled-components';

import { Button } from './Button';

export const Tertiary = styled(Button)`
  color: ${({ theme }) => theme.palette.text_inverted};
  background-color: transparent;

  &:hover, &:focus {
    color: ${({ theme }) => theme.palette.text};
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
