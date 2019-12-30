import * as React from 'react';

export interface RadioGroupContextInterface{
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
  value: string | string[] | number;
}

export interface RadioGroupProps extends RadioGroupContextInterface {
  groupName?:string;
}

export interface RadioGroupState {
  radioGroupContext:RadioGroupContextInterface;
}

export const RadioGroupContext =
  React.createContext<RadioGroupContextInterface|null>(null);

export class RadioGroup extends  React.Component<RadioGroupProps, RadioGroupState>{

  constructor(props:RadioGroupProps, ...args:unknown[]) {
    super(props, ...args);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.state = {
      radioGroupContext: {
        value: props.value,
        onValueChange: this.handleValueChange,
      },
    };
  }

  handleValueChange(value: string | string[] | number) {
    if (this.props.onValueChange != null) {
      this.props.onValueChange(value);
    }
  }

  static getDerivedStateFromProps(newProps: RadioGroupProps, state: RadioGroupState) {
    if (newProps.value !== state.radioGroupContext.value) {
      return {
        radioGroupContext: {
          ...state.radioGroupContext,
          value: newProps.value,
        },
      };
    }
    return null;
  }

  render() {
    return(
      <RadioGroupContext.Provider value={this.state.radioGroupContext}>
        {this.props.children}
      </RadioGroupContext.Provider>
    );
  }
}
