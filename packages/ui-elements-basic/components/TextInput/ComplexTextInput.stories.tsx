import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faSearch,
  faEyeSlash,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';

import { ComplexTextInput } from './index';
import { NoFocus } from '../NoFocus';
import { Button } from '../Button';

library.add(
  faSearch,
  faEyeSlash,
  faPencilAlt,
);

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

storiesOf('ui-elements-basic/TextInput', module)
  .add('ComplexTextInput (text) with clear', () => (
    <div style={{ width: `${number('Width', 500, {}, 'general')}px` }} >
      <ComplexTextInput
        clearIcon={<FontAwesomeIcon icon="times"/>}
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        placeholder={text('Placeholder', 'Type text here', 'input')}
        componentsLeft={
          <span>
            {
              boolean('Left side icon search', true, 'left side') &&
              <FontAwesomeIcon icon="search" />
            }
            {
              boolean('Left side icon eye', false, 'left side') &&
              <FontAwesomeIcon icon="eye-slash" />
            }
            {
              boolean('Left side icon pencil', false, 'left side') &&
              <FontAwesomeIcon icon="pencil-alt" />
            }
            {
              boolean('Left side button', false, 'left side') &&
              <NoFocus>
                <Button.Primary onClick={actionWithoutEvent('button-clicked')}>
                  Button
                </Button.Primary>
              </NoFocus>
            }
          </span>
        }
        componentsRight={
          <span>
            {
              boolean('Right side icon search', false, 'right side') &&
              <FontAwesomeIcon icon="search" />
            }
            {
              boolean('Right side icon eye', false, 'right side') &&
              <FontAwesomeIcon icon="eye-slash" />
            }
            {
              boolean('Right side icon pencil', false, 'left side') &&
              <FontAwesomeIcon icon="pencil-alt" />
            }
            {
              boolean('Right side button', true, 'right side') &&
              <NoFocus>
                <Button.Primary onClick={actionWithoutEvent('button-clicked')}>
                  Button
                </Button.Primary>
              </NoFocus>

            }
          </span>
        }
      />
    </div>
  ))
  .add('ComplexTextInput (password)', () => (
    <div style={{ minWidth: `${number('Minimum width', 500, {}, 'general')}px` }} >
      <ComplexTextInput
        onChange={actionWithoutEvent('input-changed')}
        onBlur={actionWithoutEvent('input-blurred')}
        onFocus={actionWithoutEvent('input-focused')}
        type="password"
        placeholder={text('Placeholder', 'Type password here', 'input')}
        componentsLeft={
          <span>
            {
              boolean('Left side icon search', true, 'left side') &&
              <FontAwesomeIcon icon="search" />
            }
            {
              boolean('Left side button', false, 'left side') &&
              <NoFocus>
                <Button.Primary onClick={actionWithoutEvent('button-clicked')}>
                  Button
                </Button.Primary>
              </NoFocus>
            }
            {
              boolean('Left side icon eye', false, 'left side') &&
              <FontAwesomeIcon icon="eye-slash" />
            }
          </span>
        }
        componentsRight={
          <span>
            {
              boolean('Right side icon search', false, 'right side') &&
              <FontAwesomeIcon icon="search" />
            }
            {
              boolean('Right side button', true, 'right side') &&
              <NoFocus>
                <Button.Primary onClick={actionWithoutEvent('button-clicked')}>
                  Button
                </Button.Primary>
              </NoFocus>
            }
            {
              boolean('Right side icon eye', false, 'right side') &&
              <FontAwesomeIcon icon="eye-slash" />
            }
          </span>
        }
      />
    </div>
  ));
