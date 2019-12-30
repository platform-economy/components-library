import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { WithSkeletonExample } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('WithSkeletonExample', () => {

      it('should render with default properties only', () => {
        const tree = TestRenderer
          .create(<WithSkeletonExample />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
