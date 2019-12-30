import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';
import { withTestTheme } from '@relayr/ui-elements-themes';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

// Component
import {
  DataTable,
  ColumnType,
  renderDetailsInternally,
  controlIndeterminate,
  isRowExpanded,
  checkItem,
  uncheckItem,
  toggleExpand,
  toggleExpandAll,
  checkAll,
  uncheckAll,
} from '../index';
import { DetailItem, RowDetails } from '../../RowDetails';

type RowItem = {
  test: string;
  id: string;
  details: DetailItem[],
};

type TestRow = {
  test: string,
  id: string,
  details?: unknown[],
};

const renderDetails = (data:React.ReactNode) => {
  return data;
};

const getRowId = jest.fn();

const detailsData = [
  { key: 'Test', value: 'Test' },
];

const getDetails = (data:RowItem) => data.details;

const columns: ColumnType<TestRow>[] = [
  {
    columnId: 'c',
    type: 'checkbox',
    renderCell: (data, handler) => {
      return (
      <input
        type="checkbox"
        // tslint:disable-next-line:jsx-no-lambda
        onChange={e => handler.setChecked(handler.checked)}
        checked={handler.checked}
      />);
    },
    renderCaption: (headerHandler) => {
      return (
      <input
        type="checkbox"
        className="indeterminate"
        // tslint:disable-next-line:jsx-no-lambda
        onChange={e => headerHandler.setChecked(!headerHandler.checked)
        }
        checked={!!headerHandler.checked}
      />);
    },
  },
  {
    columnId: 'c0',
    type: 'control',
    renderCell: () => 'test',
    caption: 'd',
  },
  {
    columnId: 'c1',
    type: 'checkbox',
    renderCell: () => 'test',
    caption: 'd',
  },
  {
    columnId: 'c2',
    renderCell: () => 'test',
    caption: 'c2',
    short: true,
    align: 'center',
  },
  {
    columnId: 'c3',
    renderCell: () => 'test2',
    caption: 'Name',
  },
  {
    columnId: 'c4',
    type: 'empty',
    renderCell: () => '',
  },
  {
    columnId: 'c5',
    renderCell: () => 'test2',
    renderCaption: undefined,
    caption: 'caption',
  },
  {
    columnId: 'c6',
    renderCell: () => 'test4',
    renderCaption: () => 'test4',
  },
  {
    columnId: 'c7',
    renderCell: () => 'test',
  },
  {
    type: 'control',
    columnId: 'c8',
    short: true,
    renderCell: (data, handler) => (
      <button
      // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          handler.toggleExpanded();
        }}
      />
    ),
    renderCaption: headerHandler => (
      <button
      // tslint:disable-next-line:jsx-no-lambda
        onClick={() => {
          headerHandler.toggleExpanded();
        }}
      />
    ),
  },
];

const rows = [
  { test: 'Test', id: 'r0', details: [], c2: 'test', c3: 'test', c4:'test', c5:'test', c6:'test' },
  { test: 'Test', id: 'r1', details: detailsData },
  { test: 'Test', id: 'r2' },
];

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('DataTable', () => {

      it('should render with renderDetails', () => {
        const mock = jest.fn();
        const tree = TestRenderer
          .create(withTestTheme(
          <DataTable
            columns={columns}
            rows={rows}
            getRowId={mock}
            renderDetails={renderDetails}
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with getDetails', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <DataTable
            columns={columns}
            rows={rows}
            getRowId={getRowId}
            getDetails={getDetails}
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render with no details', () => {
        const tree = TestRenderer
          .create(withTestTheme(
          <DataTable
            columns={columns}
            rows={rows}
            getRowId={getRowId}
          />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render details internally', () => {
        const data:DetailItem[] = [];
        const renderFunction = renderDetailsInternally();
        expect(renderFunction).toEqual(<div>No Details to show</div>);
        expect(renderDetailsInternally(data)).toEqual(<RowDetails data={data} />);
      });

      it('should handle indeterminate state properly', () => {
        const empty:React.ReactText[] = [];
        const one:React.ReactText[] = ['test'];
        const two:React.ReactText[] = ['test', 'test2'];
        expect(controlIndeterminate(empty, empty)).toBeTruthy();
        expect(controlIndeterminate(one, two)).toBe(null);
        expect(controlIndeterminate(empty, two)).toBeFalsy();
      });

      it('should check and uncheck items properly', () => {
        const one = '1';
        const two = '2';
        const checkedItems = ['2'];
        expect(checkItem(one, checkedItems)).toEqual(['2', '1']);
        expect(checkItem(two, checkedItems)).toEqual(['2']);
        expect(uncheckItem(two, checkedItems)).toEqual([]);
        expect(uncheckItem(one, checkedItems)).toEqual(['2']);
      });

      it('should expand row properly', () => {
        const one = '1';
        const two = '2';
        const checkedItems = ['2'];
        expect(isRowExpanded(one, checkedItems)).toBeFalsy();
        expect(isRowExpanded(one, checkedItems, true)).toBeTruthy();
        expect(isRowExpanded(one, checkedItems, false)).toBeFalsy();
        expect(isRowExpanded(two, checkedItems)).toBeTruthy();
      });

      it('should toggle expand properly', () => {
        const on = jest.fn();
        const off = jest.fn();
        const one = '1';
        const two = '2';
        const checkedItems = ['2'];
        toggleExpand(one, on, checkedItems);
        expect(on).toBeCalledTimes(1);
        expect(on).toHaveBeenCalledWith(['2', '1']);
        toggleExpand(two, off, checkedItems);
        expect(off).toBeCalledTimes(1);
        expect(off).toHaveBeenCalledWith([]);
        toggleExpand(two);
      });

      it('should toggle expand all properly', () => {
        const on = jest.fn();
        const off = jest.fn();
        const ids = ['2', '1'];
        const one = ['1'];
        toggleExpandAll(on, ids, one);
        expect(on).toBeCalledTimes(1);
        expect(on).toBeCalledWith(['1', '2']);
        toggleExpandAll(off, ids, undefined);
        expect(off).toBeCalledTimes(1);
        toggleExpandAll(on, ids, ids);
        expect(on).toBeCalledWith([]);
        toggleExpandAll(undefined, ids, one);
      });

      it('should check and uncheck all properly', () => {
        const on = jest.fn();
        const off = jest.fn();
        const ids = ['1', '2'];
        const one = ['1'];
        checkAll(one, ids, on);
        expect(on).toBeCalledTimes(1);
        expect(on).toBeCalledWith(ids);
        uncheckAll(one, ids, off);
        expect(off).toBeCalledTimes(1);
        expect(off).toBeCalledWith([]);
      });

      it('should handle checks and expand properly', () => {
        const WrappingComponent = (props: { children: React.ReactElement }) => (
          withTestTheme(props.children)
        );
        const expand = jest.fn();
        const check = jest.fn();
        const wrapper = enzyme.mount(
          <DataTable
            columns={columns}
            rows={rows}
            // tslint:disable-next-line:jsx-no-lambda
            getRowId={(row:RowItem) => row.id}
            getDetails={getDetails}
            checkedItems={['r0']}
            expandedItems={['r1']}
            onCheckedItemsChange={check}
            onExpandedItemsChange={expand}
          />
        , { wrappingComponent: WrappingComponent },
        );
        wrapper.find('button').at(1).simulate('click');
        expect(expand).toHaveBeenCalledTimes(1);
        wrapper.find('input[type="checkbox"]').at(1).simulate('change');
        expect(check).toHaveBeenCalledTimes(1);
        wrapper.find('input[type="checkbox"]').at(2).simulate('change');
        expect(check).toHaveBeenCalledTimes(2);
        wrapper.find('button').at(0).simulate('click');
      });

      it('should uncheck all properly', () => {
        const WrappingComponent = (props: { children: React.ReactElement }) => (
          withTestTheme(props.children)
        );
        const check = jest.fn();
        const ids = rows.map(row => row.id);
        const wrapper = enzyme.mount(
          <DataTable
            columns={columns}
            rows={rows}
            checkedItems={ids}
            // tslint:disable-next-line:jsx-no-lambda
            getRowId={(row:RowItem) => row.id}
            getDetails={getDetails}
            onCheckedItemsChange={check}
          />
        , { wrappingComponent: WrappingComponent },
        );
        wrapper.find('input[type="checkbox"]').at(0).simulate('change');
        expect(check).toBeCalledTimes(1);
        expect(check).toBeCalledWith([]);
      });
      it('should check all properly', () => {
        const WrappingComponent = (props: { children: React.ReactElement }) => (
          withTestTheme(props.children)
        );
        const check = jest.fn();
        const ids = ['r1'];
        const wrapper = enzyme.mount(
          <DataTable
            columns={columns}
            rows={rows}
            checkedItems={ids}
            // tslint:disable-next-line:jsx-no-lambda
            getRowId={(row:RowItem) => row.id}
            getDetails={getDetails}
            onCheckedItemsChange={check}
          />
        , { wrappingComponent: WrappingComponent },
        );
        wrapper.find('input[type="checkbox"]').at(0).simulate('change');
        expect(check).toBeCalledTimes(1);
        expect(check).toBeCalledWith(['r1', 'r0', 'r2']);
      });
    });
  });
});
