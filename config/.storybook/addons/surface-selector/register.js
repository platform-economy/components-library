import React from 'react';
import addons from '@storybook/addons';
import { SelectorPanel } from './components/SelectorPanel';
import { ADDON_NAME } from './constants';

addons.register(ADDON_NAME, api => {
  addons.addPanel(`${ADDON_NAME}/panel`, {
    title: 'Surface Selector',
    render: ({ active, key }) => <SelectorPanel key={key} api={api} active={active} />,
  });
});

