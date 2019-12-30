import * as React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { number, select, color } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { withStatusBar } from './index';

import { paletteDark } from '@relayr/ui-elements-themes';

import { Card } from '../Card';

type sidesType = ['top', 'left', 'right', 'bottom'];
const sides:sidesType = ['top', 'left', 'right', 'bottom'];

const statusColors = ['positive', 'negative', 'active', 'warning'];

const knobOptions = {
  range: false,
  min: 0,
  max: 11,
  step: 1,
};

const div = ({ className }:{className?: string}) => (
<div className={className} style={{ color: '#888' }}>
  test div
</div>
);

const dataColors = (index:number) => paletteDark.dataPalette[index];

const DivWithBottomBorder = withStatusBar({ side: 'bottom' })(div);
const CardWithBottomBorder = withStatusBar({ side: 'bottom' })(Card);
const CardWithRightBorder = withStatusBar({ side: 'right' })(Card);

storiesOf('ui-elements-layout/StatusBarWrapper', module)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .add('Bottom status bar', () => (
    <div>
          <DivWithBottomBorder color={select('Div Status', statusColors, 'positive')}/>
          <br/>
          <CardWithBottomBorder color={select('Card Status', statusColors, 'negative')}>
            <div
              style={{ width: `${number('Width', 100)}px`, height: `${number('Height', 120)}px` }}
            />
          </CardWithBottomBorder>
    </div>

  ),
  )
  .add('Right status bar with more colors', () => (
    <div>
          <CardWithRightBorder
            color={(select(
              'Data Color',
              paletteDark.dataPalette,
              paletteDark.dataPalette[0]))}
          >
            <div
              style={{ width: `${number('Width', 120)}px`, height: `${number('Height', 160)}px` }}
            />
          </CardWithRightBorder>
          <br/>
          <CardWithRightBorder color={color('Color picker', '#F0A')}>
            <div
              style={{ width: `${number('Width', 120)}px`, height: `${number('Height', 160)}px` }}
            />
          </CardWithRightBorder>
    </div>

  ),
  );
