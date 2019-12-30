import * as React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, text, select } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretUp,
  faCaretDown,
  faAnchor,
  faLock,
  faExpandArrowsAlt,
  faDownload,
  faInfoCircle,
  faEllipsisV,
  faMinusSquare,
  faCheckSquare,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';
import {
  Table,
  SortOrder,
} from './index';

import { RowDetails } from '../RowDetails';

const Container = styled.div`
  width: 80vw;
`;

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

const exampleRenderContent = () => (
  <RowDetails data={detailsData} />
);

const renderContent = ({ text }) => text;

const handleSortChange = (newSort, e) => {
  actionWithoutEvent('onSortChanged')([newSort]);
};

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

type selectAlignType = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
};

const selectAlign: selectAlignType = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
};

const sortProps = (set: boolean) => ({
  sortIcons,
  onSortChanged: set ? handleSortChange : undefined,
  columnId: set ? 'c1' : undefined,
  sortOrder: set
    ? select('Sort order', selectSortOrder, selectSortOrder.ASC)
    : undefined,
});

storiesOf('ui-elements-tables/Table', module)
  .addDecorator(centered)
  .addDecorator(withInfo)
  .add('Table', () => (
    <Container>
      <Table condensed={boolean('Condensed', false)}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell short={true}>
              <FontAwesomeIcon icon={faMinusSquare} />
            </Table.HeaderCell>
            <Table.HeaderCell
              short={true}
              onSortChanged={handleSortChange}
              columnId="c1"
              sortOrder={SortOrder.ASC}
              sortIcons={sortIcons}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              onSortChanged={handleSortChange}
              columnId="c2"
              sortOrder={SortOrder.None}
              sortIcons={sortIcons}
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              onSortChanged={handleSortChange}
              columnId="c3"
              sortOrder={SortOrder.None}
              sortIcons={sortIcons}
            >
              Creation time
            </Table.HeaderCell>
            <Table.HeaderCell
              onSortChanged={handleSortChange}
              columnId="c4"
              sortOrder={SortOrder.None}
              sortIcons={sortIcons}
            >
              Created by
            </Table.HeaderCell>
            <Table.HeaderCell short={true}>
              <FontAwesomeIcon icon={faDownload} />
            </Table.HeaderCell>
            <Table.HeaderCell short={true}>
              <FontAwesomeIcon icon={faExpandArrowsAlt} />
            </Table.HeaderCell>
            <Table.HeaderCell short={true}>
              <FontAwesomeIcon icon={faLock} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row onClick={actionWithoutEvent('Table.row click')}>
            <Table.Cell>
              <FontAwesomeIcon icon={faSquare} />
            </Table.Cell>
            <Table.Cell align="center" ><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Daily Report</Table.Cell>
            <Table.Cell>25-05-2019 11:42 AM</Table.Cell>
            <Table.Cell>Administrator</Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faDownload} />
            </Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Table.Cell>
            <Table.Cell align="center" >
              <FontAwesomeIcon icon={faEllipsisV} />
            </Table.Cell>
          </Table.Row>
          <Table.ExpandableRow
            expanded={true}
            renderContent={exampleRenderContent}
            onClick={actionWithoutEvent('Table.Row click')}
          >
            <Table.Cell>
              <FontAwesomeIcon icon={faCheckSquare} />
            </Table.Cell>
            <Table.Cell align="center" ><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Daily Active Alerts Report</Table.Cell>
            <Table.Cell>25-05-2019 11:42 AM</Table.Cell>
            <Table.Cell>Kevin Homealone</Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faDownload} />
            </Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Table.Cell>
            <Table.Cell align="center" >
              <FontAwesomeIcon icon={faEllipsisV} />
            </Table.Cell>
          </Table.ExpandableRow>
          <Table.Row onClick={actionWithoutEvent('Table.Row click')}>
            <Table.Cell>
              <FontAwesomeIcon icon={faCheckSquare} />
            </Table.Cell>
            <Table.Cell align="center" ><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Monthly Report Unreachable Nodes</Table.Cell>
            <Table.Cell>25-05-2019 11:42 AM</Table.Cell>
            <Table.Cell>John Doe</Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faDownload} />
            </Table.Cell>
            <Table.Cell>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Table.Cell>
            <Table.Cell align="center" >
              <FontAwesomeIcon icon={faEllipsisV} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  ))
  .add('Table.Row', () => (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row
            onClick={boolean('onClick handler', false)
              ? actionWithoutEvent('Table.Row click')
              : undefined}
          >
            <Table.Cell><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Daily Report</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  ))
  .add('Table.ExpandableRow', () => (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.ExpandableRow
            expanded={boolean('Expanded', false)}
            renderContent={renderContent}
            renderData={{ text: text('Render (content) data', 'Content') }}
          >
            <Table.Cell><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Daily Active Alerts Report</Table.Cell>
          </Table.ExpandableRow>
          <Table.Row>
            <Table.Cell><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Monthly Report Unreachable Nodes</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  ))
  .add('Table.HeaderCell', () => (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell short={boolean('Short (first column)', false)}>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              short={boolean('Short (second column)', false)}
              {...sortProps(boolean('Pass order props (second column)', false))}
            >
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell><FontAwesomeIcon icon={faAnchor} /></Table.Cell>
            <Table.Cell>Daily Report</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  ))
  .add('Table.Cell', () => (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Status
            </Table.HeaderCell>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell align={select('Align (first column)', selectAlign, selectAlign.Left)}>
              <FontAwesomeIcon icon={faAnchor} />
            </Table.Cell>
            <Table.Cell>Daily Report</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  ));
