import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { FormGroup } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('FormGroup', () => {
      it('should render with children horizontally', () => {
        const tree = TestRenderer
          .create(
            <FormGroup layout="horizontal">
              <input type="text" />
              <input type="button" />
            </FormGroup>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with children vertically', () => {
        const tree = TestRenderer
          .create(
            <FormGroup layout="vertical">
              <input type="text" />
              <input type="button" />
            </FormGroup>,
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
