import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

configure({ adapter: new Adapter() });

// Component
import { TableHeaderCell, SortOrder, getNextSortOrder } from '../TableHeaderCell';

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableHeaderCell', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TableHeaderCell />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Should render as active', () => {
        const tree = TestRenderer
          .create(withTestTheme(<TableHeaderCell sortOrder={SortOrder.ASC} />))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('getNextSortOrder should return correct value', () => {
        console.error = jest.fn();

        expect(getNextSortOrder(SortOrder.None)).toBe(SortOrder.ASC);
        expect(getNextSortOrder(SortOrder.ASC)).toBe(SortOrder.DESC);
        expect(getNextSortOrder(SortOrder.DESC)).toBe(SortOrder.None);
        expect(getNextSortOrder(0)).toBe(SortOrder.ASC);
        expect(getNextSortOrder(1)).toBe(SortOrder.DESC);
        expect(getNextSortOrder(2)).toBe(SortOrder.None);
        expect(getNextSortOrder(4)).toBe(SortOrder.None);
      });

      it('Should handle onClick event', () => {
        const COLUMN_ID = '1';
        const handler = jest.fn((sort, e) => sort);
        const expectedSort = {
          columnId: COLUMN_ID,
          sortOrder: SortOrder.ASC,
        };
        const tree = mount(withTestTheme(
          <table>
            <thead>
              <tr>
                <TableHeaderCell
                  columnId={COLUMN_ID}
                  sortOrder={SortOrder.None}
                  onSortChanged={handler}
                />
              </tr>
            </thead>
          </table>,
        ));

        tree.find(TableHeaderCell).simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.results[0].value).toEqual(expectedSort);
      });

      it('Shouldn\'t handle onClick event without required props', () => {
        const handler = jest.fn();
        const tree = mount(withTestTheme(
          <table>
            <thead>
              <tr>
                <TableHeaderCell onSortChanged={handler} />
              </tr>
            </thead>
          </table>,
        ));

        tree.find(TableHeaderCell).simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });

      it('Should render icon', () => {
        const sortIcons = {
          None: 'NoneIcon',
          ASC: 'ASCIcon',
          DESC: 'DESCIcon',
        };
        const tree = TestRenderer
          .create(withTestTheme(
            <TableHeaderCell sortOrder={SortOrder.ASC} sortIcons={sortIcons} />,
          ))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
