import * as React from 'react';
import styled from 'styled-components';

export interface InputLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: string;
  style?: object;
  className?: string;
  htmlFor?: string;
}

export const InputLabel = styled.label<InputLabelProps>`
  font-size: .75em;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  flex-grow: 0.5;
  line-height: normal;
  letter-spacing: normal;
  color: ${ props => props.theme.palette.text };
  margin-bottom: 5px;
`;
