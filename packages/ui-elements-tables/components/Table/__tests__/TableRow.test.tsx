import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

configure({ adapter: new Adapter() });

// Component
import { TableRow } from '../TableRow';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableRow', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TableRow />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Should handle onClick event', () => {
        const handler = jest.fn();
        const tree = mount(withTestTheme(
          <table>
            <tbody>
              <TableRow onClick={handler} />
            </tbody>
          </table>,
        ));

        tree.find(TableRow).simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('Should handle onClick event without handler', () => {
        const tree = mount(withTestTheme(
          <table>
            <tbody>
              <TableRow />
            </tbody>
          </table>,
        ));
        let error;

        try {
          tree.find(TableRow).simulate('click');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);
      });
    });
  });
});
