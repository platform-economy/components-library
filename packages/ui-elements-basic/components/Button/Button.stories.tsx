import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';
import { faCoffee, faEyeSlash, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Button } from './index';

const buttonsPadding = {
  basic: { style: { margin: '5px' } },
  icon: { style: { margin: ' 5px 46px' } },
};

storiesOf('ui-elements-basic/Button', module)
  .add('Primary button', () => (
    <Button.Primary
      onClick={actionWithoutEvent('button-click')}
      disabled={boolean('Disabled', false)}
    >
      {text('Title', 'Button')}
    </Button.Primary>
  ))
  .add('Secondary button', () => (
    <Button.Secondary
      onClick={actionWithoutEvent('button-click')}
      disabled={boolean('Disabled', false)}
    >
      {text('Title', 'Button')}
    </Button.Secondary>
  ))
  .add('Tertiary button', () => (
    <Button.Tertiary
      onClick={actionWithoutEvent('button-click')}
      disabled={boolean('Disabled', false)}
    >
      {text('Title', 'Button')}
    </Button.Tertiary>
  ))
  .add('Red button', () => (
    <Button.Red
      onClick={actionWithoutEvent('button-click')}
      disabled={boolean('Disabled', false)}
    >
      {text('Title', 'Button')}
    </Button.Red>
  ))
  .add('Icon button', () => (
    <Button.Icon
      onClick={actionWithoutEvent('button-coffee-click')}
      disabled={boolean('Disabled', false)}
    >
      <FontAwesomeIcon icon={faCoffee} />
    </Button.Icon>
  ))
  .add('All buttons comparision', () => (
      <div>
        <div>
          <Button.Primary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-primary-click')}
            disabled={boolean('Disabled', false)}
          >
            {text('Title', 'Button')}
          </Button.Primary>
          <Button.Primary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-primary-2-click')}
            disabled={false}
          >
            Button 2
          </Button.Primary>
          <Button.Primary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-primary-3-click')}
            disabled={false}
          >
            Button 3
          </Button.Primary>
        </div>
        <div>
          <Button.Secondary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-secondary-click')}
            disabled={boolean('Disabled', false)}
          >
            {text('Title', 'Button')}
          </Button.Secondary>
          <Button.Secondary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-secondary-2-click')}
            disabled={false}
          >
            Button 2
          </Button.Secondary>
          <Button.Secondary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-secondary-3-click')}
            disabled={false}
          >
            Button 3
          </Button.Secondary>
        </div>
        <div>
          <Button.Tertiary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-tertiary-click')}
            disabled={boolean('Disabled', false)}
          >
            {text('Title', 'Button')}
          </Button.Tertiary>
          <Button.Tertiary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-tertiary-2-click')}
            disabled={false}
          >
            Button 2
          </Button.Tertiary>
          <Button.Tertiary
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-tertiary-3-click')}
            disabled={false}
          >
            Button 3
          </Button.Tertiary>
        </div>
        <div>
          <Button.Red
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-red-click')}
            disabled={boolean('Disabled', false)}
          >
            {text('Title', 'Button')}
          </Button.Red>
          <Button.Red
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-red-2-click')}
            disabled={false}
          >
            Button 2
          </Button.Red>
          <Button.Red
            {...buttonsPadding.basic}
            onClick={actionWithoutEvent('button-red-3-click')}
            disabled={false}
          >
            Button 3
          </Button.Red>
        </div>
        <div>
          <Button.Icon
            {...buttonsPadding.icon}
            onClick={actionWithoutEvent('button-coffee-click')}
            disabled={boolean('Disabled', false)}
          >
            <FontAwesomeIcon icon={faCoffee} />
          </Button.Icon>
          <Button.Icon
            {...buttonsPadding.icon}
            onClick={actionWithoutEvent('button-eye-click')}
            disabled={false}
          >
            <FontAwesomeIcon icon={faEyeSlash} />
          </Button.Icon>
          <Button.Icon
            {...buttonsPadding.icon}
            onClick={actionWithoutEvent('button-search-click')}
            disabled={false}
          >
            <FontAwesomeIcon icon={faSearch} />
          </Button.Icon>
        </div>
      </div>
  ))
  .add('Button with icons', () => (
    <Button.Primary
      iconLeft={boolean('Left side icon', true, 'Button elements')
        && <FontAwesomeIcon icon={faEyeSlash} />}
      iconRight={boolean('Right side icon', true, 'Button elements')
        && <FontAwesomeIcon icon={faCoffee} />}
    >
      {text('Title', 'Button', 'Button elements')}
    </Button.Primary>
  ));
