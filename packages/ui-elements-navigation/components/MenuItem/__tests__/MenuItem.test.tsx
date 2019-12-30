import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-styled-components';

import { MenuItem } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('MenuItem', () => {
      it('Renders MenuItem', () => {
        const menuItemClick = () => null;
        const tree = TestRenderer
          .create(withTestTheme(
            <MenuItem
              onClick={menuItemClick}
              icon={<i />}
            >
              Label
            </MenuItem>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Renders with appropriate colors if active prop is set', () => {
        const menuItemClick = () => null;
        const tree = TestRenderer
          .create(withTestTheme(
            <MenuItem
              onClick={menuItemClick}
              icon={<i />}
              active={true}
            />,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Handles onClick event', () => {
        const handler = jest.fn();
        const wrapper = enzyme.mount(withTestTheme(<MenuItem icon={<i />} onClick={handler} />));

        wrapper.find('button').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('Handles onClick event correctly without handler', () => {
        const wrapper = enzyme.mount(withTestTheme(<MenuItem icon={<i />} />));
        let error;

        try {
          wrapper.find('button').simulate('click');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);
      });
    });
  });
});
