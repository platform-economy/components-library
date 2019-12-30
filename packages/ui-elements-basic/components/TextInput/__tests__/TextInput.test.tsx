import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

import { TextInput } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TextInput', () => {
      const handleClick = jest.fn();
      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TextInput />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('renders conditional theme color based on given props', () => {
        const tree = TestRenderer
        .create(withTestTheme(
          <TextInput hollow={true}/>))
        .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render as a text input with all the optional properties', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <TextInput
            type="text"
            placeholder="test placeholder"
            value="test"
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should correctly handle handleFocus function when reference exists', () => {
        const instance = enzyme.mount(withTestTheme(<TextInput/>));

        let error;

        try {
          instance.find('input').simulate('focus');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);

      });

      it('should correctly handle handleBlur function when reference exists', () => {
        const instance = enzyme.mount(withTestTheme(<TextInput/>));

        let error;

        try {
          instance.find('input').simulate('blur');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);

      });

      it('should correctly handle handleClick function when reference exists', () => {
        const instance = enzyme.mount(withTestTheme(<TextInput onClick={handleClick}/>));

        let error;

        try {
          instance.find('input').simulate('click');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      it('should correctly handle clear click', () => {
        const wrapperComponent = (props: { children: React.ReactElement }) =>
        withTestTheme(props.children);
        const tree = enzyme.mount(
          <TextInput clearIcon={'text'}/>,
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
