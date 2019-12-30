import * as React from 'react';
import { DropdownOpenState } from './Dropdown';

type DropdownProps = {
  openState?: DropdownOpenState;
  onOpenStateChange?: (openState: DropdownOpenState) => void;
};

export type ComponentWithUncontrolledDropdownState = React.Component & {
  openState: DropdownOpenState;
};

export const withUncontrolledDropdownState = () =>
  <TProps extends DropdownProps>(
    Component: React.ComponentType<TProps>,
  ) => {
    type State = {
      openState: DropdownOpenState;
    };

    return class UncontrolledDropdownStateWrapper extends React.Component<TProps, State> {
      static displayName = 'UncontrolledDropdownStateWrapper';

      constructor(props: TProps) {
        super(props);
        this.state = {
          openState: props.openState || 'closed',
        };
      }

      get openState() {
        return this.state.openState;
      }

      handleOpenStateChange = (openState: DropdownOpenState) => {
        this.setState({ openState });
        this.props.onOpenStateChange && this.props.onOpenStateChange(openState);
      }

      render() {
        return (
          <Component
            {...this.props}
            openState={this.state.openState}
            onOpenStateChange={this.handleOpenStateChange}
          />
        );
      }
    };
  };
