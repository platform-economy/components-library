import React from 'react';
import * as TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { Button } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Button.Tertiary', () => {
      it('Should render with default props only', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Button.Tertiary />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
