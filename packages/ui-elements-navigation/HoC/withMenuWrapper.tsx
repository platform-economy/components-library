import * as React from 'react';
import styled from 'styled-components';

import { StyledMenuItem, StyledMenuItemLabel, StyledMenuItemIcon } from '../components/MenuItem';

export type Alignment = 'left' | 'center' | 'right';
export type IconPosition = 'left' | 'top' | 'right';

export type MenuProps = {
  isMobile?: boolean;
  display: ('icon' | 'label')[];
  alignment: Alignment;
  iconPosition: IconPosition;
  children: React.ReactNode;
};

export const getJustifyContent = (alignment: Alignment) => {
  if (alignment === 'left') {
    return 'flex-start';
  }
  if (alignment === 'right') {
    return 'flex-end';
  }
  return 'center';
};

export const getFlexDirection = (iconPosition: IconPosition) => {
  if (iconPosition === 'left' || iconPosition === 'right') {
    return 'row';
  }
  return 'column';
};

export const getBorderWidth = (alignment: Alignment) => (
  alignment === 'right' ? '0 4px 0 0' : '0 0 0 4px'
);

export const getOrder = (iconPosition: IconPosition) => {
  if (iconPosition === 'left' || iconPosition === 'top') {
    return -1;
  }
  return 1;
};

export const getDisplay = (display: ('icon' | 'label')[], element: 'icon' | 'label') => (
  display.includes(element) ? 'block' : 'none'
);

export const getPadding = (isMobile?: boolean) => (
  isMobile ? '0 21px' : '0 7px'
);

export const StyledWithMenuWrapper = styled.div<MenuProps>`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.palette.surface};

  ${StyledMenuItem} {
    justify-content: ${props => getJustifyContent(props.alignment)};
    flex-direction: ${props => getFlexDirection(props.iconPosition)};
    border-width: ${props => getBorderWidth(props.alignment)}
  }

  ${StyledMenuItemLabel} {
    display: ${props => getDisplay(props.display, 'label')};
    text-align: ${props => props.alignment};
  }

  ${StyledMenuItemIcon} {
    display: ${props => getDisplay(props.display, 'icon')};
    order: ${props => getOrder(props.iconPosition)};
    padding: ${props => getPadding(props.isMobile)};
  }
`;

export const withMenuWrapper = (WrappedComponent: React.ComponentType) =>
  (props: MenuProps) => (
    <StyledWithMenuWrapper {...props}>
      <WrappedComponent>
        {props.children}
      </WrappedComponent>
    </StyledWithMenuWrapper>
  );
