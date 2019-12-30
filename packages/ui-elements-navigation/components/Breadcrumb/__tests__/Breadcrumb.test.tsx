import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { Breadcrumb } from '../index';
import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('Breadcrumb', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(
            withTestTheme(
              <Breadcrumb/>,
            ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should match snapshot', () => {
        const tree = TestRenderer
        .create(
          withTestTheme(
            <Breadcrumb>
              <Breadcrumb.Item>
                <button>Test</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <button>Test2</button>
              </Breadcrumb.Item>
            </Breadcrumb>,
          ),
        )
        .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should handle isCurrent props', () => {
        const tree = TestRenderer
        .create(
          withTestTheme(
            <Breadcrumb>
              <Breadcrumb.Item>
                <button>Test</button>
              </Breadcrumb.Item>
              <Breadcrumb.Item isCurrent={true}>
                <button>Test2</button>
              </Breadcrumb.Item>
            </Breadcrumb>,
          ),
        )
        .toJSON();
        expect(tree).toMatchSnapshot();
      });

    });
  });
});
