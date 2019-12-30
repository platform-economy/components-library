import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { TopBar } from './index';
import { BrandLogo } from '@relayr/ui-elements-basic';

storiesOf('ui-elements-layout/TopBar', module)
  .add('TopBar', () => (
    <TopBar>
    <BrandLogo />
      <TopBar.Separator />
        <h1 style={{ margin: '0 40px' }}>
          test
        </h1>
    </TopBar>
  ))
  .add('TopBar Separator', () => (
    <div style={{ width: '10px', height: '44px' }}>
      < TopBar.Separator />
    </div>
  ));
