import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { TableHeader } from '../TableHeader';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableHeader', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TableHeader />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
