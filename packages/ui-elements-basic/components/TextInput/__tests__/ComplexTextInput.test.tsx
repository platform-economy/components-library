import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { ComplexTextInput, StyledTextInput } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('ComplexTextInput', () => {
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<ComplexTextInput />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render as a text input with all the optional properties', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <ComplexTextInput
            type="text"
            placeholder="test placeholder"
            componentsLeft={<button />}
            componentsRight={<button />}
            value="test"
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render as a password input with all the optional properties', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <ComplexTextInput
            type="password"
            placeholder="test placeholder"
            componentsLeft={<button />}
            componentsRight={<button />}
            value="test"
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render all the optional properties', () => {
        const tree = enzyme.mount(withTestTheme(
          <ComplexTextInput
            type="text"
            placeholder="test placeholder"
            componentsLeft={<button />}
          />));
        tree.find('input').simulate('focus');
        tree.find('input').simulate('blur');
      });

      it('should correctly handle click when reference exists', () => {
        const mockClick = jest.fn();
        const instance = enzyme.mount(withTestTheme(
        <ComplexTextInput onClick={mockClick}/>));
        let error;

        try {
          instance.find('input').simulate('click');
        } catch (err) {
          error = err;
        }
        expect(mockClick).toHaveBeenCalledTimes(1);
        expect(error).toBe(undefined);
      });

      it('should correctly handle focus on TextInput', () => {
        const focusHandler = jest.fn();
        const blurHandler = jest.fn();
        const tree = enzyme.mount(withTestTheme(
          <ComplexTextInput
            type="text"
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="test placeholder"
            componentsLeft={<button />}
          />));
        tree.find('input').simulate('focus');
        expect(tree.find(StyledTextInput).hasClass('hasFocus')).toBeTruthy();
        expect(focusHandler).toBeCalledTimes(1);
        expect(focusHandler).toBeCalledWith(expect.anything());
        expect(blurHandler).toBeCalledTimes(0);
      });

      it('should correctly handle blur on TextInput', () => {
        const focusHandler = jest.fn();
        const blurHandler = jest.fn();
        const tree = enzyme.mount(withTestTheme(
          <ComplexTextInput
            type="text"
            onFocus={focusHandler}
            onBlur={blurHandler}
            placeholder="test placeholder"
            componentsLeft={<button />}
          />));
        tree.find('input').simulate('focus');
        expect(tree.find(StyledTextInput).hasClass('hasFocus')).toBeTruthy();
        expect(focusHandler).toBeCalledTimes(1);
        expect(focusHandler).toBeCalledWith(expect.anything());
        expect(blurHandler).toBeCalledTimes(0);

        tree.find('input').simulate('blur');
        tree.find('button').simulate('focus');
        expect(tree.find(StyledTextInput).hasClass('hasFocus')).toBeFalsy();
        expect(focusHandler).toBeCalledTimes(1);
        expect(blurHandler).toBeCalledTimes(1);
        expect(blurHandler).toBeCalledWith(expect.anything());
      });
      it('should correctly handle clear click', () => {
        const wrapperComponent = (props: { children: React.ReactElement }) =>
        withTestTheme(props.children);
        const tree = enzyme.mount(
          <ComplexTextInput clearIcon={'text'}/>,
          {
            wrappingComponent: wrapperComponent,
          },
        );
        const input = tree.find('input');
      ​
        input.getDOMNode<HTMLInputElement>().value = 'foo';
        expect(input.getDOMNode<HTMLInputElement>().value).toBe('foo');
        tree.find('i').simulate('click');
        expect(input.getDOMNode<HTMLInputElement>().value).toBe('');
      });
    });
  });
});
