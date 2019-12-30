import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { RowDetails } from './index';

const exampleInfo = `
**description or documentation about RowDetails component**

*supports markdown*
`;

const data = [
  { key: 'key', value: 'value' },
  { key: 'key', value: 'value' },
  { key: 'key', value: 'value' },
  { key: 'key', value: 'value' },
  { key: 'key long', value: 'very very very very veery long value for test purposes' },
  { key: 'key', value: 'value' },
];

storiesOf('ui-elements-tables/RowDetails', module)
  .add('RowDetails', () => (
      <div style={{ width: '100vw' }}>
          <RowDetails data={data}/>
      </div>
    ), ({
      info: exampleInfo,
    }),
  );
