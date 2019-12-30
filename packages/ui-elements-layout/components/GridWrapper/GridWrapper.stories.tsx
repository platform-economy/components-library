import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select, boolean } from '@storybook/addon-knobs';

import { GridWrapper, GridGrow } from './index';
import { Card } from '../Card';

const exampleInfo = `
**Grid Wrapper component**

A wrapper to contain layout elements in grid of selected number of columns.
Managed through flexbox properties.

~~~js
<GridWrapper />
~~~
`;

const knobOptions = {
  range: true,
  min: 1,
  max: 6,
  step: 1,
};

type ColumnType = [1, 2, 3, 4, 6];

const columnsOptions:ColumnType = [1, 2, 3, 4, 6];

storiesOf('ui-elements-layout/GridWrapper', module)
  .add('Grid Wrapper with Grid Grow', () => (
    <div style={{ width: '100vw' }}>
      <GridWrapper
        columns={select('Columns', columnsOptions, 3)}
        lastChildJustified={boolean('Last Child Justified', true)}
      >
        <Card style={{ height: `${number('Height', 100)}px` }} />
        <GridGrow
          className="GridGrow"
          columns={select('Columns', columnsOptions, 3)}
          colspan={number('Wide A', 2, knobOptions)}
        >
          <Card style={{ height: `${number('Height', 100)}px` }}>
            <h2 style={{ textAlign: 'center', color: '#888' }}>
              Wide A Colspan {number('Wide A' , 2, knobOptions)}
            </h2>
          </Card>
        </GridGrow>
        <Card style={{ height: `${number('Height', 100)}px` }} />
        <GridGrow
          className="GridGrow"
          columns={select('Columns', columnsOptions, 3)}
          colspan={number('Wide B', 2, knobOptions)}
        >
          <Card style={{ height: `${number('Height', 100)}px` }}>
            <h2 style={{ textAlign: 'center', color: '#888' }}>
              Wide B Colspan {number('Wide B' , 2, knobOptions)}
            </h2>
          </Card>
        </GridGrow>
        <Card style={{ height: `${number('Height', 100)}px` }} />
      </GridWrapper>
    </div>
    ), ({
      info: exampleInfo,
    }),
  );
