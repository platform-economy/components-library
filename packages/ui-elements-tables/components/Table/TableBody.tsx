import styled from 'styled-components';

const StyledTableBody = styled.tbody`
  background-color: ${({ theme }) => theme.palette.surface};
  font-size: .75em;

  > tr:not(:first-child) {
    border-top: solid 2px ${({ theme }) => theme.palette.midground}
  }
`;

export const TableBody = StyledTableBody;
