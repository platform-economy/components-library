import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { withTestTheme } from '@relayr/ui-elements-themes';
import 'jest-styled-components';

// Component
import { Spinner, sizeCounter, borderSizeCounter } from '../index';

describe('ui-elements-skeletons', () => {
  describe('Components', () => {
    describe('Spinner', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Spinner />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with size prop as number', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Spinner size={300}/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with size prop as text', () => {
        const tree = TestRenderer
          .create(withTestTheme(<Spinner size="100px"/>))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should count size properly', () => {
        expect(sizeCounter(10)).toBe('10px');
        expect(sizeCounter('100px')).toBe('100px');
        expect(sizeCounter('100em')).toBe('100em');
        expect(sizeCounter(undefined)).toBe('1em');
      });
      it('should count border size properly', () => {
        expect(borderSizeCounter(80)).toBe('10px');
        expect(borderSizeCounter('80px')).toBe('10px');
        expect(borderSizeCounter('80em')).toBe('10em');
        expect(borderSizeCounter(undefined)).toBe('.2em');
      });
    });
  });
});
