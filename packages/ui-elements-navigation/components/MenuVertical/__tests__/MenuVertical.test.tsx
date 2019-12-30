import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

import { StyledMenuVertical } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('MenuVertical', () => {
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<StyledMenuVertical />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
