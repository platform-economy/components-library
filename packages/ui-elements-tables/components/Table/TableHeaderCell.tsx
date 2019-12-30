import React, { Component } from 'react';
import styled from 'styled-components';
import { isUndefined } from 'lodash';
import classnames from 'classnames';

export enum SortOrder {
  None,
  ASC,
  DESC,
}

const logInvalidSortOrder = (invalidOrder: never) => {
  console.error(`Invalid sort order: ${invalidOrder}`);
};

export const getNextSortOrder = (order: SortOrder) => {
  switch (order) {
    case SortOrder.None:
      return SortOrder.ASC;
    case SortOrder.ASC:
      return SortOrder.DESC;
    case SortOrder.DESC:
      return SortOrder.None;
    default:
      logInvalidSortOrder(order);
      return SortOrder.None;
  }
};

export const StyledTableHeaderCell = styled.th`
  transition: padding .5s;
  padding: 22px 16px;
  user-select: none;
  text-align: left;

  &&:first-child {
    padding-left: 30px;
  }

  &&:last-child {
    padding-right: 30px;
  }

  &.active {
    color: ${({ theme }) => theme.palette.active};
  }

  &.short {
    width: 1px;
    white-space: nowrap;
    text-align: center;
  }

  &.clickable:hover {
    color: ${({ theme }) => theme.palette.active_hovered};
    cursor: pointer;
  }
`;

const StyledSortIcon = styled.div`
  display: inline-block;
  margin-left: 5px;
  font-size: .75em;
  vertical-align: top;
`;

export type Sort = {
  columnId: string;
  sortOrder: SortOrder;
};

export type SortIcons = {
  None: React.ReactNode;
  ASC: React.ReactNode;
  DESC: React.ReactNode;
};

export type TableHeaderCellProps = {
  short?: boolean;
  columnId?: string;
  sortOrder?: SortOrder;
  onSortChanged?: (newSort: Sort, e: React.SyntheticEvent) => void;
  sortIcons?: SortIcons;
};

export class TableHeaderCell extends Component<TableHeaderCellProps> {
  handleClick = (e: React.SyntheticEvent) => {
    const { columnId = '', sortOrder, onSortChanged } = this.props;

    if (!isUndefined(sortOrder) && !isUndefined(onSortChanged)) {
      const nextSortOrder: SortOrder = getNextSortOrder(sortOrder);
      const sort: Sort = {
        columnId,
        sortOrder: nextSortOrder,
      };

      onSortChanged(sort, e);
    }
  }

  renderIcon = () => {
    const { sortIcons, sortOrder } = this.props;

    if (isUndefined(sortIcons) || isUndefined(sortOrder)) {
      return;
    }

    const sortIcon = sortIcons[SortOrder[sortOrder]];

    return <StyledSortIcon>{sortIcon}</StyledSortIcon>;
  }

  render() {
    const { short, children, sortOrder, onSortChanged } = this.props;

    return (
      <StyledTableHeaderCell
        className={classnames({
          clickable: !!onSortChanged,
          active: !!sortOrder,
          short: !!short,
        })}
        onClick={this.handleClick}
      >
        {children}
        {this.renderIcon()}
      </StyledTableHeaderCell>
    );
  }
}
