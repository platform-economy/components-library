import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import * as enzyme from 'enzyme';
import 'jest-styled-components';
import { resizeWindow } from '../../../../../helpers/test-helpers';

enzyme.configure({ adapter: new Adapter() });

import { createMediaQuery, sizesMapDefault } from '../index';

const MediaQuery = createMediaQuery(sizesMapDefault);

const MQSize = {
  S: 414,
  M: 768,
  L: 960,
  XL: 1440,
};

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('MediaQuery', () => {
      beforeEach(() => {
        resizeWindow(MQSize.M);
      });

      it('should render with some children inside', () => {
        const tree = TestRenderer
          .create(<MediaQuery><input type="text" /></MediaQuery>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should be displayed, because it has no minimum nor maximum size', () => {
        const wrapper = enzyme.mount(
          <MediaQuery>
            <input type="text" />
          </MediaQuery>,
        );
        const MQ = wrapper.find('input').length;
        expect(MQ).toBe(1);
      });
      it('should be displayed, because it fits in the given display size', () => {
        const wrapper = enzyme.mount(
          <MediaQuery
            min={'S'}
            max={'XL'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQ = wrapper.find('input').length;
        expect(MQ).toBe(1);
      });
      it('should not be displayed, because it doesn\'t fit in the given display size', () => {
        const wrapper = enzyme.mount(
          <MediaQuery
            max={'S'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQ = wrapper.find('input').length;
        expect(MQ).toBe(0);
      });

      it('should return false since display conditions have not be changed', () => {
        const tree = TestRenderer.create(
          <MediaQuery
            min={'S'}
            max={'XL'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        const result = MQInstance.displayConditionsChanged(
          {
            min: 'S',
            max: 'XL',
          },
          {
            min: 'S',
            max: 'XL',
          },
        );
        expect(result).toBe(false);
      });
      it('should return true since display conditions changed', () => {
        const tree = TestRenderer.create(
          <MediaQuery
            min={'S'}
            max={'XL'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        const result = MQInstance.displayConditionsChanged(
          {
            min: 'S',
            max: 'XL',
          },
          {
            min: 'M',
            max: 'L',
          },
        );
        expect(result).toBe(true);
      });
      it('should return true since display conditions changed [2]', () => {
        const tree = TestRenderer.create(
          <MediaQuery>
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        const result = MQInstance.displayConditionsChanged(
          {
            min: 'S',
            max: 'XL',
          },
          {
            min: undefined,
            max: undefined,
          },
        );
        expect(result).toBe(true);
      });

      it('should return false since window size change didn\'t influence display', () => {
        const tree = TestRenderer.create(
          <MediaQuery
            min={'S'}
            max={'XL'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        const result = MQInstance.windowDimensionsChanged(
          {
            windowWidth: MQSize.S,
          },
          {
            windowWidth: MQSize.L,
          },
        );
        expect(result).toBe(false);
      });
      it('should return true since window size change influenced display', () => {
        const tree = TestRenderer.create(
          <MediaQuery
            max={'M'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        const result = MQInstance.windowDimensionsChanged(
          {
            windowWidth: MQSize.S,
          },
          {
            windowWidth: MQSize.L,
          },
        );
        expect(result).toBe(true);
      });

      it('should change state accordingly to window resize', () => {
        const tree = TestRenderer.create(
          <MediaQuery
            min={'S'}
            max={'XL'}
          >
            <input type="text" />
          </MediaQuery>,
        );
        const MQInstance = tree.root.instance;
        expect(MQInstance.state.windowWidth).toBe(MQSize.M);
        resizeWindow(MQSize.S);
        expect(MQInstance.state.windowWidth).toBe(MQSize.S);
      });

      it('should properly add and remove resize event listener', () => {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        const wrapper = enzyme.mount(
          <MediaQuery>
            <input type="text" />
          </MediaQuery>,
        );
        expect(window.addEventListener).toHaveBeenCalled();

        wrapper.unmount();
        expect(window.removeEventListener).toHaveBeenCalled();
      });
    });
  });
});
