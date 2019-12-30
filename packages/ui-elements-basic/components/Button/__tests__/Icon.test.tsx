import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from 'react-test-renderer';

import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';

import { Button } from '../index';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Button.Icon', () => {
      it('Should render with default props only', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Button.Icon />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should render with icon', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Button.Icon>icon</Button.Icon>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should handle onClick event correctly', () => {
        const handler = jest.fn();
        const tree = enzyme.mount(withTestTheme(<Button.Icon onClick={handler} />));

        tree.find('button').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('Should handle onClick event correctly without handler', () => {
        const instance = enzyme.mount(withTestTheme(<Button.Icon />));

        expect(() => instance.find('button').simulate('click')).not.toThrow();
      });
    });
  });
});
