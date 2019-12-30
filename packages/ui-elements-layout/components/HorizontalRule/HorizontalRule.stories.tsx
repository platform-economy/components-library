import * as React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import { withInfo } from '@storybook/addon-info';
import { text } from '@storybook/addon-knobs';

import { HorizontalRule } from './index';

const exampleInfo = `
**description or documentation about HorizontalRule component**

*supports markdown*
`;

storiesOf('ui-elements-layout/HorizontalRule', module)
  .addDecorator(withInfo)
  .addDecorator(centered)
  .add('HorizontalRule', () => (
    <div style={{ width: text('Width', '200px') }}>
      <HorizontalRule />
    </div>
    ), ({
      info: exampleInfo,
    }),
  );
