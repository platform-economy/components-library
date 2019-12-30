import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';

import { FloatingLabel } from './index';
import { InputLabel } from '../InputLabel';
import { TextInput } from '../TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

storiesOf('ui-elements-basic/FloatingLabel', module)
  .add('User input', () => {
    return (
      <FloatingLabel
        focused={boolean('Focused', false)}
        height={70}
      >
        <TextInput
          style={{
            width: `${number('Width', 700, {})}px`,
          }}
          placeholder="User Name"  // Placeholder has to be provided for label to work properly
          name="user"
          clearIcon={<FontAwesomeIcon icon={faTimes}/>}
          hollow={boolean('Hollow', true)}
          onFocus={actionWithoutEvent('input-focused')}
          onBlur={actionWithoutEvent('input-blurred')}
          onChange={actionWithoutEvent('input-changed')}
          onClick={actionWithoutEvent('input-clicked')}
          pattern="^[_A-z0-9]*((-|\s)*[_A-z0-9])*$"
        />
        <InputLabel htmlFor="user">{text('Label text', 'User Name')}</InputLabel>
      </FloatingLabel>
    );
  });
