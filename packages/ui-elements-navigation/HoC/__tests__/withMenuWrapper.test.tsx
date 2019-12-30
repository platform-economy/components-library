
import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'jest-styled-components';

import {
  withMenuWrapper,
  getJustifyContent,
  getFlexDirection,
  getBorderWidth,
  getOrder,
  getDisplay,
  getPadding,
} from '../withMenuWrapper';

import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-navigation', () => {
  describe('HoC', () => {
    describe('withMenuWrapper', () => {
      it('Renders component with wrapper', () => {
        const WrappedComponent = () => <p />;
        const WithMenuWrapper = withMenuWrapper(WrappedComponent);
        const tree = TestRenderer.create(withTestTheme(
          <WithMenuWrapper
            display={[]}
            alignment="center"
            iconPosition="top"
          >
            Children
          </WithMenuWrapper>),
        )
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('getJustifyContent returns appropriate value', () => {
        expect(getJustifyContent('left')).toBe('flex-start');
        expect(getJustifyContent('right')).toBe('flex-end');
        expect(getJustifyContent('center')).toBe('center');
      });

      it('getFlexDirection returns appropriate value', () => {
        expect(getFlexDirection('left')).toBe('row');
        expect(getFlexDirection('right')).toBe('row');
        expect(getFlexDirection('top')).toBe('column');
      });

      it('getBorderWidth returns appropriate value', () => {
        expect(getBorderWidth('left')).toBe('0 0 0 4px');
        expect(getBorderWidth('right')).toBe('0 4px 0 0');
        expect(getBorderWidth('center')).toBe('0 0 0 4px');
      });

      it('getOrder returns appropriate value', () => {
        expect(getOrder('left')).toBe(-1);
        expect(getOrder('top')).toBe(-1);
        expect(getOrder('right')).toBe(1);
      });

      it('getDisplay returns appropriate value', () => {
        expect(getDisplay([], 'icon')).toBe('none');
        expect(getDisplay([], 'label')).toBe('none');
        expect(getDisplay(['icon'], 'icon')).toBe('block');
        expect(getDisplay(['label'], 'label')).toBe('block');
        expect(getDisplay(['label', 'icon'], 'icon')).toBe('block');
        expect(getDisplay(['label', 'icon'], 'label')).toBe('block');
      });

      it('getDisplay returns appropriate value', () => {
        expect(getPadding()).toBe('0 7px');
        expect(getPadding(true)).toBe('0 21px');
      });
    });
  });
});
