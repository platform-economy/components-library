import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

import { Drawer, getDefaultUnit, getHeight, getWidth, DrawerProps } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('Drawer', () => {
      it('Renders Drawer', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <Drawer size={10} open={true} direction="vertical" />,
          ))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Renders Drawer with children', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <Drawer size={10} open={true} direction="vertical" >
              Content
            </Drawer>,
          ))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Horizontal Drawer has overflow set to "hidden auto"', () => {
        const tree = TestRenderer.create(withTestTheme(
        <Drawer size={10} direction="horizontal" />,
        ))
          .toJSON();
        expect(tree).toHaveStyleRule('overflow', 'hidden auto');
      });

      it('Vertical Drawer has overflow set to "hidden hidden"', () => {
        const tree = TestRenderer.create(withTestTheme(
        <Drawer size={10} direction="vertical" />,
        ))
        .toJSON();
        expect(tree).toHaveStyleRule('overflow', 'hidden hidden');
      });

      it('getDefaultUnit returns string with appropriate unit', () => {
        expect(getDefaultUnit(1)).toBe('1px');
        expect(getDefaultUnit(2, 'em')).toBe('2em');
        expect(getDefaultUnit('3', 'em')).toBe('3');
      });

      it('getWidth returns 100% if direction is vertical', () => {
        const props = {
          direction: 'vertical',
          size: 10,
        } as DrawerProps;

        expect(getWidth(props)).toBe('100%');
      });

      it('getHeight returns 100% if direction is horizontal', () => {
        const props = {
          direction: 'horizontal',
          size: 10,
        } as DrawerProps;

        expect(getHeight(props)).toBe('100%');
      });

      it('getWidth returns 0px for horizontal direction and unset open prop', () => {
        const props = {
          direction: 'horizontal',
          size: 10,
        } as DrawerProps;

        expect(getWidth(props)).toBe('0px');
      });

      it('getHeight returns 0px for vertical direction and unset open prop', () => {
        const props = {
          direction: 'vertical',
          size: 10,
        } as DrawerProps;

        expect(getHeight(props)).toBe('0px');
      });

      it('getWidth returns size for horizontal direction and set open prop', () => {
        const props = {
          direction: 'horizontal',
          size: '10px',
          open: true,
        } as DrawerProps;

        expect(getWidth(props)).toBe('10px');
      });

      it('getHeight returns size for vertical direction and set open prop', () => {
        const props = {
          direction: 'vertical',
          size: '10px',
          open: true,
        } as DrawerProps;

        expect(getHeight(props)).toBe('10px');
      });
    });
  });
});
