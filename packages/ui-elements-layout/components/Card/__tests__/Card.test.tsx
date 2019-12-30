import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

import { Card } from '../index';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('Card', () => {
      it('Renders Card', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Card/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Renders Card with children', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <Card>
              Content
            </Card>,
          ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
