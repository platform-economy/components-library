import React from 'react';
import styled from 'styled-components';

const StyledHorizontalRule = styled.hr`
  border: none;
  border-bottom: 1px solid;
  color: ${props => props.theme.palette.divider_inverted };
  width: auto;
`;

export const HorizontalRule = () => <StyledHorizontalRule />;
