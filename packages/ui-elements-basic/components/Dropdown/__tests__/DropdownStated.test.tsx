import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DropdownStated, DropdownContext } from '../index';
import { getContextInterceptor } from '../../../../../helpers/test-helpers';

enzyme.configure({ adapter: new Adapter() });

const OPEN_DELAY = 20;
const CLOSE_DELAY = 300;

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('DropdownStated', () => {

      beforeEach(() => {
        jest.resetAllMocks();
        jest.useFakeTimers();
      });

      it('should toggle on cover click', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated>
              <context.Interceptor />
            </DropdownStated>
          ));
        context.current.onCoverClick();
        expect(context.current.opened).toEqual(true);
        context.current.onCoverClick();
        expect(context.current.opened).toEqual(false);
      });

      it('should keep opened on content click', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated>
              <context.Interceptor />
            </DropdownStated>
          ));
        context.current.onCoverClick();
        expect(context.current.opened).toEqual(true);
        context.current.onContentClick();
        expect(context.current.opened).toEqual(true);
        context.current.onContentClick();
        expect(context.current.opened).toEqual(true);
      });

      it('should close on outside click', () => {
        const context = getContextInterceptor(DropdownContext);

        enzyme
          .mount((
            <DropdownStated>
              <context.Interceptor />
            </DropdownStated>
          ));
        context.current.onCoverClick();
        expect(context.current.opened).toEqual(true);
        document.dispatchEvent(new Event('mousedown'));
        expect(context.current.opened).toEqual(false);
      });

      it(`should open/close on hover after ${OPEN_DELAY}ms/${CLOSE_DELAY}ms`, () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated dropOnHover={true}>
              <context.Interceptor />
            </DropdownStated>
          ));

        // 1. mouse enter - schedule debounced open
        context.current.onMouseOver();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), OPEN_DELAY);
        expect(context.current.opened).toEqual(false);

        // 2. open after debounce time
        jest.runAllTimers();
        expect(context.current.opened).toEqual(true);

        // 3. mouse leave - schedule debounced close
        context.current.onMouseOut();
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), CLOSE_DELAY);
        expect(context.current.opened).toEqual(true);

        // 4. close after debounce time
        jest.runTimersToTime(CLOSE_DELAY);
        expect(context.current.opened).toEqual(false);
      });

      it('should not open/close on hover when not enabled', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated>
              <context.Interceptor />
            </DropdownStated>
          ));

        context.current.onMouseOver();
        jest.runAllTimers();
        expect(context.current.opened).toEqual(false);
        context.current.onMouseOut();
        jest.runAllTimers();
        expect(context.current.opened).toEqual(false);
      });

      it('should abort opening on mouse enter when mouse leaves', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated dropOnHover={true}>
              <context.Interceptor />
            </DropdownStated>
          ));

        // 1. mouse enter - not opened yet
        context.current.onMouseOver();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(context.current.opened).toEqual(false);

        // 2. mouse leave - abort opening
        jest.runTimersToTime(OPEN_DELAY / 2);
        context.current.onMouseOut();
        expect(clearTimeout).toHaveBeenCalledTimes(1);
        expect(context.current.opened).toEqual(false);

        // 3. no change after timeout(s)
        jest.runAllTimers();
        expect(context.current.opened).toEqual(false);
      });

      it('should abort closing on mouse leave when mouse entered again', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <DropdownStated dropOnHover={true}>
              <context.Interceptor />
            </DropdownStated>
          ));

        // 0. preparation - mouse enter and run timers - opened
        context.current.onMouseOver();
        jest.runAllTimers();
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(context.current.opened).toEqual(true);

        // 1. mouse leave - still opened
        context.current.onMouseOut();
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(context.current.opened).toEqual(true);

        // 2. mouse enter - break closing
        jest.runTimersToTime(CLOSE_DELAY / 2);
        context.current.onMouseOver();
        expect(clearTimeout).toHaveBeenCalledTimes(1);
        expect(context.current.opened).toEqual(true);

        // 3. no change after timeout(s)
        jest.runAllTimers();
        expect(context.current.opened).toEqual(true);
      });
    });
  });
});
