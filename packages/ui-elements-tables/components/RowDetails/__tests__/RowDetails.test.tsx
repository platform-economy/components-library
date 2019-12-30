import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { withTestTheme } from '@relayr/ui-elements-themes';

import 'jest-styled-components';

// Component
import { RowDetails } from '../index';

const fakeData = [{ key: 'key', value: 'value' }];

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('RowDetails', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<RowDetails data={fakeData}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
