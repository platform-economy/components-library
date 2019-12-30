import styled from 'styled-components';

const StyledTableHeader = styled.thead`
  background-color: ${({ theme }) => theme.palette.foreground};
  font-size: .875em;
`;

export const TableHeader = StyledTableHeader;
