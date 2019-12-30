import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean, select } from '@storybook/addon-knobs';

import { Radio } from './Radio';
import { decorateAction } from '@storybook/addon-actions';
import { RadioGroup } from './RadioGroup';
import { withUncontrolledValue } from '@relayr/ui-elements-core/utils/withUncontrolledValue';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';
import { RadioToggle } from './RadioToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faAt,
} from '@fortawesome/free-solid-svg-icons';

const actionWithData = decorateAction([([data]) => [data]]);
const knobOptions = {
  range: true,
  min: .5,
  max: 10,
  step: .25,
};

storiesOf('ui-elements-basic/Radio', module)
.add('Basic Radio Input and group stateless', () => {
  const whiteColor = { color: 'white' };
  return (
    <div >
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="1"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>First Option</span>
      </Radio>
      <br/>
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="2"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Second Option</span>
      </Radio>
      <br/>
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="3"
        disabled={boolean('Disabled', false)}
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Disabled options</span>
      </Radio>
      <br/>
      <Radio
        style={{ fontSize: `${number('Font Size', 1, knobOptions)}em` }}
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="4"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Enlarge ??</span>
      </Radio>
    </div>
  )
})
.add('Basic Radio Input stateless', () => {
  const whiteColor = { color: 'white' };
  return (
    <RadioGroup
      value={select('select item', ['1', '2', '3', '4'], '1')}
      onValueChange={actionWithData('radio-button-group-value-change')}
    >
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="1"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>First Option</span>
      </Radio>
      <br/>
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="2"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Second Option</span>
      </Radio>
      <br/>
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="3"
        disabled={boolean('Disabled', false)}
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Disabled options</span>
      </Radio>
      <br/>
      <Radio
        style={{ fontSize: `${number('Font Size', 1, knobOptions)}em` }}
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="4"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Enlarge ??</span>
      </Radio>
    </RadioGroup>
  );
})
.add('Basic Radio with state', () => {
  const RadioGroupWithState = withUncontrolledValue()(RadioGroup);
  const whiteColor = { color: 'white' };
  return (
    <RadioGroupWithState
      value={select('select item', ['', '1', '2', '3'], '')}
      onValueChange={actionWithData('radio-button-group-value-change')}
    >
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="1"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>First Option</span>
      </Radio>
      <br/>
      <Radio
        groupName={text('Group Name', 'RadioButtonGroup')}
        value="2"
        onClick={actionWithData('radio-button-click')}
        onValueChange={actionWithData('radio-button-value-change')}
      >
        <span style={whiteColor}>Second Option</span>
      </Radio>
      <br/>
      <span>
        <Radio
          groupName={text('Group Name', 'RadioButtonGroup')}
          value="3"
          disabled={boolean('Disabled', false)}
          onClick={actionWithData('radio-button-click')}
          onValueChange={actionWithData('radio-button-value-change')}
        >
          <span style={whiteColor}>Disabled Options</span>
        </Radio>
      </span>
    </RadioGroupWithState>
  );
})
.add('RadioToggle within RadioGroup with state', () => {
  const selectValue = select('select item', ['1', '2', '3'], '1');
  const RadioGroupWithState = withUncontrolledValue()(RadioGroup);
  return (
    <RadioGroupWithState
      value={selectValue}
      onValueChange={actionWithoutEvent('radio-button-group-value-change')}
    >
      <RadioToggle
        iconOn={<FontAwesomeIcon icon={faAt}/>}
        value={'1'}
        disabled={boolean('Disabled Email', false)}
      />
      <RadioToggle
        iconOn={<FontAwesomeIcon icon={faPhone}/>}
        value={'2'}
        disabled={boolean('Disabled Phone', false)}
      />
      <RadioToggle
        iconOn={<FontAwesomeIcon icon={faEnvelope}/>}
        value={'3'}
        disabled={boolean('Disabled Envelope', false)}
      />
    </RadioGroupWithState>
  );
});
