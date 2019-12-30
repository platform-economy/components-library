import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';

// Component
import { GridWrapper, GridGrow, columnPercentage, growCounter } from '../index';

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('GridWrapper', () => {

      it('should render with Grid Grow element and correct props', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <GridWrapper columns={2}>
              <GridGrow columns={2} colspan={1}>
                <div />
              </GridGrow>
            </GridWrapper>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with Grid Grow element and incorrect props', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <GridWrapper columns={2}>
              <GridGrow columns={2} colspan={0}>
                <div />
              </GridGrow>
            </GridWrapper>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('counts proper column width and colspan', () => {
        const props = { columns: 3, colspan:2 };

        expect(columnPercentage(props.columns)).toBe(32);
        expect(growCounter(props.columns, props.colspan)).toBe(66);
      });

      it('counts proper column width with one column', () => {
        const props = { columns: 1 };

        expect(columnPercentage(props.columns)).toBe(100);
      });

      it('counts proper columns width when colspan is incorrect', () => {
        const props = { columns: 3, colspan:0 };

        expect(growCounter(props.columns, props.colspan)).toBe(32);
      });

      it('counts proper column width with incorrect column props', () => {
        const props = { columns: 7 };

        expect(columnPercentage(props.columns)).toBe(100);
      });
    });
  });
});
