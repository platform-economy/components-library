import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/

// Component
import { Toggle } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Toggle', () => {
      const handleClick = jest.fn();
      it('Should handle click event correctly', () => {
        const tree = enzyme.mount(withTestTheme(<Toggle onClick={handleClick} />));
        tree.find('StyledComponent').simulate('click');
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      it('renders conditional theme color based on given props', () => {
        const mockClick = () => null;
        const tree = TestRenderer
        .create(withTestTheme(
          <Toggle  onClick={mockClick} toggled={true} highlight={true}/>))
        .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
