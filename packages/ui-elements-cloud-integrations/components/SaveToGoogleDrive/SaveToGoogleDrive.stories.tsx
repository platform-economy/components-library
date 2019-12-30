import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import { SaveToGoogleDrive } from './index';

const exampleInfo = `
**description or documentation about SaveToGoogleDrive component**

*supports markdown*
`;

storiesOf('ui-elements-cloud-integrations/SaveToGoogleDrive', module)
  .add('default', () => (
      <SaveToGoogleDrive
        src={text('src', 'sample_statistics.csv')}
        filename={text('filename', 'sample_statistics.csv')}
        sitename={text('sitename', 'Storybook')}
      />
    ), ({
      info: exampleInfo,
    }),
  );
