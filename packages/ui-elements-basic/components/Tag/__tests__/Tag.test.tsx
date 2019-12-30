import * as React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

import { TagsContext, TagsContextInterface } from '../../TagsInput';

enzyme.configure({ adapter: new Adapter() });

// Component
import { Tag } from '..';

const WrappingComponent = (props: { children: React.ReactElement }) => (
  withTestTheme(props.children)
);

const selectTagMock = jest.fn();
const removeTagMock = jest.fn();

const testContext = {
  selectTag: () => selectTagMock(),
  removeTag: () => removeTagMock(),
};

const TestContextWrapper = (props: TagsContextInterface & {children: React.ReactNode}) => {
  return(
    <TagsContext.Provider value={testContext}>
      {props.children}
    </TagsContext.Provider>
  );
};

const icon = <span>Icon</span>;

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Tag', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Tag tagId="1" title="test"/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with passing children', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <Tag tagId="1" title="test">
              <strong>Test2</strong>
            </Tag>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with selected props', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <Tag tagId="1" title="test" selected={true}/>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with removing props', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <Tag tagId="1" title="test" selected={true} removing={true}/>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with removing props and icon', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <Tag tagId="1" title="test" removing={true} removeIcon={icon}/>,
          ))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('Should handle select tag onClick event correctly', () => {
        const tree = enzyme.mount(
          <TestContextWrapper>
            <Tag tagId="1" title="test"/>
          </TestContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('button').simulate('click');
        expect(selectTagMock).toBeCalledTimes(1);
        expect(removeTagMock).toBeCalledTimes(0);
      });
      it('Should handle remove tag onClick event correctly', () => {
        const tree = enzyme.mount(
          <TestContextWrapper>
            <Tag tagId="1" title="test" removeIcon={icon} selected={true}/>
          </TestContextWrapper>,
          { wrappingComponent: WrappingComponent },
        );
        tree.find('button').simulate('click');
        expect(removeTagMock).toBeCalledTimes(1);
      });
    });
    it('Should handle click without context with external click handler', () => {
      const clickMock = jest.fn();
      const tree = enzyme.mount(
        <Tag tagId="1" title="test" onClick={clickMock}/>,
        { wrappingComponent: WrappingComponent },
      );
      tree.find('button').simulate('click');
      expect(clickMock).toBeCalledTimes(1);
    });
    it('Should ignore click without context or external handler', () => {
      const tree = enzyme.mount(
        <Tag tagId="1" title="test"/>,
        { wrappingComponent: WrappingComponent },
      );
      tree.find('button').simulate('click');
    });
  });
});
