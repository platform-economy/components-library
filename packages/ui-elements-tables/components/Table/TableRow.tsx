import styled from 'styled-components';
import { isUndefined } from 'lodash';

const StyledTableRow = styled.tr`
  tbody > &:hover {
    background-color: ${({ onClick, theme }) => !isUndefined(onClick)
      ? theme.palette.midground
      : 'inherit'
    };
    cursor: ${({ onClick }) => !isUndefined(onClick) ? 'pointer' : 'inherit'};
  }
`;

export const TableRow = StyledTableRow;
