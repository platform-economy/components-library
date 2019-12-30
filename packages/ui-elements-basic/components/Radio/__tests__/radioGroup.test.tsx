import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';

import { withTestTheme, withTestThemeWrapper } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

import { Radio, RadioGroup, RadioGroupState } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Radio', () => {
      it('Should handle click event correctly', () => {
        const tree = enzyme.mount(withTestTheme(
          <RadioGroup value={''}>
            <Radio
              value={'RadioTestValue'}
              groupName={'radioButtonGroupJust For test'}
            />
          </RadioGroup>));
        expect(tree).toMatchSnapshot();

        // test for correctly working without handlers - improve branch coverage
        tree.find('span input').simulate('change', { target: { checked:true } });
        tree.find('span input').simulate('click');
      });

      describe('Handlers', () => {
        let tree: enzyme.ReactWrapper;
        const onFocus = jest.fn();
        const onBlur = jest.fn();
        const onValueChange = jest.fn();
        const onValueChangeGroup = jest.fn();
        const onChange = jest.fn();
        const onClick = jest.fn();

        beforeAll(() => {
          tree = enzyme.mount(
            <RadioGroup value={'RadioTestValue_2'} onValueChange={onValueChangeGroup}>
              <Radio
                value={'RadioTestValue_2'}
                groupName={'radioButtonGroupJust For test'}
                className={'radioToClick_2'}
                onValueChange={onValueChange}
                onChange={onChange}
                onClick={onClick}
              >
                <span className={'spanToClick_2'}/>
              </Radio>
              <br/>
              <Radio
                value={'RadioTestValue_1'}
                groupName={'radioButtonGroupJust For test'}
                className={'radioToClick_1'}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </RadioGroup>,
            { wrappingComponent: withTestThemeWrapper });
        });

        it('Focus', () => {
          tree.find('span.radioToClick_2 input').simulate('focus');
          expect(onFocus).toHaveBeenCalledTimes(0);
          tree.find('span.radioToClick_1 input').simulate('focus');
          expect(onFocus).toHaveBeenCalledTimes(1);
        });

        it('Blur', () => {
          tree.find('span.radioToClick_2 input').simulate('blur');
          expect(onBlur).toHaveBeenCalledTimes(0);
          tree.find('span.radioToClick_1 input').simulate('blur');
          expect(onBlur).toHaveBeenCalledTimes(1);
        });

        it('Change', () => {
          tree.find('span.radioToClick_1 input').simulate('change', { target: { checked:true } });
          expect(onValueChange).toHaveBeenCalledTimes(0);
          expect(onValueChangeGroup).toHaveBeenCalledTimes(1);

          tree.find('span.radioToClick_2 input').simulate('change', { target: { checked:true } });
          expect(onValueChange).toHaveBeenCalledTimes(1);
          expect(onValueChangeGroup).toHaveBeenCalledTimes(2);
        });

        it('Click', () => {
          tree.find('span.radioToClick_2 input').simulate('click');
          expect(onClick).toHaveBeenCalledTimes(1);

          const inputElem = tree.find('span.radioToClick_2 input').getDOMNode<HTMLElement>();
          inputElem.click = onClick;
          tree.find('span.spanToClick_2').simulate('click');
          expect(onClick).toHaveBeenCalledTimes(2);
        });

        it('Update "value" props', () => {
          let radioGroupContext:Readonly<RadioGroupState> = tree.find('RadioGroup').state();
          expect(radioGroupContext.radioGroupContext.value).toBe('RadioTestValue_2');

          tree.setProps({ value: 'RadioTestValue_1' });

          radioGroupContext = tree.find('RadioGroup').state();
          expect(radioGroupContext.radioGroupContext.value).toBe('RadioTestValue_1');
        });
      });
    });
  });
});
