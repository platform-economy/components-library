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
import { RadioGroup } from '../../Radio';
import { RadioToggle } from '../RadioToggle';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('RadioToggle', () => {
      const handleClick = jest.fn();
      it('Should handle click event correctly', () => {
        const tree = enzyme.mount(withTestTheme(<RadioToggle onClick={handleClick} />));
        tree.find('StyledComponent').simulate('click');
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
      it('renders conditional theme color based on given props', () => {
        const mockClick = () => null;
        const tree = TestRenderer
          .create(withTestTheme(
            <RadioToggle  onClick={mockClick} toggled={true} highlight={true}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('Toggle Radio inside radio group', () => {
        const onValueChange = jest.fn();
        const tree = enzyme.mount(withTestTheme(
          <RadioGroup value={'toggleButtonValue'} onValueChange={onValueChange}>
            <RadioToggle
              onClick={handleClick}
              value="toggleButtonValue"
            />
            <RadioToggle
              value="otherButtonValue"
            />
          </RadioGroup>));
        tree.find('StyledComponent[value="toggleButtonValue"]').simulate('click');
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('toggleButtonValue');

        tree.find('StyledComponent[value="otherButtonValue"]').simulate('click');
        expect(onValueChange).toHaveBeenCalledTimes(2);
      });
      it('Toggle Radio un-toggled', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <RadioToggle
              toggled={false}
              iconOn={<span>ON</span>}
              iconOff={<span>OFF</span>}
            />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
