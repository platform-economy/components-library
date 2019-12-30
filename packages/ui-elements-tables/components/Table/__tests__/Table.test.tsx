import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { Table } from '../index';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('Table', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Table />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
