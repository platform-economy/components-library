import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { NoFocus } from './index';

storiesOf('ui-elements-basic/NoFocus', module)
  .add('default', () => (
    <NoFocus />
  ));
