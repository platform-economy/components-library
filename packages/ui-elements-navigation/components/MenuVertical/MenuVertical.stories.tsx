import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, array, select } from '@storybook/addon-knobs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCoffee,
  faTachometerAlt,
);

import { MenuVertical } from './index';
import { MenuItem } from '../MenuItem';

storiesOf('ui-elements-navigation/MenuVertical', module)
  .add('MenuVertical with MenuItems', () => {
    const menuItemClick = () => null;

    return (
      <div
        style={{
          width: number('Width', 200),
          height: number('Height', 600),
        }}
      >
        <MenuVertical
          display={array('Display', ['icon', 'label'])}
          alignment={select('Alignment', ['left', 'center', 'right'], 'left')}
          iconPosition={select('IconPosition', ['left', 'top', 'right'], 'left')}
          isMobile={boolean('IsMobile', false)}
        >
          <MenuItem
            active={true}
            icon={<FontAwesomeIcon icon="tachometer-alt" />}
            onClick={menuItemClick}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon="coffee" />}
            onClick={menuItemClick}
          >
            Coffee
          </MenuItem>
        </MenuVertical>
      </div>
    );
  });
