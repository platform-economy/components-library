import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';

import { InputGroup } from '../index';

import { TestTheme } from '@relayr/ui-elements-themes/';

const withTheme = (Component: React.ReactChild) => (
  <ThemeProvider theme={TestTheme}>
    {Component}
  </ThemeProvider>
);

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('InputGroup', () => {
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTheme(
            <InputGroup />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with mocked components inside', () => {
        const tree = TestRenderer
          .create(withTheme(
            <InputGroup>
              <input type="text"/>
              <button>Button</button>
            </InputGroup>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
