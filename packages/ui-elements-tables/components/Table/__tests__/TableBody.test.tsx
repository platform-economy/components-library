import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { TableBody } from '../TableBody';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableBody', () => {
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TableBody />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
