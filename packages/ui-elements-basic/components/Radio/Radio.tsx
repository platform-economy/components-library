import * as React from 'react';
import styledComponents from 'styled-components';
import { RadioGroupContext, RadioGroupContextInterface } from './RadioGroup';
import classes from 'classnames';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  groupName?:string;
  checked?:boolean;
  value: string | string[] | number;
  onValueChange?: (value: string | string[] | number, ...args: unknown[]) => void;
}

interface RadioState {
  hasFocus:boolean;
}

const StyledInputWrapper = styledComponents.span<React.HTMLAttributes<HTMLSpanElement>>`
  & > input[type=radio]{
    opacity: 0;
    display: inline;
    width:0px;
    height:0px;
    margin:0px;
    padding:0px;
  }
  & svg {
    margin: 0px 5px
    width: 1em;
    height: 1em;
  }
  & svg .radio-button-border{
    stroke-width: 41;
    stroke: ${props => props.theme.palette.text_inverted};
    fill: transparent;
  }
  &.focus svg .radio-button-border{
    stroke: ${props => props.theme.palette.active};
  }
  &:hover svg .radio-button-border,
  &:focus svg .radio-button-border{
    stroke: ${props => props.theme.palette.text};
  }
  &:active svg .radio-button-border{
    stroke: ${props => props.theme.palette.active_lowered};
  }
  &:disabled svg .radio-button-border,
  &.disabled svg .radio-button-border{
    stroke: ${props => props.theme.palette.inactive};
  }

  & svg .radio-button-selection{
    fill: ${props => props.theme.palette.text_inverted};
  }
  &.focus svg .radio-button-selection{
    fill: ${props => props.theme.palette.active};
  }
  &:hover svg .radio-button-selection,
  &:focus svg .radio-button-selection{
    fill: ${props => props.theme.palette.text};
  }
  &:active svg .radio-button-selection{
    fill: ${props => props.theme.palette.active_lowered};
  }
  &:disabled svg .radio-button-selection,
  &.disabled svg .radio-button-selection{
    fill: ${props => props.theme.palette.inactive};
  }
  &.checked svg .radio-button-selection{
    display:auto;
  }
  &.unchecked svg .radio-button-selection{
    display:none;
  }
  &.disabled label{
    color: ${props => props.theme.palette.inactive};
  }
`;

export class Radio extends React.Component<RadioProps, RadioState> {
  static contextType = RadioGroupContext;
  context:RadioGroupContextInterface;
  private inputElement: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

  constructor(props: Readonly<RadioProps>) {
    super(props);
    this.state = { hasFocus: false };
    this.internalOnClick = this.internalOnClick.bind(this);
    this.internalOnBlur = this.internalOnBlur.bind(this);
    this.internalOnFocus = this.internalOnFocus.bind(this);
    this.internalOnChange = this.internalOnChange.bind(this);
  }

  private internalOnClick(event: React.MouseEvent<HTMLInputElement>) {
    if (this.inputElement.current !== event.target) {
      // redirect the click event to pass throw radio input
      this.inputElement.current!.focus();
      this.inputElement.current!.click();
      event.stopPropagation();
    } else {
      if (this.props.onClick != null) {
        this.props.onClick(event);
      }
    }
  }
  private internalOnFocus(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ hasFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }
  private internalOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    this.setState({ hasFocus: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  }
  private internalOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.props.onValueChange != null && event.target.checked) {
      this.props.onValueChange(this.props.value);
    }
    if (this.props.onChange != null) {
      this.props.onChange(event);
    }
    if (this.context &&
      this.context.onValueChange &&
      event.target.checked) {
      this.context.onValueChange(this.props.value);
    }
  }

  get isChecked():boolean {
    if (this.context) {
      return this.context.value === this.props.value;
    }
    return this.props.checked || false;
  }

  get hasFocus():boolean {
    return this.state.hasFocus;
  }

  render() {
    const {
      groupName,
      checked,
      children,
      value,
      onClick,
      onValueChange,
      onChange,
      onFocus,
      onBlur,
      ...inputProps } = this.props;
    return (
      <StyledInputWrapper
        onClick={this.internalOnClick}
        className={classes(
          {
            checked: this.isChecked,
            unchecked: !this.isChecked,
            disabled: inputProps.disabled,
            focus: this.hasFocus,
          })}
        {...inputProps}
      >
        <input
          type="radio"
          name={this.props.groupName}
          value={value}
          onFocus={this.internalOnFocus}
          onBlur={this.internalOnBlur}
          onChange={this.internalOnChange}
          ref={this.inputElement}
          disabled={inputProps.disabled}
        />
        <svg viewBox="0 0 512 512">
          <circle className="radio-button-border" cx="256" cy="328" r="160"/>
          <circle className="radio-button-selection" cx="256" cy="328" r="80"/>
        </svg>
        {children}
      </StyledInputWrapper>
    );

  }
}
