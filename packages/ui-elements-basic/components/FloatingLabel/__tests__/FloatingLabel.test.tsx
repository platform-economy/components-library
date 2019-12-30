import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import { withTestTheme } from '@relayr/ui-elements-themes';

import 'jest-styled-components';

enzyme.configure({ adapter: new Adapter() });
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/

// Component
import { FloatingLabel } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('FloatingLabel', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme((
          <FloatingLabel>
            <input/>
            <label/>
          </FloatingLabel>
            )))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with props', () => {
        const tree = TestRenderer
          .create(withTestTheme((
          <FloatingLabel height={70} focused={true}>
            <input/>
            <label/>
          </FloatingLabel>
            )))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
