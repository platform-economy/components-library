import * as React from 'react';
import styled from 'styled-components';

export interface FormGroupProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  layout: 'vertical' | 'horizontal';
  style?: object;
  className?: string;
}

const isVertical = (layout:'vertical'|'horizontal') => layout === 'vertical';

export const FormGroup = styled.label<FormGroupProps>`
  display: flex;
  flex-direction: ${ props => isVertical(props.layout) ? 'column' : 'row' };
  align-items: ${ props => isVertical(props.layout) ? 'flex-start' : 'center' };
  justify-content: ${ props => isVertical(props.layout) ? 'center' : 'flex-start' };
  width: 100%;
`;
