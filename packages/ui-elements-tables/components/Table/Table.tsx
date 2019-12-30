import React, { Component } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableExpandableRow } from './TableExpandableRow';
import { StyledTableHeaderCell, TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';

const StyledTable = styled.table`
  color: ${({ theme }) => theme.palette.text};
  border-collapse: collapse;
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 3px 0 ${({ theme }) => theme.palette.shadow};

  &.condensed {
    ${TableCell},
    ${StyledTableHeaderCell} {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
`;

export type TableProps = {
  condensed?: boolean;
  children?: React.ReactNode;
};

export class Table extends Component<TableProps> {
  static Header = TableHeader;
  static Body = TableBody;
  static Row = TableRow;
  static ExpandableRow = TableExpandableRow;
  static HeaderCell = TableHeaderCell;
  static Cell = TableCell;

  render() {
    const { condensed, children } = this.props;
    return (
      <StyledTable className={classnames({ condensed })} cellSpacing={0} cellPadding={0}>
        {children}
      </StyledTable>
    );
  }
}
