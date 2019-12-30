import * as React from 'react';
import styled from 'styled-components';

import { Separator } from './Separator';

export type TopBarProps = {
  children?: React.ReactNode|string;
  mobile?: boolean;
};

const StyledTopBar = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 13px 0;
  width: ${ props => props.mobile ? '100%' : '100vw'};
  height: 64px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.24);
  background-color: ${props => props.theme.palette.foreground };
  color: ${props => props.theme.palette.text };
`;

export class TopBar extends React.Component<TopBarProps> {
  static Separator = Separator;
  render() {
    const { mobile } = this.props;
    return <StyledTopBar mobile={mobile}>{this.props.children}</StyledTopBar>;
  }
}
