import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { OptionsList, TagsContext } from '../index';

enzyme.configure({ adapter: new Adapter() });

const sourceTags = [{ id:'1', title: 'test' }];

import { TagsContextWrapper } from '../../TagsInput';

const WrappingComponent = (props: { children: React.ReactElement }) => (
  withTestTheme(props.children)
);

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TagsInput', () => {
      it('should render tagsList and optionsList with empty props', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <OptionsList options={[]} />))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList and optionsList with props', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <OptionsList options={sourceTags} />))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList and optionsList with props', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <OptionsList options={sourceTags} loading={true}/>))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList and optionsList with empty props and loading', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <OptionsList options={[]} loading={true}/>))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('Should handle remove tag onClick event correctly', () => {
        const context = { selectTag: jest.fn() };
        const tree = enzyme.mount(
          withTestTheme(
            <TagsContext.Provider value={context}>
              <OptionsList options={sourceTags} />,
             </TagsContext.Provider>,
          ),
          {
            childContextTypes: context,
            wrappingComponent: WrappingComponent,
          },
        );
        tree.find('button').simulate('click');
        expect(context.selectTag).toBeCalledWith({
          id: sourceTags[0].id,
          title: sourceTags[0].title,
        });
      });
      it('Should handle remove tag onClick event correctly', () => {
        const tree = enzyme.mount(
          withTestTheme(
            <TagsContextWrapper>
              <OptionsList options={sourceTags}/>
            </TagsContextWrapper>,
          ),
          { wrappingComponent: WrappingComponent },
        );
        tree.find('button').simulate('click');
      });
    });
  });
});
