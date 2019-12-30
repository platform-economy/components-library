import styled from 'styled-components';

export type TableCellProps = {
  align?: 'left' | 'center' | 'right';
};

const StyledTableCell = styled.td<TableCellProps>`
  transition: padding .5s;
  padding: 18px 16px;
  text-align: ${({ align }) => align || 'initial'};

  &:first-child {
    padding-left: 30px;
  }

  &:last-child {
    padding-right: 30px;
  }
`;

export const TableCell = StyledTableCell;
