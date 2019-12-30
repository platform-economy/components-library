import React from 'react';
import TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { Button } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Button.Secondary', () => {
      it('Should render with default props only', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Button.Secondary />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
