import React from 'react';
import { BackgroundWrapper } from './components/BackgroundWrapper';
import addons, { makeDecorator } from '@storybook/addons';

export const withBackground = makeDecorator({
  name: 'withBackground',
  parameterName: 'withBackground',
  wrapper: (getStory, context, { parameters }) => {
    const channel = addons.getChannel();
    return (
      <BackgroundWrapper
        channel={channel}
      >
        {getStory(context)}
      </BackgroundWrapper>
    )
  }
})
