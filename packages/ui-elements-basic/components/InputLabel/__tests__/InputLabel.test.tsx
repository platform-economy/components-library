import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { InputLabel } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('InputLabel', () => {
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<InputLabel>Test Label</InputLabel>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
