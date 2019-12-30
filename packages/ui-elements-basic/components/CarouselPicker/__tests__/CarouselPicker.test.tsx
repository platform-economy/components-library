import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-styled-components';
import { range, padStart } from 'lodash';
import { withTestTheme } from '@relayr/ui-elements-themes';
import { CarouselPicker, CarouselPickerProps } from '../index';

enzyme.configure({ adapter: new Adapter() });

const createItems = (start: number = 0, end: number = 10, step: number = 1) =>
  range(start, end, step).map(index => ({
    value: index,
    caption: padStart(index.toString(), 2, '0'),
  }));

const items = createItems();
const topIcon = (<span>+</span>);
const bottomIcon = (<span>-</span>);

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('CarouselPicker', () => {
      const SNAPSHOT_TEST_CASES = [
        {
          name: 'with default state',
          props: { items },
        },
        {
          name: 'with 4 siblings',
          props: { items, siblingRange: 4 },
        },
        {
          name: 'with empty item',
          props: { items, value: 2, hasEmptyItem: true },
        },
        {
          name: 'with icons (at the beginning)',
          props: { items, topIcon, bottomIcon, value: 0 },
        },
        {
          name: 'with icons (at the beginning, circular)',
          props: { items, topIcon, bottomIcon, value: 0, isCircular: true },
        },
        {
          name: 'with icons (at the end)',
          props: { items, topIcon, bottomIcon, value: items.length - 1 },
        },
        {
          name: 'with icons (at the end, circular)',
          props: { items, topIcon, bottomIcon, value: items.length - 1, isCircular: true },
        },
        {
          name: 'with icons (in the middle)',
          props: { items, topIcon, bottomIcon, value: 2 },
        },
        {
          name: 'with icons (in the middle, circular)',
          props: { items, topIcon, bottomIcon, value: 2, isCircular: true },
        },
      ];

      SNAPSHOT_TEST_CASES.forEach((testCase) => {
        it(`should render ${testCase.name}`, () => {
          const items = createItems();
          const tree = TestRenderer
            .create(withTestTheme(
              <CarouselPicker items={items} {...testCase.props} />,
            ))
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });

      it('should support "previous" button', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={1}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.find('.nav-previous').simulate('click');
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(0, expect.anything());
      });

      it('should support "previous" button (circular)', () => {
        const items = createItems(0, 10);
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={0}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
              isCircular={true}
            />));
        tree.find('.nav-previous').simulate('click');
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(9, expect.anything());
      });

      it('should support arrow up', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={1}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.simulate('keydown', { keyCode: 38 });
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(0, expect.anything());
      });

      it('should support "next" button', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={1}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.find('.nav-next').simulate('click');
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(2, expect.anything());
      });

      it('should support "next" button (circular)', () => {
        const items = createItems(0, 10);
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={9}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
              isCircular={true}
            />));
        tree.find('.nav-next').simulate('click');
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(0, expect.anything());
      });

      it('should support arrow down', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={1}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.simulate('keydown', { keyCode: 40 });
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(2, expect.anything());
      });

      it('should support clicking on item', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={1}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.find('.item.item-after').at(1).simulate('click');
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(3, expect.anything());
      });

      [-3, -1, 1, 3].forEach((wheelDelta) => {
        [1, 2].forEach((deltaMode) => {
          const deltaModeName = deltaMode === 1 ? 'line mode' : 'page mode';
          it(`should support mouse wheel (${deltaModeName}, delta = ${wheelDelta})`, () => {
            const items = createItems();
            const onValueChange = jest.fn();
            const tree = enzyme
              .mount(withTestTheme(
                <CarouselPicker
                  items={items}
                  value={1}
                  topIcon={topIcon}
                  bottomIcon={bottomIcon}
                  onValueChange={onValueChange}
                />));
            tree.simulate('wheel', { deltaMode, deltaY: wheelDelta });
            const expectedDeltaIndex = Math.sign(wheelDelta);
            expect(onValueChange).toBeCalledTimes(1);
            expect(onValueChange).toBeCalledWith(1 + expectedDeltaIndex, expect.anything());
          });
        });
      });

      [-500, -100, 100, 500].forEach((wheelDelta) => {
        it(`should support mouse wheel (pixel mode, delta = ${wheelDelta})`, () => {
          const FAKE_ITEM_HEIGHT = 22;
          const FAKE_HEIGHT = FAKE_ITEM_HEIGHT * 9;
          const items = createItems();
          const onValueChange = jest.fn();
          const tree = enzyme
            .mount(withTestTheme(
              <CarouselPicker
                items={items}
                value={1}
                topIcon={topIcon}
                bottomIcon={bottomIcon}
                onValueChange={onValueChange}
              />));
          const domElement = tree.getDOMNode();
          domElement.getBoundingClientRect = jest.fn(() => ({
            width: 100,
            height: FAKE_HEIGHT,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }));
          tree.simulate('wheel', { deltaMode: 0, deltaY: wheelDelta });
          const expectedDeltaIndex = Math.sign(wheelDelta);
          expect(onValueChange).toBeCalledTimes(1);
          expect(onValueChange).toBeCalledWith(1 + expectedDeltaIndex, expect.anything());
        });
      });

      it('should not call onValueChange when not changed', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={0}
              onValueChange={onValueChange}
              isCircular={false}
            />));
        tree.simulate('wheel', { deltaMode: 1, deltaY: -1 });
        expect(onValueChange).toBeCalledTimes(0);
      });

      it('should accumulate small wheel deltas', () => {
        const FAKE_ITEM_HEIGHT = 22;
        const FAKE_HEIGHT = FAKE_ITEM_HEIGHT * 7;
        const CURRENT = 1;

        jest.resetAllMocks();
        jest.useFakeTimers();

        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={CURRENT}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        const domElement = tree.getDOMNode();
        domElement.getBoundingClientRect = jest.fn(() => ({
          width: 100,
          height: FAKE_HEIGHT,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }));
        tree.simulate('wheel', { deltaMode: 0, deltaY: 20 }); // accumulated: 20
        expect(onValueChange).toBeCalledTimes(0);

        tree.simulate('wheel', { deltaMode: 0, deltaY: 20 }); // accumulated: 18
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(CURRENT + 1, expect.anything());

        tree.simulate('wheel', { deltaMode: 0, deltaY: -60 }); // accumulated: -20
        expect(onValueChange).toBeCalledTimes(2);
        expect(onValueChange).toBeCalledWith(CURRENT - 1, expect.anything());

        jest.runAllTimers(); // accumulated: 0

        tree.simulate('wheel', { deltaMode: 0, deltaY: -20 }); // accumulated: -20
        expect(onValueChange).toBeCalledTimes(2);
      });

      it('should support touch', () => {
        const FAKE_HEIGHT = 700;

        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={4}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        const domElement = tree.getDOMNode();
        domElement.getBoundingClientRect = jest.fn(() => ({
          width: 100,
          height: FAKE_HEIGHT,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }));

        tree.simulate('touchstart', { touches: [{ clientY: FAKE_HEIGHT / 7 }] });
        expect(onValueChange).toBeCalledTimes(0);
        tree.simulate('touchmove', { touches: [{ clientY: FAKE_HEIGHT / 7 * 3 }] });
        expect(onValueChange).toBeCalledTimes(1);
        expect(onValueChange).toBeCalledWith(2, expect.anything());
        tree.simulate('touchend', { touches: [{ clientY: FAKE_HEIGHT / 7 * 2 }] });
        expect(onValueChange).toBeCalledTimes(2);
        expect(onValueChange).toBeCalledWith(3, expect.anything());

        // touchstart with empty touches array (is it even possible?) should have no effect
        tree.simulate('touchstart', { touches: [] });
        tree.simulate('touchmove', { touches: [{ clientY: FAKE_HEIGHT / 7 * 3 }] });
        expect(onValueChange).toBeCalledTimes(2);
      });

      /* is it even possible? */
      it('should handle empty touches list', () => {
        const items = createItems();
        const onValueChange = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <CarouselPicker
              items={items}
              value={4}
              topIcon={topIcon}
              bottomIcon={bottomIcon}
              onValueChange={onValueChange}
            />));
        tree.simulate('touchstart', { touches: [] });
        tree.simulate('touchmove', { touches: [] });
        tree.simulate('touchend', { touches: [] });
        expect(onValueChange).toBeCalledTimes(0);
      });

      ['touchmove', 'touchend'].forEach((eventName) => {
        it(`should skip ${eventName} event without touchstart`, () => {
          const FAKE_HEIGHT = 700;

          const items = createItems();
          const onValueChange = jest.fn();
          const tree = enzyme
            .mount(withTestTheme(
              <CarouselPicker
                items={items}
                value={4}
                topIcon={topIcon}
                bottomIcon={bottomIcon}
                onValueChange={onValueChange}
              />));
          tree.simulate(eventName, { touches: [{ clientY: FAKE_HEIGHT / 7 * 3 }] });
          expect(onValueChange).toBeCalledTimes(0);
        });
      });

      const EXPOSED_DOM_EVENTS: {domEvent: string, prop: keyof CarouselPickerProps }[] = [
        { prop: 'onKeyDown', domEvent: 'keydown' },
        { prop: 'onKeyUp', domEvent: 'keyup' },
        { prop: 'onKeyPress', domEvent: 'keypress' },
        { prop: 'onFocus', domEvent: 'focus' },
        { prop: 'onBlur', domEvent: 'blur' },
      ];

      EXPOSED_DOM_EVENTS.forEach(({ prop, domEvent }) => {
        it(`should expose ${prop} event from DOM`, () => {
          const items = createItems();
          const callback = jest.fn();
          const eventProps = {
            [prop]: callback,
          };
          const tree = enzyme
            .mount(withTestTheme(
              <CarouselPicker
                items={items}
                value={1}
                {...eventProps}
              />));
          tree.simulate(domEvent);
          expect(callback).toBeCalledTimes(1);
          expect(callback).toBeCalledWith(expect.anything());
        });
      });
    });
  });
});
