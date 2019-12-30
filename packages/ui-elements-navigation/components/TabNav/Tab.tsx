import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

export type TabProps = {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler,
  active?: boolean,
  disabled?: boolean,
  onActiveTabPositionChanged?: (
    width:number,
    height:number,
    top:number,
    left:number,
    disabled:boolean,
  ) => void,
};

const StyledTab = styled.li`
    color: ${ props => props.theme.palette.text };
    min-height: 1.25em;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.38px;
    text-align: center;
    padding: 10px 45px;
    cursor: pointer;
    border-bottom: 3px solid transparent;

    &.active {
      font-weight: bold;
      color: ${ props => props.theme.palette.active_lowered };
    }

    &.disabled {
      color: ${ props => props.theme.palette.inactive };
      cursor: not-allowed;
    }

    &:hover:not(.disabled):not(.active) {
      color: ${ props => props.theme.palette.active_hovered };
      border-bottom: 3px solid ${ props => props.theme.palette.active_hovered };
    }
`;

export const Tab = (props: TabProps) => {
  const tabRef = React.createRef<HTMLLIElement>();
  const { children, onClick, active, disabled } = props;

  const getActiveTabPosition = () => {
    const tabNode = tabRef.current;
    if (tabNode && active && props.onActiveTabPositionChanged) {
      const { width, height, top, left } = tabNode.getBoundingClientRect();
      props.onActiveTabPositionChanged(
        width,
        height,
        top,
        left,
        disabled ? true : false,
      );
    }
  };

  useEffect(
    () => {
      const handleResize = () => getActiveTabPosition();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });

  useLayoutEffect(() => getActiveTabPosition(), [props.active]);

  return (
    <StyledTab
      ref={tabRef}
      className={classnames({ active, disabled })}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </StyledTab>
  );
};
