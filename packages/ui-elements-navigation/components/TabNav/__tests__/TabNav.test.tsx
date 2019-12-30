import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-styled-components';

import { TabNav } from '../index';
import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('TabNav', () => {
      it('should render with two children with one of them active', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TabNav>
              <TabNav.Tab active={true}>Test Tab</TabNav.Tab>
              <TabNav.Tab>Test Tab 2</TabNav.Tab>
            </TabNav>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should properly handle onClick', () => {
        const clickHandler = jest.fn();
        const tree = enzyme.mount(withTestTheme(
          <TabNav>
            <TabNav.Tab onClick={clickHandler}>Click Tab Test</TabNav.Tab>
          </TabNav>));
        tree.find('li').simulate('click');
        expect(clickHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
