import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { TagsList } from '../index';

enzyme.configure({ adapter: new Adapter() });

const sourceTags = [{ id:'1', title: 'test' }];

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('TagsInput', () => {
      it('should render tagsList with empty props', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <TagsList options={[]} />))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList with props', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <TagsList options={sourceTags} />))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList with props and loading', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <TagsList options={sourceTags} loading={true}/>))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render tagsList with empty props and loading', () => {
        const tree = TestRenderer
            .create(withTestTheme(
                <TagsList options={[]} loading={true}/>))
            .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
