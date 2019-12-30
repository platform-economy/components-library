import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { TopBar } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TopBar', () => {
      it('should render without children', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TopBar />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should be able to render with children', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TopBar>
              Test
              <div />
              Test
              <div />
              Test
            </TopBar>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
