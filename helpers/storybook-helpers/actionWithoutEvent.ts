import { decorateAction } from '@storybook/addon-actions';

export const actionWithoutEvent = decorateAction([
  args => args.filter(arg => !arg || !arg.nativeEvent),
]);
