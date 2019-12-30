import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text } from '@storybook/addon-knobs';
import { Spinner } from './index';

const knobOptions = {
  range: false,
  min: 24,
  max: 800,
  step: 1,
};

storiesOf('ui-elements-skeletons/Spinner', module)
  .add('Spinner default (1em)', () => (
      <Spinner />
  ))
  .add('Spinner resizable (text: em, px or number)', () => (
    <Spinner size={text('Size', '100px')}/>
  ));
