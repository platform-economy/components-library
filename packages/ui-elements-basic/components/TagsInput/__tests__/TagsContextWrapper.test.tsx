import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// import { getContextInterceptor } from '../../../../../helpers/test-helpers';

// Component
import { TagsContextWrapper, TagsContext, TagsContextProps, TagsInput } from '../index';
import { Tag } from '../../Tag';

enzyme.configure({ adapter: new Adapter() });

const testTag = { id:'1', removing: false, title: 'test', custom: false, content: 'test' };
const testTag2 = { id:'1', removing: true, title: 'test', custom: false };
const testTag3 = { id:'test', removing: true, title: 'test', custom: false };
const testTag4 = { id:'test', title: 'test', custom: false, content: 'test' };
const testTag5 = { id:'1', removing: false, title: 'test', content: 'test' };

const sourceTags = [testTag];

const WrappingComponent = (props: { children: React.ReactElement }) => (
  withTestTheme(props.children)
);

jest.useFakeTimers();

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TagsInputContextWrapper', () => {
      it('Should handle keydown events correctly when custom tags enabled', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: sourceTags });
        tree.setState({ optionsTags: sourceTags });
        tree.setState({ inputValue: 'test' });
        tree.find('input').simulate('keyDown', { keyCode: 13 });
        tree.find('input').simulate('keyDown', { keyCode: 8 });
        tree.find('input').simulate('keyDown', { keyCode: 84 });
        tree.find('input').simulate('keyDown', { keyCode: 8 });
      });
      it('Should add custom tag on tab press', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: sourceTags });
        tree.setState({ optionsTags: sourceTags });
        tree.setState({ inputValue: 'test' });
        tree.find('input').simulate('keyDown', { keyCode: 9 });
      });
      it('Should add custom tag on tab press', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: sourceTags });
        tree.setState({ optionsTags: sourceTags });
        tree.setState({ inputValue: '' });
        tree.find('input').simulate('keyDown', { keyCode: 9 });
      });
      it('Should handle keydown events correctly with no custom tags', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: [testTag, testTag2] });
        tree.setState({ optionsTags: sourceTags });
        tree.find('input').simulate('keyDown', { keyCode: 13 });
        tree.find('input').simulate('keyDown', { keyCode: 8 });
        tree.find('input').simulate('keyDown', { keyCode: 9 });
        tree.find('input').simulate('keyDown', { keyCode: 8 });
        jest.runTimersToTime(1000);
        tree.find('input').simulate('keyDown', { keyCode: 8 });
      });
      it('Should handle select all tags', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper enableCustomTags={true} sourceTags={sourceTags}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <button
                  onClick={tagsContext.selectAllTags}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('button').simulate('click');
        expect(tree.state('selectedTags')).toEqual(sourceTags);
      });
      it('Should handle select tag', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper>
            <Tag
              tagId="1"
              title="test"
            />
          </TagsContextWrapper >,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('button.Tag').simulate('click');
        tree.find('button.Tag').simulate('click');
      });
      it('Should handle select tag', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper
            sourceTags={[testTag5]}
          >
                <Tag
                  tagId="1"
                  title="test"
                  content="test"
                />
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        expect(tree.state('selectedTags')).toEqual([]);
        tree.find('button.Tag').simulate('click');
        expect(tree.state('selectedTags')).toEqual([testTag5]);
      });
      it('Should handle remove tag', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper
            sourceTags={sourceTags}
            selectedTags={[testTag4]}
            optionsTags={[]}
          >
            <Tag
              tagId="test"
              title="test"
              selected={true}
              content="test"
              custom={false}
              removing={false}
            />
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        expect(tree.state('selectedTags')).toEqual([testTag4]);
        expect(tree.state('optionsTags')).toEqual([]);
        tree.find('button.Tag').simulate('click');
        expect(tree.state('selectedTags')).toEqual([]);
        expect(tree.state('optionsTags')).toEqual([testTag4]);
      });
      it('Should handle remove custom tag', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper
            sourceTags={[]}
            selectedTags={[{ id:'1', title:'test', custom: true }]}
          >
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <Tag
                  tagId="1"
                  title="test"
                  custom={true}
                  selected={true}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        expect(tree.state('selectedTags')).toEqual([{ id:'1', title:'test', custom: true }]);
        tree.find('button.Tag').simulate('click');
        expect(tree.state('selectedTags')).toEqual([]);
        expect(tree.state('optionsTags')).toEqual([]);
      });
      it('Should deselect all tags properly', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper sourceTags={sourceTags}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <button
                  id="1"
                  onClick={tagsContext.deselectAllTags}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: sourceTags });
        tree.find('button').simulate('click');
        expect(tree.state('selectedTags')).toEqual([]);
      });
      it('Should select all tags properly', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper sourceTags={sourceTags}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <button
                  id="1"
                  onClick={tagsContext.selectAllTags}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        expect(tree.state('selectedTags')).toEqual([]);
        tree.find('button').simulate('click');
        expect(tree.state('selectedTags')).toEqual(sourceTags);
      });
      it('Should handle change and validate custom tags', () => {
        const validate = (inputValue: 'test') => true;
        const tree = enzyme.mount(
          <TagsContextWrapper inputValidator={validate} enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('input').simulate('change', { target: { value: 'T' } });
        tree.setState({ inputValue: 'test' });
        tree.find('input').simulate('change', { target: { value: 'T' } });
        tree.find('input').simulate('keyDown', { keyCode: 13 });
      });
      it('hould handle change and render custom tags invalid', () => {
        const validate = (inputValue: 'test') => false;
        const tree = enzyme.mount(
          <TagsContextWrapper inputValidator={validate} enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <input
                  onKeyDown={tagsContext.handleKeyDown}
                />
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('input').simulate('change', { target: { value: 'T' } });
        tree.setState({ inputValue: 'test' });
        tree.find('input').simulate('change', { target: { value: 'T' } });
        tree.find('input').simulate('keyDown', { keyCode: 13 });
        expect(tree.state('invalid')).toBe(false);
      });
      it('Should handle change and render custom tags valid', () => {
        const validate = jest.fn((value: 'test') => true);
        const tree = enzyme.mount(
          <TagsContextWrapper inputValidator={validate} enableCustomTags={true}>
            <TagsContext.Consumer>
              {(tagsContext: TagsContextProps) => (
                <TagsInput onValueChange={tagsContext.onValueChange}/>
              )}
            </TagsContext.Consumer>
          </TagsContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('input').simulate('change', { target: { value: 'test' } });
        tree.find('input').simulate('keyDown', { keyCode: 13 });
        expect(tree.state('invalid')).toBe(false);
      });
      it('Should get derived state from new props properly', () => {
        const tree = enzyme.mount(
          <TagsContextWrapper sourceTags={sourceTags}/>,
          { wrappingComponent: WrappingComponent },
        );
        tree.setState({ selectedTags: [testTag] });
        tree.setProps({ sourceTags: [testTag3] });
        expect(tree.state('sourceTags')).toBe(tree.prop('sourceTags'));
      });
    });
  });
});
