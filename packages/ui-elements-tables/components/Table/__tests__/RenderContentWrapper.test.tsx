import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import 'jest-styled-components';

configure({ adapter: new Adapter() });

// Component
import { RenderContentWrapper } from '../RenderContentWrapper';

const getHeight = jest.fn(() => null);

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('RenderContentWrapper', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(
            <RenderContentWrapper getHeight={getHeight}>
              content
            </RenderContentWrapper>,
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Should call getHeight function after mount', () => {
        mount(
          <RenderContentWrapper getHeight={getHeight}>
            content
          </RenderContentWrapper>,
        );

        expect(getHeight).toBeCalledTimes(1);
      });
    });
  });
});
