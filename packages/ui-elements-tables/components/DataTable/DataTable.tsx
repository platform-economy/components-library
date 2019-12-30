import * as React from 'react';

import {
  Table,
  TableProps,
  TableHeaderCellProps,
} from '../Table';

import { RowDetails, DetailItem } from '../RowDetails';

export type ColumnType<TRow> = TableHeaderCellProps & {
  caption?: string;
  type?: 'control' | 'checkbox' | 'empty',
  align?: 'center' | 'left' | 'right';
  sortProps?: TableHeaderCellProps;
  renderCell: ({}:TRow, handler: HandlerType) => React.ReactNode;
  renderCaption?: ((headerHandler: HeaderHandlerType) => React.ReactNode);
};

export type HandlerType = {
  checked: boolean;
  expanded: boolean;
  setChecked:(checked:boolean) => void;
  toggleExpanded:() => void;
};

export type HeaderHandlerType = {
  checked?: boolean | null;
  expanded?: boolean | null;
  setChecked:(checked:boolean | null) => void;
  toggleExpanded:() => void;
};

export type RowId = string | number;

export type DataTableProps<TRow> = TableProps & {
  columns: ColumnType<TRow>[],
  rows: TRow[],
  checkboxIcon?: React.ReactNode;
  expanded?: boolean;
  getDetails?: (({}:TRow) => DetailItem[]);
  renderDetails?: ({}:TRow) => React.ReactNode;
  getRowId: ({}:TRow) => RowId;
  checkedItems?: RowId[];
  onCheckedItemsChange?: (items: RowId[]) => void;
  expandedItems?: RowId[];
  onExpandedItemsChange?: (items: RowId[]) => void;
};

export const renderDetailsInternally = (data?:DetailItem[] | null) => {
  if (data) {
    return <RowDetails data={data} />;
  } return <div>No Details to show</div>;
};

export const checkItem = (rowId: RowId, checkedItems?: RowId[]) => {
  const items = new Set(checkedItems);
  const hasValue = items.has(rowId);
  if (!hasValue) {
    items.add(rowId);
  } return [...items.values()];
};

export const uncheckItem = (rowId: RowId, checkedItems?: RowId[]) => {
  const items = new Set(checkedItems);
  items.delete(rowId);
  return [...items.values()];
};

export const isRowExpanded = (
  rowId:RowId,
  expandedItems?: RowId[],
  expanded?:boolean,
) => {
  if (expanded) {
    return true;
  }
  if (expandedItems
      && expandedItems.indexOf(rowId) !== -1) {
    return true;
  } return false;
};

export const toggleExpand = (
    rowId: RowId,
    changeHandler?: (items: RowId[]) => void,
    expandedItems?: RowId[],
  ) => {
  const items = new Set(expandedItems);
  const hasValue = items.has(rowId);
  if (!hasValue && changeHandler) {
    items.add(rowId);
    changeHandler([...items.values()]);
  } else if (hasValue && changeHandler) {
    items.delete(rowId);
    changeHandler([...items.values()]);
  }
};

export const toggleExpandAll = (
  changeHandler?: (items: RowId[]) => void,
  rowIds?: RowId[],
  expandedItems?: RowId[],
  ) => {
  const items = new Set(expandedItems);
  const some = rowIds && rowIds.some((item) => {
    return items.has(item);
  });
  const contains = rowIds && rowIds.every((item) => {
    return items.has(item);
  });

  if (contains) {
    rowIds && rowIds.forEach(item => items.delete(item));
  } else if (some) {
    rowIds && rowIds.forEach(item => items.add(item));
  } else {
    rowIds && rowIds.forEach(item => items.add(item));
  }
  changeHandler && changeHandler([...items.values()]);
};

export const checkAll = (
      checkedItems?: RowId[],
      rowIds?:RowId[],
      changeHandler?: (items: RowId[]) => void,
    ) => {
  const items = new Set(checkedItems);
  rowIds && rowIds.forEach((row) => {
    if (!items.has(row)) {
      items.add(row);
    }
  });
  changeHandler && changeHandler([...items.values()]);
};

export const uncheckAll = (
      checkedItems?: RowId[],
      rowIds?:RowId[],
      changeHandler?: (items: RowId[]) => void,
) => {
  const items = new Set(checkedItems);
  rowIds && rowIds.forEach((row) => {
    if (items.has(row)) {
      items.delete(row);
    }
  });
  changeHandler && changeHandler([...items.values()]);
};

export const controlIndeterminate = (items: RowId[], rows:RowId[]) => {
  const dif:RowId[] = [];
  rows.forEach((row) => {
    items.indexOf(row) === -1 ? dif.push(row) : null;
  });

  if (dif.length === 0) {
    return true;
  }
  if (dif.length < rows.length) {
    return null;
  }return false;
};

export class DataTable<TRow> extends React.Component<DataTableProps<TRow>> {

  private renderColumns = () => {
    const {
      columns,
      checkedItems,
      expandedItems,
      rows,
      onCheckedItemsChange,
      onExpandedItemsChange,
      getRowId,
    } = this.props;
    const headerHandler = {
      checked: checkedItems
        && controlIndeterminate(
          checkedItems,
          rows.map(row => getRowId(row)),
        ),
      expanded: expandedItems
          && controlIndeterminate(
            expandedItems,
            rows.map(row => getRowId(row)),
            ),
      setChecked: (checked:boolean | null) => (
        checked === true
        ? checkAll(
          checkedItems,
          rows.map(row => getRowId(row)),
          onCheckedItemsChange)
        : uncheckAll(
          checkedItems,
          rows.map(row => getRowId(row)),
          onCheckedItemsChange)
      ),
      toggleExpanded: () => toggleExpandAll(
        onExpandedItemsChange,
        rows.map(row => getRowId(row)),
        expandedItems,
      ),
    };
    return columns.map((column, i) => {
      switch (column.type) {
        case 'empty':
          return (
            <Table.HeaderCell
              short={column.short}
              key={i}
              columnId={column.columnId}
              {...this.props}
            >
              &nbsp;
            </Table.HeaderCell>);
        case 'checkbox':
          return (
            <Table.HeaderCell
              short={column.short}
              key={i}
              columnId={column.columnId}
            >
              {(column.renderCaption && typeof column.renderCaption === 'function')
                ? column.renderCaption(headerHandler)
                : column.caption}
            </Table.HeaderCell>);
        case 'control':
          return (
            <Table.HeaderCell
              short={column.short}
              key={i}
              columnId={column.columnId}
              {...this.props}
            >
              {(column.renderCaption && typeof column.renderCaption === 'function')
                ? column.renderCaption(headerHandler)
                : column.caption}
            </Table.HeaderCell>);
        default:
          return (
            <Table.HeaderCell
              short={column.short}
              key={i}
              columnId={column.columnId}
              {...this.props}
              {...column.sortProps}
            >
              {(column.renderCaption && typeof column.renderCaption === 'function')
                ? column.renderCaption(headerHandler)
                : column.caption}
            </Table.HeaderCell>);
      }
    });
  }

  private renderTable = () => {
    return (
      <Table {...this.props}>
        <Table.Header>
          <Table.Row>
            {this.renderColumns()}
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {this.renderRows()}
        </Table.Body>
      </Table>
    );
  }

  private renderRows = () => {
    const {
      rows,
      getDetails,
      getRowId,
      renderDetails,
      expandedItems,
      expanded,
    } = this.props;
    return rows.map((row: TRow) => {
      const rowId = getRowId(row);
      if (!getDetails && !renderDetails) {
        return (
          <Table.Row
            key={rowId}
            {...this.props}
          >
            {this.renderCell(row)}
          </Table.Row>
        );
      } return (
        <Table.ExpandableRow
          key={rowId}
          renderContent={renderDetails
            ? renderDetails
            : renderDetailsInternally}
          renderData={getDetails ? getDetails(row) : row}
          {...this.props}
          expanded={
            isRowExpanded(getRowId(row), expandedItems, expanded)
          }
        >
          {this.renderCell(row)}
        </Table.ExpandableRow>
      );
    });
  }

  private renderCell = (row:TRow) => {
    const {
      columns,
      checkedItems,
      expandedItems,
      onExpandedItemsChange,
      getRowId,
    } = this.props;
    const handler = {
      checked: (checkedItems
        ? checkedItems.indexOf(getRowId(row)) !== -1
        : false),
      expanded: (expandedItems
        ? expandedItems.indexOf(getRowId(row)) !== -1
        : false),
      setChecked: (checked:boolean) => checked
      ? this.checkItem(row)
      : this.uncheckItem(row),
      toggleExpanded: () => toggleExpand(
        getRowId(row),
        onExpandedItemsChange,
        expandedItems,
        ),
    };
    return columns.map(column => (
      <Table.Cell
        key={column.columnId}
        align={column.align}
      >
        {column.renderCell(row, handler)}
      </Table.Cell>
    ));
  }

  private checkItem(row: TRow) {
    this.props.onCheckedItemsChange && this.props.onCheckedItemsChange(
      checkItem(this.props.getRowId(row), this.props.checkedItems));
  }

  private uncheckItem(row: TRow) {
    this.props.onCheckedItemsChange && this.props.onCheckedItemsChange(
      uncheckItem(this.props.getRowId(row), this.props.checkedItems));
  }

  render() {
    return this.renderTable();
  }
}
