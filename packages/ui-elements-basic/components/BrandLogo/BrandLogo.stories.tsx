import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { BrandLogo } from './index';

storiesOf('ui-elements-basic/BrandLogo', module)
  .add('BrandLogo', () => (
    <BrandLogo isMobile={boolean('isMobile', false)} />
  ));
