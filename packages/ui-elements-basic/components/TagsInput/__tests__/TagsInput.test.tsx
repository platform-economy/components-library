import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { TagsInput } from '../index';

enzyme.configure({ adapter: new Adapter() });

// import { getContextInterceptor } from '../../../../../helpers/test-helpers';

const WrappingComponent = (props: { children: React.ReactElement }) => (
  withTestTheme(props.children)
);

const sourceTags = [{ id:'1', title: 'test' }];

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TagsInput', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TagsInput sourceTags={sourceTags}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render options list with no tags', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TagsInput/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tags list with no tags', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TagsInput optionsList={true}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with optionsList', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TagsInput sourceTags={sourceTags} optionsList={true}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with selected Tags', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TagsInput sourceTags={sourceTags} selectedTags={sourceTags}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should handle input events properly', () => {
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            onFocus={onFocus}
            onBlur={onBlur}
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('focus');
        tree.find('input').simulate('blur');
        tree.find('input').simulate('change');
        tree.find('input').simulate('click');
        expect(onFocus).toBeCalledTimes(1);
        expect(onBlur).toBeCalledTimes(1);
      });
      it('should handle input events properly without handlers', () => {
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('focus');
        tree.find('input').simulate('blur');
        tree.find('input').simulate('change');
        tree.find('input').simulate('click');
      });
      it('should render clear button properly', () => {
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            selectedTags={sourceTags}
            clearIcon="icon"
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('button.clearBtn').simulate('focus');
      });
      it('should handle clear button click properly with query', () => {
        const clear = jest.fn();
        const tagsQueryChange = (query: 'F') => query;
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            selectedTags={sourceTags}
            clearIcon="icon"
            clearTags={clear}
            onTagsQueryChange={tagsQueryChange}
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('change', { target: { value: 'F' } });
        tree.find('button.clearBtn').simulate('click');
        expect(clear).toBeCalledTimes(1);
      });
      it('should handle clear button click without handler', () => {
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            clearIcon="icon"
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('button.clearBtn').simulate('click');
      });
      it('should handle change properly with input value', () => {
        const change = jest.fn();
        const tagsQueryChange = (query: 'M') => query;
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            onChange={change}
            onTagsQueryChange={tagsQueryChange}
            inputValue="test"
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('change', { target: { value: 'M' } });
        expect(change).toBeCalledTimes(1);
      });
      it('should handle change properly with input value', () => {
        const change = jest.fn();
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            onChange={change}
            inputValue="test"
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('change', { target: { value: 'M' } });
        expect(change).toBeCalledTimes(1);
      });
      it('should handle change properly without input value', () => {
        const change = jest.fn();
        const tagsQueryChange = (query: 'test') => query;
        const tree = enzyme.mount(
          <TagsInput
            sourceTags={sourceTags}
            onChange={change}
            onTagsQueryChange={tagsQueryChange}
          />,
          { wrappingComponent: WrappingComponent },
          );
        tree.find('input').simulate('change', { target: { value: 'M' } });
        expect(change).toBeCalledTimes(1);
      });
    });
  });
});
