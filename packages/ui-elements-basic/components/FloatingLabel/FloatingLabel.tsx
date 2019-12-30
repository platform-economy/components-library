import * as React from 'react';
import styled from 'styled-components';

export type FloatingLabelProps = {
  children?: React.ReactNode;
  focused?: boolean;
  height?: number;
};

export const FloatingLabel = styled.div<FloatingLabelProps>`
  position: relative;

  & input::placeholder,
  & input::-webkit-input-placeholder {
    opacity: 0;
  }

  & input:-ms-input-placeholder {
    opacity: 0;
  }

  & label{
    position: absolute;
    will-change: transform;
    font-size: 1em;
    color: ${props => props.theme.palette.text_inverted};
    pointer-events:none;
    transition: all 0.3s cubic-bezier(.06,.67,.32,.82);
    transform: translate(10px, -25px);
    ${props => props.focused && `
      transform: translate(0px, -55px);
      font-size: .75em;
      color: ${props.theme.palette.text};
    `}
    @media screen and (min-width: 414px){
      font-size: .875em;
    }
  }

  & div {
    margin-top: 15px;
  }

  &:focus-within label{
    transform: ${props => props.height && `translate(0px, ${-props.height / 2 - 20}px)`};
    font-size: .75em;
    color: ${props => props.theme.palette.text};
  }

  & input:not(:placeholder-shown) ~ label {
    transform: ${props => props.height && `translate(0px, ${-props.height / 2 - 20}px)`};
    font-size: .75em;
    color: ${props => props.theme.palette.text};
  }
`;
