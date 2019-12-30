import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { Toggle } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

import {
  faToggleOff,
  faToggleOn,
  faChevronDown,
  faChevronUp,
  faAt,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { RadioGroup } from '../Radio';
import { withUncontrolledValue } from '@relayr/ui-elements-core/utils/withUncontrolledValue';
import { RadioToggle } from '../Radio/RadioToggle';

library.add(
  faToggleOff,
  faToggleOn,
  faChevronDown,
  faChevronUp,
  faAt,
  faEnvelope,
  faPhone,
);

const example1Info = `
**description or documentation about Toggle component**

*supports markdown*

~~~js
<Toggle />
~~~
`;

storiesOf('ui-elements-basic/Toggle', module)
  .addParameters({
    info: example1Info,
  })
  .add('Icon Toggle', () => {
    let isToggled = false;
    let toggled = boolean('Toggled', isToggled);
    let highlight = boolean('Highlight', isToggled);
    const handleClick = () => {
      isToggled = !isToggled;
      toggled = boolean('Toggled', isToggled);
      highlight = boolean('Highlight', isToggled);
    };
    return (
      <Toggle
        disabled={boolean('Disabled', false)}
        iconOn={<FontAwesomeIcon icon="toggle-on"/>}
        iconOff={<FontAwesomeIcon icon="toggle-off"/>}
        toggled={toggled}
        onClick={handleClick}
        highlight={highlight}
      />
    );
  })
  .add('Icon Eye', () => {
    let isToggled = false;
    let toggled = boolean('Toggled', isToggled);
    const handleClick = () => {
      isToggled = !isToggled;
      toggled = boolean('Toggled', isToggled);
    };
    return (
      <Toggle
        disabled={boolean('Disabled', false)}
        iconOn={<FontAwesomeIcon icon="eye"/>}
        iconOff={<FontAwesomeIcon icon="eye-slash"/>}
        toggled={toggled}
        onClick={handleClick}
      />
    );
  })
  .add('Icon Chevron', () => {
    let isToggled = false;
    let toggled = boolean('Toggled', isToggled);
    const handleClick = () => {
      isToggled = !isToggled;
      toggled = boolean('Toggled', isToggled);
    };
    return (
      <Toggle
        disabled={boolean('Disabled', false)}
        iconOn={<FontAwesomeIcon icon="chevron-up"/>}
        iconOff={<FontAwesomeIcon icon="chevron-down"/>}
        toggled={toggled}
        onClick={handleClick}
      />
    );
  })
  .add('RadioToggle within RadioGroup with State',() => {
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
