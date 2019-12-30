import * as React from 'react';
import { ToggleProps } from '../Toggle/types';
import { RadioGroupContext, RadioGroupContextInterface } from './RadioGroup';
import { Toggle } from '../Toggle';

export class RadioToggle extends  React.Component<ToggleProps> {
  static contextType = RadioGroupContext;
  context:RadioGroupContextInterface;

  constructor(props: Readonly<ToggleProps>) {
    super(props);
    this.internalOnClick = this.internalOnClick.bind(this);
  }

  private internalOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (this.props.onClick != null) {
      this.props.onClick(event);
    }

    if (this.context &&
      this.context.onValueChange &&
      this.props.value !== undefined) {
      this.context.onValueChange(this.props.value);
    }
  }

  get isToggled():boolean {
    if (this.props.hasOwnProperty('toggled')) {
      return !!this.props.toggled;
    }
    if (this.context) {
      return this.context.value === this.props.value;
    }
    return false;
  }

  render() {
    return (
      <Toggle {...this.props} toggled={this.isToggled} onClick={this.internalOnClick}/>
    );
  }
}
