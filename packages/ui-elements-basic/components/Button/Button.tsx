import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: .75em;
  font-weight: bold;
  outline: none;
  text-align: center;
  vertical-align: middle;
  min-height: 35px;
  border: none;
  border-radius: 3px;
  padding: 5px 30px;
  transition: 100ms all ease-in-out;
  white-space: nowrap;

  ::-moz-focus-inner {
    border: 0;
  }

  .icon-left {
    margin: 0 5px 0 0;
  }

  .icon-right {
    margin: 0 0 0 5px;
  }
`;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { iconLeft, iconRight, children, ...restProps } = props;

  return (
    <StyledButton {...restProps} >
      {iconLeft && <span className="icon-left">{iconLeft}</span>}
      {children}
      {iconRight && <span className="icon-right">{iconRight}</span>}
    </StyledButton>
  );
};
