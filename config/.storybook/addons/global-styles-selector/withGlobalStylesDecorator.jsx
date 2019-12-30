import React from 'react';
import { GlobalStylesWrapper } from './components/GlobalStylesWrapper';
import addons, { makeDecorator } from '@storybook/addons';

export const withGlobalStyles = makeDecorator({
  name: 'withGlobalStyles',
  parameterName: 'withGlobalStyles',
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();
    return (
      <React.Fragment>
        <GlobalStylesWrapper channel={channel} />
        {getStory(context)}
      </React.Fragment>
    )
  }
})
