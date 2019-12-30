import * as React from 'react';
import styled from 'styled-components';
import classname from 'classnames';

export interface CheckBoxProps extends Pick<
  React.InputHTMLAttributes<HTMLElement>,
  Exclude<keyof React.InputHTMLAttributes<HTMLElement>, 'value'>>
{
  value?:boolean |
    'true' | 'false' | 'schrodinger' |
    '0' | '1' | '2' |
    'check' | 'uncheck' | 'indeterminate';
  name?:string;
  onValueChange?: (value: boolean | string | string[] | number, ...args: unknown[]) => void;
}

const StyledInputWrapper = styled.span<React.HTMLAttributes<HTMLElement>>`
  & {
    cursor: pointer;
  }
  &.disabled *{
    color: ${props => props.theme.palette.inactive};
    cursor: not-allowed;
  }
  & > input{
    display: none;
  }
  & > svg {
    margin: 0px 5px;
    width: 1em;
    height: 1em;
  }
  & > svg > path.checkbox-button-bg {
    stroke-width: 0;
    stroke: ${props => props.theme.palette.active};
    fill: ${props => props.theme.palette.active};
    display:none;
  }
  &.checked > svg > path.checkbox-button-bg,
  &.indeterminate > svg > path.checkbox-button-bg {
    display:inline;
  }
  &:hover > svg > path.checkbox-button-bg,
  &:focus > svg > path.checkbox-button-bg {
    stroke: ${props => props.theme.palette.active_hovered};
    fill: ${props => props.theme.palette.active_hovered};
  }
  &:active > svg > path.checkbox-button-bg {
    stroke: ${props => props.theme.palette.active_lowered};
    fill: ${props => props.theme.palette.active_lowered};
  }
  &&.disabled > svg > path.checkbox-button-bg {
    stroke: ${props => props.theme.palette.inactive};
    fill: ${props => props.theme.palette.inactive};
  }

  & > svg > path.checkbox-button-border {
    stroke-width: 0;
    stroke: ${props => props.theme.palette.text_highlight};
    fill: ${props => props.theme.palette.text_highlight};
    display:none;
  }
  &.unchecked > svg > path.checkbox-button-border {
    display:inline
  }
  &:hover > svg > path.checkbox-button-border,
  &:focus > svg > path.checkbox-button-border {
    stroke: ${props => props.theme.palette.active_hovered};
    fill: ${props => props.theme.palette.active_hovered};
  }
  &:active > svg > path.checkbox-button-border {
    stroke: ${props => props.theme.palette.active_lowered};
    fill: ${props => props.theme.palette.active_lowered};
  }
  &&.disabled > svg > path.checkbox-button-border {
    stroke: ${props => props.theme.palette.inactive};
    fill: ${props => props.theme.palette.inactive};
  }

  & > svg > path.checkbox-button-selection {
    stroke-width: 3;
    stroke: ${props => props.theme.palette.text_highlight};
    fill: ${props => props.theme.palette.text_highlight};
    display:none;
  }
  &.checked > svg > path.checkbox-button-selection {
    display:inline;
  }
  &&.disabled > svg > path.checkbox-button-selection {
    stroke: ${props => props.theme.palette.inactive};
    fill: ${props => props.theme.palette.inactive};
  }

  & > svg > path.checkbox-button-schrodinger {
    stroke-width: 3;
    stroke: ${props => props.theme.palette.text};
    fill: ${props => props.theme.palette.text};
    display:none;
  }
  &.indeterminate > svg > path.checkbox-button-schrodinger {
    display:inline;
  }
  &&.disabled > svg > path.checkbox-button-schrodinger {
    stroke: ${props => props.theme.palette.inactive};
    fill: ${props => props.theme.palette.inactive};
  }
`;

export class CheckBox extends React.Component<CheckBoxProps> {
  constructor(props: Readonly<CheckBoxProps>) {
    super(props);
    this.internalOnClick = this.internalOnClick.bind(this);
    this.internalOnChange = this.internalOnChange.bind(this);
  }

  private inputElement:HTMLInputElement|null;
  private internalOnClick (event:React.MouseEvent<HTMLElement, MouseEvent>) {
    if (this.props.disabled) {
      return;
    }

    const castEvent: React.BaseSyntheticEvent<MouseEvent, HTMLElement> = event;
    if (
      this.inputElement &&
      castEvent.target &&
      castEvent.target.tagName !== 'INPUT'
    ) {
      this.inputElement.click();
    } else {
      // skip simulatet click on html input\
      return;
    }
    if (this.props.onClick != null) {
      this.props.onClick(event);
    }
  }

  private internalOnChange (event:React.ChangeEvent<HTMLElement>) {
    if (this.inputElement != null && this.props.onValueChange != null && !this.props.checked) {
      this.props.onValueChange(!this.checkedInternal);
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  }

  private checkedInternal:boolean = false;
  private indeterminateInternal:boolean = false;

  render() {
    const {
      children,
      value,
      onClick,
      onValueChange,
      onChange,
      ...inputProps
    } = this.props;

    if (typeof value === 'boolean') {
      this.checkedInternal = value;
      this.indeterminateInternal = false;
    } else {
      switch (value) {
        case 'true': case '1': case 'check':
          this.checkedInternal = true;
          this.indeterminateInternal = false;
          break;
        case 'false': case 'uncheck': case '0':
          this.checkedInternal = false;
          this.indeterminateInternal = false;
          break;
        // case 'schrodinger': case 'indeterminate': case '2':
        default:
          this.checkedInternal = true;
          this.indeterminateInternal = true;
          break;
      }
    }

    return (
      <StyledInputWrapper
        onClick={this.internalOnClick}
        className={classname({
          checked: this.checkedInternal && !this.indeterminateInternal,
          unchecked: !this.checkedInternal && !this.indeterminateInternal,
          disabled: inputProps.disabled,
          indeterminate: this.indeterminateInternal,
        })}
        {...inputProps}
      >
        <input
          type="checkbox"
          name={inputProps.name}
          value={inputProps.name}
          checked={this.checkedInternal}
          onChange={this.internalOnChange}
          ref={input => this.inputElement = input}
        />
        <svg viewBox="-144 -144 624 624">
          <path
            className={'checkbox-button-bg'}
            d={'M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352' +
            'c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48z'}
          />
          <path
            className={'checkbox-button-border'}
            d={'M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352' +
            'c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352z'}
          />
          <path
            className={'checkbox-button-selection'}
            d={
            'm 310.864 241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516' +
            'c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536' +
            'c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216' +
            'c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718' +
            'c4.667 4.706 4.637 12.304-.068 16.971z'}
          />
          <path
            className={'checkbox-button-schrodinger '}
            d={
            'M 92 296 c -6.6 0 -12 -5.4 -12 -12 v -56 c 0 -6.6 5.4 -12 12 -12 h 264 ' +
            'c 6.6 0 12 5.4 12 12 v 56 c 0 6.6 -5.4 12 -12 12 H 92 Z'}
          />
        </svg>
        {children}
      </StyledInputWrapper>
    );
  }
}
