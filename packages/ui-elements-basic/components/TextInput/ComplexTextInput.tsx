import * as React from 'react';
import { TextInputProps } from './types';
import classNames from 'classnames';
import styled from 'styled-components';

export interface ComplexTextInputProps extends TextInputProps {
  componentsLeft?: React.ReactNode;
  componentsRight?: React.ReactNode;
}

export const StyledTextInput = styled.div<TextInputProps>`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.23);
  background-color: ${props => props.theme.palette.foreground};
  color: ${props => props.theme.palette.text};
  border-bottom: 2px solid transparent;
  position: relative;
  cursor: text;

  &.hasFocus{
    border-bottom: 2px solid ${props => props.theme.palette.active};
  }

  svg, i {
    box-sizing: border-box;
    height: 100%;
    margin: 0 10px;
  }

  input {
    font-size: inherit;
    border: none;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 10px;
    box-sizing: border-box;
    background-color: transparent;
    color: inherit;
  }
  input:focus {
    outline: transparent;
  }

  * {
    display: flex;
    margin: 0;
  }
  @media screen and (min-width: 414px){
    input::-webkit-input-placeholder {
    font-size: .875em;
    }
    input::-moz-placeholder {
      font-size: .875em;
    }
    input:-ms-input-placeholder {
      font-size: .875em;
    }
    input::placeholder {
      font-size: .875em;
    }
  }
  & input + i{
    font-size: 1em;
    transition: all .3s ease;
    color: ${props => props.theme.palette.text_inverted};
    cursor: pointer;
  }
  & input:placeholder-shown + i{
    opacity: 0;
    transform: rotate(90deg);
  }
  & input + i:hover{
    color: ${props => props.theme.palette.text}
  }
`;

export class ComplexTextInput extends React.Component<ComplexTextInputProps> {
  private TextInputRef: React.RefObject<HTMLInputElement>;
  static defaultProps = { type: 'text' };

  state = { hasFocus: false };

  constructor(props:ComplexTextInputProps) {
    super(props);
    this.TextInputRef = React.createRef();
  }

  handleClick = (event:React.MouseEvent) => {
    /* istanbul ignore else */
    if (this.TextInputRef.current) {
      this.TextInputRef.current.focus();
      event.preventDefault();
    }
  }

  handleFocus = (event:React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
    this.setState({ hasFocus: true });
  }

  handleBlur = (event:React.FocusEvent<HTMLInputElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({ hasFocus: false });
  }
  clearInput = () => {
    /* istanbul ignore else */
    if (this.TextInputRef.current) {
      this.TextInputRef.current.value = '';
    }
  }

  render() {
    const { componentsLeft, componentsRight, clearIcon, ...inputProps } = this.props;
    const clearBtn = clearIcon ? <i onClick={this.clearInput}>{clearIcon}</i> : null ;
    return (
      <StyledTextInput
        className={classNames('TextInput', { hasFocus: this.state.hasFocus })}
        onClick={this.handleClick}
      >
        {componentsLeft}
        <input
          {...inputProps}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          ref={this.TextInputRef}
        />
        {clearBtn}
        {componentsRight}
      </StyledTextInput>
    );
  }
}
