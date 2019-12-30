import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { Basic } from '../index';

describe('ui-elements-skeletons', () => {
  describe('Components', () => {
    describe('Basic', () => {

      it('should render with default properties only', () => {
        const tree = TestRenderer
          .create(<Basic />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

    });
  });
});
