import * as React from 'react';
import styled from 'styled-components';
import { TextInputProps } from './types';

const StyledTextInput = styled.input<TextInputProps>`
  font-size: inherit;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 35px;
  box-shadow: ${props => props.hollow ?
    'none' :
    '0 1px 3px 0 rgba(0, 0, 0, 0.23)'};
  background-color: ${props => props.hollow ?
    'transparent' :
    props.theme.palette.foreground
  };
  color: ${props => props.theme.palette.text};
  cursor: text;
  border: none;
  margin: 0;
  padding: 10px;
  padding-right: ${props => props.clearIcon ? '30px' : '10px'};
  box-sizing: border-box;
  border-bottom:${props => props.hollow ?
    `2px solid ${props.theme.palette.text_inverted}` :
    '2px solid transparent'};

  &:focus{
    border-bottom: 2px solid ${props => props.theme.palette.active};
    outline: transparent;
  }

  &:invalid{
    border-bottom: 2px solid ${props => props.theme.palette.negative};
    outline: transparent;
  }

  svg, i {
    box-sizing: border-box;
    height: 100%;
    margin: 0 10px;
  }
  @media screen and (min-width: 414px){
    &::-webkit-input-placeholder {
    font-size: .875em;
    }
    &::-moz-placeholder {
      font-size: .875em;
    }
    &:-ms-input-placeholder {
      font-size: .875em;
    }
    &::placeholder {
      font-size: .875em;
    }
  }

  & + i{
    font-size: 1em;
    position: absolute;
    top: 9px;
    right: 10px;
    transition: all .3s ease;
    color: ${props => props.theme.palette.text_inverted};
    cursor: pointer;
    pointer-events: auto;
  }
  &:placeholder-shown + i{
    cursor: text;
    pointer-events: none;
    opacity: 0;
    transform: rotate(90deg);
  }
  & + i:hover{
    color: ${props => props.theme.palette.text}
  }
`;

export class TextInput extends React.Component<TextInputProps> {
  private TextInputRef: React.RefObject<HTMLInputElement>;
  constructor(props:TextInputProps) {
    super(props);
    this.TextInputRef = React.createRef();
  }
  clearInput = () => {
    /* istanbul ignore else */
    if (this.TextInputRef.current) {
      this.TextInputRef.current.value = '';
      this.TextInputRef.current.focus();
    }
  }
  render() {
    const { clearIcon } = this.props;
    const clearBtn = clearIcon ? <i onClick={this.clearInput}>{clearIcon}</i> : null ;
    return (
      <React.Fragment>
        <StyledTextInput
          {...this.props}
          ref={this.TextInputRef}
        />
        {clearBtn}
      </React.Fragment>
    );
  }
}
