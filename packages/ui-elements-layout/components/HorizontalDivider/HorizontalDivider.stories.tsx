import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { HorizontalDivider } from './index';

const HDContainer = styled.div`
  width: 50vw;
  & div {
    color: ${({ theme }) => theme.palette.text};
  }
`;

storiesOf('ui-elements-layout/HorizontalDivider', module)
  .add('HorizontalDivider', () => (
    <HDContainer>
      <HorizontalDivider
        startingRule={boolean('Starting rule', false)}
        endingRule={boolean('Ending rule', false)}
      >
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
        <span>Step 4</span>
        <span>Step 5</span>
      </HorizontalDivider>
    </HDContainer>
  ));
