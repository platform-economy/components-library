import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number } from '@storybook/addon-knobs';

import { Basic } from './index';

storiesOf('ui-elements-skeletons/Basic', module)
  .add('default', () => (
    <Basic />
  ))
  .add('with custom size', () => (
    <Basic
      width={`${number('width', 100)}px`}
      height={`${number('height', 40)}px`}
    />
  ));
