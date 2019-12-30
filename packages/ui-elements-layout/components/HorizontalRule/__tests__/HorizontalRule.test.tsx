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
import { HorizontalRule } from '../index';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('HorizontalRule', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(
            withTestTheme(
              <HorizontalRule/>,
            ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
