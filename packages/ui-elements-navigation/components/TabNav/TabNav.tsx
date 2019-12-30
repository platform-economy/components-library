import * as React from 'react';
import styled from 'styled-components';

import { Tab, TabProps } from './Tab';

export type TabNavProps = {
  children: React.ReactNode,
};

export class TabNav extends React.Component<TabNavProps> {
  static Tab = Tab;
  underlineHeight = 3;

  state = {
    activeTabWidth: 0,
    activeTabHeight: 0,
    activeTabTop: 0,
    activeTabLeft: 0,
    activeTabDisabled: false,
  };

  StyledTabNav = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: auto;
    padding: 0;
    list-style-type: none;
    border-bottom: 1px solid ${ props => props.theme.palette.foreground };
    /* position: relative; */

    &:after {
      content:'';
      border-bottom: ${this.underlineHeight}px solid
        ${props => this.state.activeTabDisabled
          ? props.theme.palette.inactive
          : props.theme.palette.active_lowered};
      position: absolute;
      width: ${() => this.state.activeTabWidth}px;
      top: ${() => this.state.activeTabTop + this.state.activeTabHeight - 3}px;
      left: ${() => this.state.activeTabLeft}px;
      transition: 0.2s ease-out;
    }
  `;

  updateActiveTabPosition = (
    activeTabWidth:number,
    activeTabHeight:number,
    activeTabTop:number,
    activeTabLeft: number,
    activeTabDisabled: boolean,
  ) =>
    this.setState({
      activeTabWidth,
      activeTabHeight,
      activeTabTop,
      activeTabLeft,
      activeTabDisabled,
    })

  renderChildren = () => {
    return React.Children.map(
      this.props.children,
      (child: React.ReactElement<TabProps>) =>
        React.cloneElement(child, {
          onActiveTabPositionChanged: this.updateActiveTabPosition,
        }));
  }

  render() {
    return (
      <this.StyledTabNav>
        {this.renderChildren()}
      </this.StyledTabNav>
    );
  }
}
