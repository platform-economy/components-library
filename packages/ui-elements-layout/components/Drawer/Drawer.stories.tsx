import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import styled from 'styled-components';

import { Drawer } from './index';

const Container = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${props => props.direction === 'horizontal' ? 'row' : 'column'};
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.palette.background};
`;

const Option = styled.div`
  box-sizing: border-box;
  padding: 10px;
  border-bottom: solid 2px ${props => props.theme.palette.background};
  color: ${props => props.theme.palette.divider_inverted};
  text-align: center;
`;

const Content = styled.div`
  flex: 1 1 auto;
  padding: 10px;
  color: ${props => props.theme.palette.text};
`;

storiesOf('ui-elements-layout/Drawer', module)
  .add('Drawer on the left/top side', () => {
    const direction = select('Direction', ['horizontal', 'vertical'], 'horizontal');
    return (
    <Container direction={direction}>
      <Drawer
        size={text('Size', '200px')}
        open={boolean('Open', true)}
        direction={direction}
      >
        <Option>OPTION</Option>
        <Option>OPTION</Option>
        <Option>OPTION</Option>
      </Drawer>
      <Content>
        Content...
      </Content>
    </Container>
    );
  })
  .add('Drawer on the right/bottom side', () => {
    const direction = select('Direction', ['horizontal', 'vertical'], 'horizontal');
    return (
    <Container direction={direction}>
      <Content>
        Content...
      </Content>
      <Drawer
        size={text('Size', '200px')}
        open={boolean('Open', true)}
        direction={direction}
      >
        <Option>OPTION</Option>
        <Option>OPTION</Option>
        <Option>OPTION</Option>
      </Drawer>
    </Container>
    );
  });
