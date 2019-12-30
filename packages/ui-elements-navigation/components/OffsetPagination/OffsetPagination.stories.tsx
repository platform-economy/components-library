import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';
import { OffsetPagination } from './index';
import { OffsetPaginationProps, OnChangeData } from './types';

library.add(
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
);

const action = decorateAction([
  args => args.filter(arg => !arg || !arg.nativeEvent),
]);

type OffsetPaginationWrapperProps = OffsetPaginationProps;
type OffsetPaginationState = {
  offset: number;
};
class OffsetPaginationWrapper extends React.Component<
  OffsetPaginationWrapperProps,
  OffsetPaginationState
> {
  state = {
    offset: 0,
  };

  handleChange = (data: OnChangeData, e: React.SyntheticEvent) => {
    this.setState({ offset: data.newOffset });
    this.props.onChange && this.props.onChange(data, e);
  }

  render() {
    return (
      <OffsetPagination
        {...this.props}
        offset={this.state.offset}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('ui-elements-navigation/OffsetPagination', module)
  .add('pure (stateless)', () => (
    <OffsetPagination
      offset={number('Offset', 0)}
      limit={number('Limit', 10)}
      totalItems={number('Total items', 100)}
      siblingRange={number('Sibling range', 2)}
      boundaryRange={number('Boundary range', 1)}
      showFirstAndLastNav={boolean('Show first and last button', false)}
      onChange={action('onChange')}
    />
  ))
  .add('stateful with default (text) nav icons', () => (
    <OffsetPaginationWrapper
      offset={number('Offset', 0)}
      limit={number('Limit', 10)}
      totalItems={number('Total items', 100)}
      siblingRange={number('Sibling range', 2)}
      boundaryRange={number('Boundary range', 1)}
      showFirstAndLastNav={boolean('Show first and last button', false)}
      onChange={action('onChange')}
    />
  ))
  .add('stateful with custom nav icons', () => (
    <OffsetPaginationWrapper
      offset={number('Offset', 0)}
      limit={number('Limit', 10)}
      totalItems={number('Total items', 100)}
      siblingRange={number('Sibling range', 2)}
      boundaryRange={number('Boundary range', 1)}
      showFirstAndLastNav={boolean('Show first and last button', false)}
      onChange={action('onChange')}
      previousNavIcon={<FontAwesomeIcon icon="angle-left"/>}
      nextNavIcon={<FontAwesomeIcon icon="angle-right"/>}
      firstNavIcon={<FontAwesomeIcon icon="angle-double-left"/>}
      lastNavIcon={<FontAwesomeIcon icon="angle-double-right"/>}
    />
  ));
