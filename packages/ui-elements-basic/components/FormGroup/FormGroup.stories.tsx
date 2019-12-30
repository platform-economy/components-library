import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, text } from '@storybook/addon-knobs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { FormGroup } from './index';
import { InputLabel } from '../InputLabel';
import { TextInput, ComplexTextInput } from '../TextInput';
import { Button } from '../Button';
import { NoFocus } from '../NoFocus';

library.add(faEyeSlash, faEye);

storiesOf('ui-elements-basic/FormGroup', module)
  .add('with label and single input', () => (
    <div
      style={{
        width: `${number('Width', 700, {})}px`,
        height:  `${number('Height', 150, {})}px`,
      }}
    >
      <FormGroup
        layout={select(
          'Layout',
          {
            horizontal: 'horizontal',
            vertical: 'vertical',
          },
          'vertical')}
      >
        <InputLabel
          style={{ flexGrow: number('Label proportions', 5) / 10 }}
        >
          {text('Label text', 'Age')}
        </InputLabel>
        <TextInput />
      </FormGroup>
    </div>
  ))
  .add('with label and two custom inputs', () => (
    <div
      style={{
        width: `${number('Width', 700, {})}px`,
        height:  `${number('Height', 150, {})}px`,
      }}
    >
      <FormGroup
        layout={select('Layout', {
          horizontal: 'horizontal',
          vertical: 'vertical',
        },             'vertical')}
      >
        <InputLabel
          style={{ flexGrow: number(
            'Label\'s proportions (10 = equally wide as other elements)', 5) / 10,
          }}
        >
          {text('Label text', 'Sign in')}
        </InputLabel>
        <TextInput placeholder="Username"/>
        <ComplexTextInput
          type="password"
          placeholder="Password"
          componentsLeft={<FontAwesomeIcon icon="eye-slash" />}
          componentsRight={
            <NoFocus>
              <Button.Primary>Login</Button.Primary>
            </NoFocus>}
        />
      </FormGroup>
    </div>
  ));
