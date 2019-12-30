import * as React from 'react';
import styled from 'styled-components';

export type MenuItemProps = {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
};

const activeSwitch = (props:{ active?: boolean }, ifTrue?:string, ifFalse?:string) => props.active ?
  ifTrue :
  ifFalse;

export const StyledMenuItem = styled.button<{ active?: boolean }>`
  font: inherit;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 7px;
  margin-bottom: 2px;
  color: ${props => activeSwitch(
    props,
    props.theme.palette.text,
    props.theme.palette.text_inverted,
    )};
  background-color: ${props => props.theme.palette.surface};
  border-width: 0 0 0 4px;
  border-style: solid;
  border-color: ${props => activeSwitch(
    props,
    props.theme.palette.active,
    'transparent',
  )};
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.palette.text};
  }
`;

export const StyledMenuItemLabel = styled.div`
  font-size: .875em;
  font-weight: bold;
  flex: 0 0 auto;
  max-width: 128px;
  padding: 0 7px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMenuItemIcon = styled.div`
  &&& {
    font-size: 1.25em;
    flex: 0 0 auto;
    width: 25px;
  }
`;

export const MenuItem = (props: MenuItemProps) => {
  return (
    <StyledMenuItem active={props.active} onClick={props.onClick}>
      <StyledMenuItemIcon>
        {props.icon}
      </StyledMenuItemIcon>
      <StyledMenuItemLabel>
        {props.children}
      </StyledMenuItemLabel>
    </StyledMenuItem>
  );
};
