import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import { InputGroup } from './index';
import { TextInput, ComplexTextInput } from '../TextInput';
import { Button } from '../Button';

library.add(
  faSearch,
  faEyeSlash,
);

storiesOf('ui-elements-basic/InputGroup', module)
  .add('InputGroup', () => (
    <div style={{ minWidth: `${number('Minimum width', 500, {}, 'general')}px` }} >
      <InputGroup>
        {
          boolean('Left side icon', false, 'left side')
            ? <div style={{ margin: '10px' }}><FontAwesomeIcon icon="search" /></div>
            : null
        }
        {
          boolean('Left side button', true, 'left side')
            ? <Button.Primary onClick={action('button-clicked')}>
                Button
              </Button.Primary>
            : null
        }
        <ComplexTextInput
          placeholder={text('Placeholder', 'Type text here', 'input')}
          value={text('Value', '', 'input')}
          componentsLeft={<FontAwesomeIcon icon="search" />}
          onClick={action('input-clicked')}
          onChange={action('input-changed')}
          onBlur={action('input-blurred')}
          onFocus={action('input-focused')}
        />
        {
          boolean('Right side button', true, 'right side')
            ? <Button.Primary onClick={action('button-clicked')}>
                Button
              </Button.Primary>
            : null
        }
        {
          boolean('Right side icon', false, 'right side')
            ? <div style={{ margin: '10px' }}><FontAwesomeIcon icon="search" /></div>
            : null
        }
      </InputGroup>
    </div>
  ));
