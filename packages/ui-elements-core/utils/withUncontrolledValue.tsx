import * as React from 'react';

type InputProps<TValue> = {
  value?: TValue,
  onValueChange?(value: TValue, ...args: unknown[]): void;
};

export type ComponentWithValue<TValue> = React.Component & {
  value: TValue;
};

export const withUncontrolledValue = () =>
  <TProps extends InputProps<unknown>>(
    ControlledComponent: React.ComponentType<TProps>,
  ) => {
    type State = {
      value?: unknown;
    };

    return class UncontrolledValueWrapper extends React.Component<TProps, State> {
      static displayName = 'UncontrolledValueWrapper';

      constructor(props: TProps) {
        super(props);
        this.state = {
          value: props.value,
        };
      }

      get value() {
        return this.state.value;
      }

      handleValueChange = (value: unknown, ...args: unknown[]) => {
        this.setState({ value });
        this.props.onValueChange && this.props.onValueChange(value, ...args);
      }

      render() {
        return (
          <ControlledComponent
            {...this.props}
            value={this.state.value}
            onValueChange={this.handleValueChange}
          />
        );
      }
    };
  };
