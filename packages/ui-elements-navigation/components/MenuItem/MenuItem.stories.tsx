import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTachometerAlt,
);

import { MenuItem } from './index';

storiesOf('ui-elements-navigation/MenuItem', module)
  .add('MenuItem', () => {
    const active = boolean('Active', false);
    return (
      <div>
        <MenuItem
          active={active}
          icon={<FontAwesomeIcon icon="tachometer-alt" />}
          onClick={action('menu-item-click')}
        >
          {text('Label', 'Dashboard')}
        </MenuItem>
      </div>
    );
  });
