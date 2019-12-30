import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { TopBar } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TopBar.Separator', () => {
      it('should render properly', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TopBar.Separator />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
