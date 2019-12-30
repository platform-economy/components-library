import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';
import * as TestRenderer from 'react-test-renderer';

enzyme.configure({ adapter: new Adapter() });

import { CheckBox } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('CheckBox', () => {
      it('Should handle click event correctly', () => {
        const onClick = jest.fn();
        const onValueChange = jest.fn();
        const onChange = jest.fn();
        const tree = enzyme.mount(withTestTheme(
          <CheckBox
            value={true}
            onClick={onClick}
            onValueChange={onValueChange}
            onChange={onChange}
          />));
        tree.find('span').simulate('click');
        tree.find('input').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(0);
        expect(onValueChange).toHaveBeenCalledTimes(0);

        tree.find('input').simulate('change');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith(false);
      });

      it('Render Check', () => {
        const tree = enzyme.mount(withTestTheme(
          <CheckBox
            value="true"
          />));
        tree.find('input').simulate('change');
      });

      it('Render unCheck', () => {
        const tree = enzyme.mount(withTestTheme(
          <CheckBox
            value="false"
          />));
        tree.find('span').simulate('click');
      });

      it('Render disabled', () => {
        const tree = enzyme.mount(withTestTheme(
          <CheckBox
            value="true"
            disabled={true}
          />));
        tree.find('span').simulate('click');
      });

      it(' Render empty', () => {
        const tree = TestRenderer.create(withTestTheme(<CheckBox/>));
        expect(tree).toMatchSnapshot();
      });

      it('Render indeterminate and disabled', () => {
        const tree = TestRenderer.create(withTestTheme(
          <CheckBox
            value="indeterminate"
            disabled={true}
          />)).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Render check', () => {
        const tree = TestRenderer.create(withTestTheme(
          <CheckBox
            value="check"
          />)).toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Render uncheck', () => {
        const tree = TestRenderer.create(withTestTheme(
          <CheckBox
            value="uncheck"
          />)).toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
