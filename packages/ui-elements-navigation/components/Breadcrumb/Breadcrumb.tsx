import React, { Component } from 'react';
import { Item } from './Item';
import styled from 'styled-components';

export type BreadcrumbProps = {
  divider?:React.ReactNode;
};

const StyledBreadcrumb = styled.div<BreadcrumbProps>`
  width: auto;
  height: 1em;
  font-size: 1em;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.48px;
  color: ${props => props.theme.palette.text };
`;

export class Breadcrumb extends Component<BreadcrumbProps> {

  static Item = Item;

  renderChildren = () => {
    const { children, divider } = this.props;

    return (
      React.Children.map(children, (child, index) => (
        <>
          {child}
          {(index < React.Children.count(children) - 1) && divider}
        </>
      ))
    );
  }

  render() {

    return (
      <StyledBreadcrumb>
        {this.renderChildren()}
      </StyledBreadcrumb>
    );
  }
}
