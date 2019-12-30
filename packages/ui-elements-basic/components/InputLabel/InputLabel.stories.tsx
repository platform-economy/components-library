import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { InputLabel } from './index';

storiesOf('ui-elements-basic/InputLabel', module)
  .add('basic label', () => (
    <InputLabel>
      {text('Label text', 'Test label')}
    </InputLabel>
  ));
