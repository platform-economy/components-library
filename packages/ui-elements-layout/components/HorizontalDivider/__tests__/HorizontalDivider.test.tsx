import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { withTestTheme } from '@relayr/ui-elements-themes';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { HorizontalDivider } from '../index';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('HorizontalDivider', () => {
      it('Should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<HorizontalDivider />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should render with starting and ending rules', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <HorizontalDivider startingRule={true} endingRule={true}>
              <span>left</span>
              <span>center</span>
              <span>right</span>
            </HorizontalDivider>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should render only one rule', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <HorizontalDivider>
              <span>left</span>
              <span>right</span>
            </HorizontalDivider>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
