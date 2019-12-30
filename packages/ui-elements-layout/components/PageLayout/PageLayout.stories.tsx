import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled, { ThemeProvider } from 'styled-components';
import { PageLayout } from './index';

import { TopBar, Drawer, Card, GridWrapper, GridGrow } from '@relayr/ui-elements-layout';
import { MenuItem } from '@relayr/ui-elements-navigation';
import { BrandLogo } from '@relayr/ui-elements-basic';
import { DarkTheme } from '@relayr/ui-elements-themes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faTachometerAlt,
  faBook,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTachometerAlt,
  faBook,
  faBars,
);

const exampleInfo = `
**description or documentation about PageLayout component**

*supports markdown*
~~~js
<PageLayout />
~~~
`;

type ColumnType = [1, 2, 3, 4, 6];

const columnsOptions:ColumnType = [1, 2, 3, 4, 6];

const knobOptions = {
  range: true,
  min: 1,
  max: 6,
  step: 1,
};

const MobileWrapper = styled.div<{ mobile: boolean }>`
  width: ${ props => props.mobile ? '400px' : '100%' };
  height: '100%';
  overflow: auto;
`;

const Option = styled.div`
  box-sizing: border-box;
  border-bottom: solid 2px ${props => props.theme.palette.divider};
  color: ${props => props.theme.palette.divider_inverted};
  text-align: center;
`;

const orientationSwitch = (arg) => {
  return arg ? 'vertical' : 'horizontal';
};

const sizeSwitch = (arg) => {
  return arg ? '105px' : '200px';
};

storiesOf('ui-elements-layout/PageLayout', module)
  .addParameters({
    info: exampleInfo,
  })
  .add('Layout', () => {
    const mobile = boolean('Mobile', false);
    return (
    <MobileWrapper mobile={mobile}>
      <PageLayout
        mobile={mobile}
        header={
          mobile ?
          <TopBar mobile={mobile}>
            <FontAwesomeIcon
              icon="bars"
              style={{ position: 'absolute', top: '26px', left: '30px' }}
            />
            <b style={{ margin: 'auto' }}>Layout Template</b>
          </TopBar> :
          <TopBar>
            <BrandLogo/>
            <TopBar.Separator/>
            <b>Layout Template</b>
          </TopBar>
        }
        navigation={
          <ThemeProvider theme={DarkTheme}>
            <Drawer
              size={sizeSwitch(mobile)}
              open={boolean('Drawer Open', true)}
              direction={orientationSwitch(mobile)}
            >
              <Option>
                <MenuItem
                  active={boolean('Menu Active 1', true)}
                  icon={<FontAwesomeIcon icon="tachometer-alt" />}
                  onClick={action('menu-item-click')}
                >
                  {text('Menu Label 1', 'Dashboard')}
                </MenuItem>
              </Option>
              <Option>
                <MenuItem
                  active={boolean('Menu Active 2', false)}
                  icon={<FontAwesomeIcon icon="book" />}
                  onClick={action('menu-item-click')}
                >
                  {text('Menu Label 2', 'Other option')}
                </MenuItem>
              </Option>
            </Drawer>
          </ThemeProvider>}
        content={
          <div style={{ width: '100%' }}>
            <GridWrapper
              columns={select('Columns', columnsOptions, 3)}
              lastChildJustified={boolean('Last Child Justified', true)}
            >
              <Card style={{ height: `${number('Height', 100)}px` }} />
              <GridGrow
                className="GridGrow"
                columns={select('Columns', columnsOptions, 3)}
                colspan={number('Wide colspan', 2, knobOptions)}
              >
                <Card style={{ height: `${number('Height', 100)}px` }} />
              </GridGrow>
              <Card style={{ height: `${number('Height', 100)}px` }} />
              <Card style={{ height: `${number('Height', 100)}px` }} />
              <Card style={{ height: `${number('Height', 100)}px` }} />
            </GridWrapper>
            <Card style={{ margin: '14px 0', height: '500px' }}/>
          </div>}
      />
    </MobileWrapper>
    );
  });
