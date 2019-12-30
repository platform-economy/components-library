import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import { Card } from './index';

storiesOf('ui-elements-layout/Card', module)
  .add('Card', () => (
    <div style={{ width: `${number('Width', 360)}px`, height: `${number('Height', 400)}px` }} >
      <Card />
    </div>
  ));
