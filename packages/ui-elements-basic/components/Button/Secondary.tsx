import styled from 'styled-components';

import { Button } from './Button';

export const Secondary = styled(Button)`
  color: ${({ theme }) => theme.palette.text};
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.palette.text_inverted};
  padding: 5px 28px;

  &:hover, &:focus {
    box-shadow: 0 2px 4px 0 ${({ theme }) => theme.palette.shadow};
    border-color: ${({ theme }) => theme.palette.text};
    cursor: pointer;
  }

  &:active {
    box-shadow:  0 2px 4px 0 ${({ theme }) => theme.palette.shadow};
    border-color: ${({ theme }) => theme.palette.active_lowered};
  }

  &:disabled {
    color: ${({ theme }) => theme.palette.inactive};
    border-color: ${({ theme }) => theme.palette.inactive};
    cursor: not-allowed;
  }
`;
