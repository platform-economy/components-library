import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import { withTestTheme } from '@relayr/ui-elements-themes';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { withStatusBar } from '../index';

const div = () => (
  <div style={{ width: '100px', height: '100px' }}/>
);

const StyledDiv = withStatusBar({ side: 'bottom' })(div);

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('StatusBarWrapper', () => {

      it('should render with color prop passed to a component', () => {
        const tree = TestRenderer
          .create(<StyledDiv color="#444"/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with color prop from theme', () => {
        const tree = TestRenderer
          .create(withTestTheme(<StyledDiv color={'positive'}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
