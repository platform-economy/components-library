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
import { GroupedInputs, countRatio } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('GroupedInputs', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <GroupedInputs
            componentsLeft={<input type="text"/>}
            componentsRight={<input type="text"/>}
            labelLeft="test"
            labelRight="test"
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with provided ratio', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <GroupedInputs
            dividerRatio={30}
            componentsLeft={<input type="text"/>}
            componentsRight={<input type="text"/>}
            labelLeft="test"
            labelRight="test"
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should properly return ratio percentage', () => {
        expect(countRatio(10)).toBe('10%');
        expect(countRatio()).toBe('50%');
      });
    });
  });
});
