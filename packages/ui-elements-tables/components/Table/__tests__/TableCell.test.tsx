import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

// Component
import { TableCell } from '../TableCell';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableCell', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(<TableCell />)
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
