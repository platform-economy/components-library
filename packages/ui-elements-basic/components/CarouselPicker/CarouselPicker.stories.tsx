import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { decorateAction } from '@storybook/addon-actions';
import { select, boolean, number } from '@storybook/addon-knobs';
import { range, padStart } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

import { CarouselPicker, CarouselPickerProps } from './index';
import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

library.add(
  faCaretDown,
  faCaretUp,
);

const items = range(1, 13).map(index => ({
  value: index,
  caption: padStart(index.toString(), 2, '0'),
}));
const selectKnobItems = items.reduce(
  (result, item) => {
    result[item.caption] = item.value;
    return result;
  },
  { '(null)': null },
);
const siblingRangeSliderOptions = {
  range: true,
  min: 1,
  max: 20,
  step: 1,
};
const keyboardAction = decorateAction([
  args => args.map((arg) => {
    return arg && arg.nativeEvent
      ? ({ key: arg.key, keyCode: arg.keyCode })
      : arg;
  }),
]);
type Omit<T1 extends {}, T2 extends keyof T1> = Pick<T1, Exclude<keyof T1, T2>>;

const topIcon = <FontAwesomeIcon icon="caret-up"/>;
const bottomIcon = <FontAwesomeIcon icon="caret-down"/>;

type WrapperProps = Omit<CarouselPickerProps, 'value'>;
type WrapperState = {
  value: unknown;
};
class CarouselPickerWrapper extends React.Component<WrapperProps, WrapperState> {
  state = {
    value: null,
  };

  handleValueChange = (value: unknown, e: React.SyntheticEvent) => {
    const { onValueChange } = this.props;
    this.setState({ value });
    if (onValueChange) {
      onValueChange(value, e);
    }
  }

  render() {
    return (
      <CarouselPicker
        {...this.props}
        value={this.state.value}
        onValueChange={this.handleValueChange}
        siblingRange={number('Number of siblings', 3, siblingRangeSliderOptions)}
      />
    );
  }
}

storiesOf('ui-elements-basic/CarouselPicker', module)
  .add('default (stateless)', () => (
    <CarouselPicker
      items={items}
      value={select('Value', selectKnobItems, null)}
      topIcon={topIcon}
      bottomIcon={bottomIcon}
      onValueChange={actionWithoutEvent('onValueChange')}
      hasEmptyItem={boolean('Empty item', false)}
      isCircular={boolean('Is Circular', false)}
      siblingRange={number('Number of siblings', 3, siblingRangeSliderOptions)}
      onFocus={actionWithoutEvent('onFocus')}
      onBlur={actionWithoutEvent('onBlur')}
      onKeyDown={keyboardAction('onKeyDown')}
      onKeyUp={keyboardAction('onKeyUp')}
      onKeyPress={keyboardAction('onKeyPress')}
    />
  ))
  .add('default (stateful)', () => (
    <CarouselPickerWrapper
      items={items}
      topIcon={topIcon}
      bottomIcon={bottomIcon}
      onValueChange={actionWithoutEvent('onValueChange')}
      hasEmptyItem={boolean('Empty item', false)}
      isCircular={boolean('Is Circular', false)}
      siblingRange={number('Number of siblings', 3, siblingRangeSliderOptions)}
      onKeyDown={keyboardAction('onKeyDown')}
      onKeyUp={keyboardAction('onKeyUp')}
      onKeyPress={keyboardAction('onKeyPress')}
      onFocus={actionWithoutEvent('onFocus')}
      onBlur={actionWithoutEvent('onBlur')}
    />
  ));
