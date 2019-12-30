import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, boolean, select } from '@storybook/addon-knobs';

import { CheckBox } from './CheckBox';
import { withUncontrolledValue } from '@relayr/ui-elements-core';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

const knobOptions = {
  range: true,
  min: .5,
  max: 10,
  step: .25,
};

storiesOf('ui-elements-basic/Check Box', module)
.add('Basic Check Box Input', () => {
  const whiteColor = { color: 'white' };
  return (
    <div>
      <CheckBox
        value={select(
          'Check',
          ['true', 'false', 'schrodinger', '0', '1', '2', 'check', 'uncheck', 'indeterminate'],
          'true')}
        name="ZeroOption"
        style={{ fontSize: `${number('Font Size', 1, knobOptions)}em` }}
        disabled={boolean('Disabled', false)}
        onChange={actionWithoutEvent('check-box-on-change')}
        onClick={actionWithoutEvent('check-box-on-click')}
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>Editable Option</span>
      </CheckBox>
      <br/>
      <CheckBox
        value={true}
        name="FirstOption"
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>First Option</span>
      </CheckBox>
      <br/>
      <CheckBox
        value={false}
        name="SecondOption"
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>Second Option</span>
      </CheckBox>
      <br/>
      <CheckBox
        value="indeterminate"
        name="EnlargeOption"
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>Schrodinger Cat</span>
      </CheckBox>
    </div>
  );
})
.add('Check Box with state', () => {
  const CheckBoxWithState = withUncontrolledValue()(CheckBox);
  const whiteColor = { color: 'white' };
  return (
    <div>
      <CheckBoxWithState
        value={true}
        name="FirstOption"
        disabled={boolean('Disabled', false)}
        onChange={actionWithoutEvent('check-box-change')}
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>First Option</span>
      </CheckBoxWithState>
      <br/>
      <CheckBoxWithState
        value={false}
        name="SecondOption"
        disabled={boolean('Disabled', false)}
        onChange={actionWithoutEvent('check-box-change')}
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>Second Option</span>
      </CheckBoxWithState>
      <br/>
      <CheckBoxWithState
        value="indeterminate"
        name="EnlargeOption"
        disabled={boolean('Disabled', false)}
        onChange={actionWithoutEvent('check-box-change')}
        onValueChange={actionWithoutEvent('check-box-value-change')}
      >
        <span style={whiteColor}>Enlarge Option</span>
      </CheckBoxWithState>
    </div>
  );
});
