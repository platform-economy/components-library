import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { DataTable, DataTableProps, ColumnType } from './index';
import { Sort } from '@relayr/ui-elements-tables';
import { CheckBox } from '@relayr/ui-elements-basic/components/CheckBox';
import { Button } from '@relayr/ui-elements-basic/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import {
  faCaretUp,
  faCaretDown,
  faCompressArrowsAlt,
  faExpandArrowsAlt,
  faInfoCircle,
  faPlayCircle,
  faPauseCircle,
  faExclamationCircle,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

import { SortOrder } from '../Table';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

import styled from 'styled-components';

import { DetailItem } from '../RowDetails';

const sortIcons = {
  None: <FontAwesomeIcon icon={faCaretDown} />,
  ASC: <FontAwesomeIcon icon={faCaretDown} />,
  DESC: <FontAwesomeIcon icon={faCaretUp} />,
};

const selectSortOrder = {
  None: SortOrder.None,
  ASC: SortOrder.ASC,
  DESC: SortOrder.DESC,
};

type RowItem = {
  status: string;
  id: string;
  details?: DetailItem[],
  creation_time: number,
  name: string,
};

type TRow = unknown;

const handleSortChange = (newSort: Sort, e: React.MouseEvent) => {
  actionWithoutEvent('onSortChanged')([newSort]);
};

const renderDetails = (data) => {
  return JSON.stringify(data.details);
};

const getDetails = (data:RowItem) => data.details;

const sortProps = (sortKnob:SortOrder) => {
  return {
    sortIcons,
    onSortChanged: handleSortChange,
    sortOrder: sortKnob,
  };
};

const StatusIndicator = styled.span`
  height: 1em;
  width: 1em;
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.text_inverted};
  &.success {
    color: ${({ theme }) => theme.palette.positive};
  }
  &.failed {
    color: ${({ theme }) => theme.palette.negative};
  }
  &.pending {
    color: ${({ theme }) => theme.palette.warning};
  }
  &.scheduled {
    color: ${({ theme }) => theme.palette.active};
  }
`;

const renderStatusColor = (status) => {
  switch (status) {
    case 'Success':
      return (
        <StatusIndicator className="success">
          <FontAwesomeIcon icon={faCheckCircle} />
        </StatusIndicator>);
    case 'Failed':
      return (
        <StatusIndicator className="failed">
          <FontAwesomeIcon icon={faExclamationCircle} />
        </StatusIndicator>);
    case 'Pending':
      return (
        <StatusIndicator className="pending">
          <FontAwesomeIcon icon={faPauseCircle} />
        </StatusIndicator>);
    case 'Scheduled':
      return (
        <StatusIndicator className="scheduled">
          <FontAwesomeIcon icon={faPlayCircle} />
        </StatusIndicator>);
  }
};

const detailsData = [
  { key: 'Status', value: 'Pending' },
  { key: 'Name', value: 'Daily Report' },
  { key: 'Creation time', value: '05-03-2019 11:45 AM' },
  { key: 'Completed at', value: '-' },
  { key: 'Length', value: '2134 records (120KB)' },
  { key: 'Created by', value: `Kevin Homealone,
                    first of his name,
                    king of the McCallisters,
                    protector of the home` },
];

const TableIconButton = (handler, icon) => (
    <Button.Icon
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => {
        handler.toggleExpanded();
      }}
    >
      <FontAwesomeIcon icon={icon} style={{ cursor: 'pointer' }} />
    </Button.Icon>
);

const columns: ColumnType<RowItem>[] = [
  { type: 'checkbox',
    short: true, columnId: 'c0',
    renderCell: (data, handler) => (
      <CheckBox onValueChange={handler.setChecked} value={handler.checked}/>
    ),
    renderCaption: headerHandler => (
      <CheckBox onValueChange={headerHandler.setChecked} value={headerHandler.checked}/>
    ),
  },
  {
    sortProps: sortProps(selectSortOrder.None),
    columnId: 'status',
    renderCell: data => data.status,
    caption: 'Status',
  },
  {
    sortProps: sortProps(selectSortOrder.ASC),
    columnId: 'creation_time',
    renderCell: data => moment(data.creation_time).format('MM/DD/YYYY hh:mm:ss A'),
    caption: 'Date/Time',
  },
  {
    type: 'control',
    columnId: 'c3',
    short: true,
    renderCell: (data, handler) => (
      TableIconButton(handler, faInfoCircle)
    ),
    renderCaption: (headerHandler) => {
      if (!headerHandler.expanded || headerHandler.expanded === null) {
        return TableIconButton(headerHandler, faExpandArrowsAlt);
      } return TableIconButton(headerHandler, faCompressArrowsAlt);
    },
  },
  { type: 'empty',
    columnId: 'name',
    renderCell: data => data.name,
    renderCaption: null,
  },
];

const columnsAlt: ColumnType<RowItem>[] = [
  {
    sortProps: sortProps(selectSortOrder.None),
    columnId: 'status',
    renderCell: data => renderStatusColor(data.status),
    caption: 'Status',
    short: true,
    align: 'center',
  },
  {
    sortProps: sortProps(selectSortOrder.None),
    columnId: 'name',
    renderCell: data => data.name,
    caption: 'Name',
  },
  {
    sortProps: sortProps(selectSortOrder.ASC),
    columnId: 'creation_time',
    renderCell: data => moment(data.creation_time).format('YYYY MMMM DD hh:mm:ss'),
    caption: 'Date/Time',
  },
  {
    type: 'control',
    columnId: 'c3',
    short: true,
    renderCell: (data, handler) => TableIconButton(handler, faInfoCircle)
    ,
    renderCaption: (headerHandler) => {
      return TableIconButton(
        headerHandler,
        headerHandler.expanded ? faCompressArrowsAlt : faExpandArrowsAlt,
      );
    },
  },
];

const rows = [
  {
    status: 'Success',
    id: '000',
    creation_time: 1565339851595,
    name: 'User defined name',
    details: detailsData,
  },
  {
    status: 'Failed',
    id: '001',
    details: [{ key: 'Name', value: 'Admin2' }],
    creation_time: 1565339851595,
    name: 'Some name',
  },
  {
    status: 'Pending',
    id: '002',
    creation_time: 1565339851590,
    name: 'Some name2',
  },
];

const rowsAlt = [
  {
    status: 'Failed',
    id: '010',
    creation_time: 1565330851595,
    name: 'Scheduled Report',
    details: detailsData,
  },
  {
    status: 'Pending',
    id: '011',
    details: [{ key: 'Name', value: 'Admin2' }],
    creation_time: 1565331851595,
    name: 'Manual Report',
  },
  {
    status: 'Scheduled',
    id: '012',
    creation_time: 1565332851590,
    name: 'Test Report',
  },
  {
    status: 'Success',
    id: '013',
    creation_time: 1565332851590,
    name: 'Monthly Report',
  },
  {
    status: 'Failed',
    id: '015',
    creation_time: 1565342851590,
    name: 'Daily Report',
  },
];

const columnSelect = (collection) => {
  return collection === 'default' ? columns : columnsAlt;
};

const rowSelect = (collection) => {
  return collection === 'default' ? rows : rowsAlt;
};

type DataTableStatedState = {
  checkedItems: React.ReactText[];
  expandedItems: React.ReactText[];
};

type DataTableStatedProps = DataTableProps<TRow>;

class DataTableStated extends React.Component<
DataTableStatedProps,
DataTableStatedState> {
  constructor(props: DataTableStatedProps) {
    super(props);
    this.state = {
      checkedItems: [],
      expandedItems: [],
    };
  }

  onCheckedItemsChange = (items: React.ReactText[]) => {
    this.setState({ checkedItems: items });
  }

  onExpandedItemsChange = (items: React.ReactText[]) => {
    this.setState({ expandedItems: items });
  }

  render() {
    return (
      <div style={{ width: '80vw' }}>
      <DataTable
        {...this.props}
        checkedItems={this.state.checkedItems}
        expandedItems={this.state.expandedItems}
        onCheckedItemsChange={this.onCheckedItemsChange}
        onExpandedItemsChange={this.onExpandedItemsChange}
      />
    </div>
    );
  }
}

storiesOf('ui-elements-tables/DataTable', module)
  .add('Data Table with details as getDetails', () => (
    <div style={{ width: '80vw' }}>
      <DataTable
        columns={columns}
        // tslint:disable-next-line:jsx-no-lambda
        getRowId={(row:RowItem) => row.id}
        rows={rows}
        checkedItems={[]}
        getDetails={getDetails}
        expanded={boolean('Expand all', false)}
      />
    </div>
  ),
  )
  .add('Data Table with details as renderDetails', () => (
    <div style={{ width: '80vw' }}>
      <DataTable
        columns={columns}
        rows={rows}
        checkedItems={[]}
        // tslint:disable-next-line:jsx-no-lambda
        getRowId={(row:RowItem) => row.id}
        renderDetails={renderDetails}
        expanded={boolean('Expand all', false)}
      />
    </div>
  ),
  )
  .add('Data Table with no details', () => (
    <div style={{ width: '80vw' }}>
      <DataTable
        columns={columns}
        rows={rows}
        checkedItems={[]}
        // tslint:disable-next-line:jsx-no-lambda
        getRowId={(row:RowItem) => row.id}
      />
    </div>
  ),
  )
  .add('Stated Data Table with dynamic data', () => (
    <DataTableStated
      condensed={boolean('Condensed', false)}
      columns={columnSelect(select('Change columns', ['default', 'alternative'], 'default'))}
      rows={rowSelect(select('Change row data', ['default', 'alternative'], 'default'))}
      // tslint:disable-next-line:jsx-no-lambda
      getRowId={(row:RowItem) => row.id}
      getDetails={getDetails}
    />
  ),
  );
