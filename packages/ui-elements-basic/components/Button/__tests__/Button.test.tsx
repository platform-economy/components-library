import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { mount } from 'enzyme';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

// Component
import { Button } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Button', () => {
      it('Should render with default props only', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Button.Raw />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should render with icons and text', () => {
        const tree = TestRenderer.create(withTestTheme(
          <Button.Raw
            iconLeft="iconLeft"
            iconRight="iconRight"
          >
            Button Primary Text
          </Button.Raw>))
        .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Should handle onClick event correctly', () => {
        const handler = jest.fn();
        const tree = mount(withTestTheme(<Button.Raw onClick={handler} />));

        tree.find('button').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('Should handle onClick event correctly without handler', () => {
        const instance = mount(withTestTheme(<Button.Raw />));
        let error;

        try {
          instance.find('button').simulate('click');
        } catch (err) {
          error = err;
        }
        expect(error).toBe(undefined);
      });
    });
  });
});
