import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { withSkeleton } from '@relayr/ui-elements-skeletons';
import { WithSkeletonExample as Example } from './index';
import styled from 'styled-components';

storiesOf('ui-elements-basic/WithSkeletonExample', module)
  .add('custom', () => {

    const CSkeleton = styled.div`
      width: 200px;
      height: 30px;
      background: #e4efc0;
      background: linear-gradient(to bottom, #e4efc0 0%,#abbd73 100%);
    `;

    const CustomSkeleton = withSkeleton(CSkeleton)(Example);

    return (
      <CustomSkeleton isLoading={boolean('isLoading', false)} />
    );
  })
  .add('default', () => (
    <Example isLoading={boolean('isLoading', false)} />
  ))
  .add('pure', () => (
    <Example.Base />
  ))
  .add('skeleton', () => (
    <Example.Skeleton />
  ));
