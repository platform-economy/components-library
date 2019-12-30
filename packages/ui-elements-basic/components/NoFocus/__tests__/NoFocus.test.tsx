import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import 'jest-styled-components';

enzyme.configure({ adapter: new Adapter() });

import { NoFocus } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('NoFocus', () => {
      it('should properly render with another element inside', () => {
        const tree = TestRenderer
          .create(<NoFocus><button /></NoFocus>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should stop onClick event propagation', () => {
        let counter = 0;
        const increment = () => { counter += 1; };
        const element = enzyme.mount(
          <div onClick={increment}>
            <div>
              <button id="propagating-button">Button</button>
            </div>
            <NoFocus>
              <button id="not-propagating-button">Button</button>
            </NoFocus>
          </div>,
          );
        element.find('#propagating-button').simulate('click');
        expect(counter).toBe(1);
        element.find('#not-propagating-button').simulate('click');
        expect(counter).toBe(1);
      });
    });
  });
});
