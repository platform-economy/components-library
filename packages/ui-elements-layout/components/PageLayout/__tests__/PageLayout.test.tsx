import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { PageLayout, widthSwitch, paddingSwitch, orientationSwitch } from '../index';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('PageLayout', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<PageLayout />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('changes width when mobile property changes', () => {
        const tree = TestRenderer
        .create(withTestTheme(<PageLayout mobile={true} />))
        .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('switches certain styling properties when mobile props is true', () => {
        const props = { mobile: true };

        expect(widthSwitch(props.mobile)).toBe('100%');
        expect(orientationSwitch(props.mobile)).toBe('column');
        expect(paddingSwitch(props.mobile)).toBe('14px 22px');
      });
      it('switches certain styling properties when mobile props is false', () => {
        const props = { mobile: false };

        expect(widthSwitch(props.mobile)).toBe('auto');
        expect(orientationSwitch(props.mobile)).toBe('row');
        expect(paddingSwitch(props.mobile)).toBe('14px 40px');
      });
    });
  });
});
