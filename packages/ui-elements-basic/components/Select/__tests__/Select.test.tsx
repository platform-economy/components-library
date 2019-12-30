import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withTestTheme } from '@relayr/ui-elements-themes';

/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { Select, OptionType } from '../index';

enzyme.configure({ adapter: new Adapter() });

const testOptions: OptionType[] = [
  { value: 'test' },
  { value: 'test2', caption: 'TestWithCaption' },
];

const wrapperComponent = (props: { children: React.ReactElement }) => withTestTheme(props.children);

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Select', () => {

      it('Renders with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Select options={testOptions} />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Renders disabled element', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Select options={testOptions} disabled={true} />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('Renders all options', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));

        expect(wrapper.find('DropdownContent').exists()).toBe(true);
        expect(wrapper.find('.select__list-item').length).toBe(2);
      });

      it('Renders placeholder on list', () => {
        const wrapper = mount(withTestTheme(
          <Select
            options={testOptions}
            placeholder="placeholder"
            placeholderAsOption={true}
          />,
        ));

        expect(wrapper.find('.select__list-item').length).toBe(3);
        expect(wrapper.find('.select__list-item').at(0).text()).toBe('placeholder');
      });

      it('Renders caption from selected value', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} value="test2" />));

        expect(wrapper.find('.select__text').text()).toBe('TestWithCaption');
      });

      it('Shows and hides list on select click', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));
        const select = wrapper.find('.select__field');

        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(false);
        select.simulate('click');
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(true);
        select.simulate('click');
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(false);
      });

      it('Shows list on Space click', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));
        const select = wrapper.find('.select__field');

        select.simulate('focus');
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(false);
        select.simulate('keyUp', { key: ' ' });
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(true);
        select.simulate('keyUp', { key: ' ' });
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(true);
      });

      it('Calls onChange after choose an option', () => {
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} />,
        ));

        wrapper.find('.select__field').simulate('click');
        wrapper.find('.select__list-item:first-child').simulate('click');
        expect(handleChange).toHaveBeenCalledWith('test');
      });

      it('Calls onChange after choose an default (placeholder) option', () => {
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select
            options={testOptions}
            onChange={handleChange}
            placeholderAsOption={true}
            value="test"
          />,
        ));

        wrapper.find('.select__field').simulate('click');
        wrapper.find('.select__list-item:first-child').simulate('click');
        expect(handleChange).toHaveBeenCalledWith(undefined);
      });

      it('Doesn\'t call onChange after choose the same option', () => {
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} value={testOptions[0].value}/>,
        ));

        wrapper.find('.select__field').simulate('click');
        wrapper.find('.select__list-item:first-child').simulate('click');
        expect(handleChange).not.toBeCalled();
      });

      it('Changes selected item after pass new value', () => {
        const wrapper = mount<Select>(
          <Select options={testOptions} value="test" />,
          {
            wrappingComponent: wrapperComponent,
          },
        );

        expect(wrapper.find('.select__text').text()).toEqual('test');
        wrapper.setProps({ value: 'test2' });
        expect(wrapper.find('.select__text').text()).toEqual('TestWithCaption');
      });

      it('Shows placeholder after pass empty selectedItem prop', () => {
        const wrapper = mount(
          <Select options={testOptions} value="test" placeholder="placeholder" />,
          {
            wrappingComponent: wrapperComponent,
          },
        );

        expect(wrapper.find('.select__text').text()).toBe('test');
        wrapper.setProps({ value: null });
        expect(wrapper.find('.select__text').text()).toBe('placeholder');
      });

      it('Changes focused item after pass new options', () => {
        const newTestOptions = [
          { value: 'test2' },
          { value: 'test' },
        ];
        const wrapper = mount<Select>(
          <Select options={testOptions} value="test" />,
          {
            wrappingComponent: wrapperComponent,
          },
        );

        wrapper.find('.select__field').simulate('click');
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        wrapper.setProps({ options: newTestOptions });
        wrapper.update();
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
      });

      it('Changes focused element index after press arrow key', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));
        const select = wrapper.find('.select__field');

        select.simulate('focus');
        select.simulate('keyup', { key: 'Enter' });
        select.simulate('keydown', { key: 'w' });
        select.simulate('keyup', { key: 'w' });
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(false);
        select.simulate('keyup', { key: 'ArrowUp' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowUp' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(false);
      });

      it('Changes focused element index after press arrow key (with placeholder)', () => {
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} placeholderAsOption={true} />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('focus');
        select.simulate('keyup', { key: 'Enter' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(false);
        expect(wrapper.find('.select__list-item').at(2).hasClass('select__list-item--focused'))
          .toBe(false);
        select.simulate('keyup', { key: 'ArrowUp' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(2).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowDown' });
        expect(wrapper.find('.select__list-item').at(2).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowUp' });
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
        select.simulate('keyup', { key: 'ArrowUp' });
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(false);
        expect(wrapper.find('.select__list-item').at(2).hasClass('select__list-item--focused'))
          .toBe(false);
      });

      it('Changes value after press left arrow key when list is hidden', () => {
        const testOptions: OptionType[] = [
          { value: 'test1' },
          { value: 'test2' },
          { value: 'test3' },
        ];
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} value="test2" />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('focus');
        select.simulate('keyUp', { key: 'ArrowLeft' });
        expect(handleChange).toBeCalledWith('test1');
      });

      it('Changes value after press right arrow key when list is hidden #2', () => {
        const testOptions: OptionType[] = [
          { value: 'test1' },
          { value: 'test2' },
          { value: 'test3' },
        ];
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} value="test2" />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('focus');
        select.simulate('keyUp', { key: 'ArrowRight' });
        expect(handleChange).toBeCalledWith('test3');
      });

      it('Doesn\'t change value after press left arrow key when list is shown', () => {
        const testOptions: OptionType[] = [
          { value: 'test1' },
          { value: 'test2' },
          { value: 'test3' },
        ];
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} value="test2" />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('click');
        select.simulate('keyUp', { key: 'ArrowLeft' });
        expect(handleChange).not.toBeCalledWith('test1');
      });

      it('Doesn\'t change value after press right arrow key when list is shown #2', () => {
        const testOptions: OptionType[] = [
          { value: 'test1' },
          { value: 'test2' },
          { value: 'test3' },
        ];
        const handleChange = jest.fn();
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} onChange={handleChange} value="test2" />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('click');
        select.simulate('keyUp', { key: 'ArrowRight' });
        expect(handleChange).not.toBeCalledWith('test3');
      });

      it('Hides list after press Esc key', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));
        const select = wrapper.find('.select__field');

        select.simulate('click');
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(true);
        select.simulate('keydown', { key: 'Escape' });
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(false);
      });

      it('Hides list after press Tab key', () => {
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));
        const select = wrapper.find('.select__field');

        select.simulate('click');
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(true);
        select.simulate('keydown', { key: 'Tab' });
        expect(wrapper.find('.DropdownContent').hasClass('opened')).toBe(false);
      });

      it('Changes focused element on mouse enter and touch', () => {
        const wrapper = mount(withTestTheme(
          <Select options={testOptions} placeholderAsOption={true} />,
        ));
        const select = wrapper.find('.select__field');

        select.simulate('click');
        wrapper.find('.select__list-item').at(0).simulate('mouseEnter');
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        wrapper.find('.select__list-item').at(1).simulate('mouseEnter');
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);
        wrapper.find('.select__list-item').at(0).simulate('touchStart');
        expect(wrapper.find('.select__list-item').at(0).hasClass('select__list-item--focused'))
          .toBe(true);
        wrapper.find('.select__list-item').at(1).simulate('touchStart');
        expect(wrapper.find('.select__list-item').at(1).hasClass('select__list-item--focused'))
          .toBe(true);

      });

      it('Removes event listeners on unmount', () => {
        const remover = jest
          .spyOn(document, 'removeEventListener')
          .mockImplementation(() => { });
        const wrapper = mount(withTestTheme(<Select options={testOptions} />));

        expect(wrapper.find(Select).exists()).toBe(true);
        wrapper.unmount();
        expect(remover).toHaveBeenCalled();
      });
    });
  });
});
