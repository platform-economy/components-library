import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from './index';

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

storiesOf('ui-elements-basic/TextInput', module)
  .add('TextInput (text)', () => (
    <div style={{ width: `${number('Width', 500, {}, 'general')}px` }} >
      <TextInput
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        placeholder={text('Placeholder', 'Type text here', 'input')}
      />
    </div>
  ))
  .add('TextInput with validation', () => (
    <div style={{ width: `${number('Width', 500, {}, 'general')}px` }} >
      <TextInput
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        placeholder={text('Placeholder', 'Type text here (only hex digits)', 'input')}
        pattern="[0-9a-fA-F]+"
      />
    </div>
  ))
  .add('TextInput (hollow)', () => (
    <div style={{ width: `${number('Width', 500, {}, 'general')}px` }} >
      <TextInput
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        placeholder={text('Placeholder', 'Type text here', 'input')}
        hollow={boolean('Hollow', true)}
      />
    </div>
  ))
  .add('TextInput with clear', () => (
    <div style={{ width: `${number('Width', 500, {}, 'general')}px`, position: 'relative' }} >
      <TextInput
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        placeholder={text('Placeholder', 'Type text here', 'input')}
        clearIcon={<FontAwesomeIcon icon={faTimes}/>}
      />
    </div>
  ));
