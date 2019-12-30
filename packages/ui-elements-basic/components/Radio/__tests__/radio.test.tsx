import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

import { withTestTheme, withTestThemeWrapper } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

import { Radio } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Radio', () => {
      it('Should handle click event correctly', () => {
        const onClick = jest.fn();
        const onValueChange = jest.fn();
        const tree = enzyme.mount(
          <Radio
            value={'RadioTestValue'}
            groupName={'radioButtonGroupJust For test'}
            onClick={onClick}
            onValueChange={onValueChange}
            checked={false}
          />,
          { wrappingComponent: withTestThemeWrapper });
        expect(tree).toMatchSnapshot();
        tree.find('span').simulate('click');
        tree.find('input').simulate('click');
        tree.find('input').simulate('change', { target: { checked:true } });
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith('RadioTestValue');
      });

      it('Render unCheck', () => {
        const tree = enzyme.mount(withTestTheme(
          <Radio
            value={'RadioTestValue'}
            groupName={'radioButtonGroupJust For test'}
            checked={true}
            disabled={true}
          />));
        expect(tree).toMatchSnapshot();
        tree.find('span').simulate('click');
      });
    });
  });
});
