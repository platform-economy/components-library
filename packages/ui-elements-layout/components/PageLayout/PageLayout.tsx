import * as React from 'react';
import styled from 'styled-components';

export type PageLayoutProps = {
  mobile?: boolean;
  header?: React.ReactNode;
  navigation?: React.ReactNode;
  footer?: React.ReactNode;
  content?: React.ReactNode;
};

export const orientationSwitch = (mobile?:boolean) => {
  return mobile ? 'column' : 'row';
};

export const widthSwitch = (mobile?:boolean) => {
  return mobile ? '100%' : 'auto';
};

export const paddingSwitch = (mobile?:boolean) => {
  return mobile ? '14px 22px' : '14px 40px';
};

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.palette.background};
  min-height: 100vh;
  flex-wrap: nowrap;
`;

const Main = styled.div<PageLayoutProps>`
  display: flex;
  flex: 1 1;
  flex-direction: ${props => orientationSwitch(props.mobile)};
`;

const PageHeader = styled.header`
  width: 100%;
  background-color: grey;
`;

const Navigation = styled.nav<PageLayoutProps>`
  width: ${props => widthSwitch(props.mobile) };
`;

const Content = styled.div<{ mobile?: boolean }>`
  padding: ${props => paddingSwitch(props.mobile)};
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
`;

const PageFooter = styled.div`
  width: 100%;
  background-color: ${props => props.theme.palette.divider};
`;

export class PageLayout extends React.Component<PageLayoutProps> {
  render() {
    return (
      <Layout className="Layout">
        <PageHeader className="PageHeader">
          {this.props.header}
        </PageHeader>
        <Main className="Main" mobile={this.props.mobile}>
          <Navigation className="Navigation" mobile={this.props.mobile}>
            {this.props.navigation}
          </Navigation>
          <Content mobile={this.props.mobile} className="Content">
            {this.props.content}
          </Content>
        </Main>
        <PageFooter className="PageFooter">
          {this.props.footer}
        </PageFooter>
      </Layout>
    );
  }
}
