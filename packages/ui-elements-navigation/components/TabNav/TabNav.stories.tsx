import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TabNav } from './TabNav';

const exampleInfo = `
**description or documentation about TabNav component**

*supports markdown*
`;

const knobLabel = 'Active tab';
const knobOptions = {
  Dashboard: 1,
  'Monitoring & Diagnostics': 2,
  Details: 3,
};
const knobDefaultValue = 1;

const isTabActive = (tab:number) =>
  select(knobLabel, knobOptions, knobDefaultValue) === tab
    ? true
    : false;

const changeActiveTab = (tab:number) => action(`tab-${tab}-click`);

storiesOf('ui-elements-navigation/TabNav', module)
  .add('Simple TabNav', () => (
      <div style={{ width: '100%' }}>
        <TabNav>
          <TabNav.Tab
            active={isTabActive(1)}
            onClick={changeActiveTab(1)}
          >
            Dashboard
          </TabNav.Tab>
          <TabNav.Tab
            active={isTabActive(2)}
            onClick={changeActiveTab(2)}
          >
            Monitoring & Diagnostics
          </TabNav.Tab>
          <TabNav.Tab
            active={isTabActive(3)}
            onClick={changeActiveTab(3)}
            disabled={boolean('Disable Details tab', false)}
          >
            Details
          </TabNav.Tab>
        </TabNav>
      </div>
    ), ({
      info: exampleInfo,
    }),
  );
