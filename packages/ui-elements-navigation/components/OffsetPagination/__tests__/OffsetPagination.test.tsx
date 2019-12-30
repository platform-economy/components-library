import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { withTestTheme } from '@relayr/ui-elements-themes';
import { OffsetPagination } from '../index';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-navigation', () => {
  describe('Components', () => {
    describe('OffsetPagination', () => {
      it('should render first page', () => {
        const tree = TestRenderer
          .create(withTestTheme(<OffsetPagination limit={10} offset={0} totalItems={200} />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render last page', () => {
        const tree = TestRenderer
          .create(withTestTheme(<OffsetPagination limit={10} offset={190} totalItems={200} />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render middle page', () => {
        const tree = TestRenderer
          .create(withTestTheme(<OffsetPagination limit={10} offset={100} totalItems={200} />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with custom icons', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              previousNavIcon={<div>&lt;</div>}
              nextNavIcon={<div>&gt;</div>}
              firstNavIcon={<div>&lt;&lt;</div>}
              lastNavIcon={<div>&gt;&gt;</div>}
            />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render with first/last buttons', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              showFirstAndLastNav={true}
              previousNavIcon={<div>&lt;</div>}
              nextNavIcon={<div>&gt;</div>}
              firstNavIcon={<div>&lt;&lt;</div>}
              lastNavIcon={<div>&gt;&gt;</div>}
            />))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should call onChange when clicked on page', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              siblingRange={2}
              onChange={handler}
            />));
        tree.find('.page-9').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).lastCalledWith({ newOffset: 80, newPageIndex: 8 }, expect.anything());
      });
      it('should NOT call onChange when clicked on current page', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              onChange={handler}
            />));
        tree.find('.page-11').simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });
      it('should call onChange when clicked on "previous" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              onChange={handler}
            />));
        tree.find('.nav-prev').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).lastCalledWith({ newOffset: 90, newPageIndex: 9 }, expect.anything());
      });
      it('should NOT call onChange when clicked on disabled "previous" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={0}
              totalItems={200}
              onChange={handler}
            />));
        tree.find('.nav-prev').simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });
      it('should call onChange when clicked on "next" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              onChange={handler}
            />));
        tree.find('.nav-next').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).lastCalledWith({ newOffset: 110, newPageIndex: 11 }, expect.anything());
      });
      it('should NOT call onChange when clicked on disabled "next" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={190}
              totalItems={200}
              onChange={handler}
            />));
        tree.find('.nav-next').simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });
      it('should call onChange when clicked on "first" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              showFirstAndLastNav={true}
              onChange={handler}
            />));
        tree.find('.nav-first').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).lastCalledWith({ newOffset: 0, newPageIndex: 0 }, expect.anything());
      });
      it('should NOT call onChange when clicked on disabled "first" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={0}
              totalItems={200}
              showFirstAndLastNav={true}
              onChange={handler}
            />));
        tree.find('.nav-first').simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });
      it('should call onChange when clicked on "last" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={100}
              totalItems={200}
              showFirstAndLastNav={true}
              onChange={handler}
            />));
        tree.find('.nav-last').simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler).lastCalledWith({ newOffset: 190, newPageIndex: 19 }, expect.anything());
      });
      it('should NOT call onChange when clicked on disabled "last" button', () => {
        const handler = jest.fn();
        const tree = enzyme
          .mount(withTestTheme(
            <OffsetPagination
              limit={10}
              offset={190}
              totalItems={200}
              showFirstAndLastNav={true}
              onChange={handler}
            />));
        tree.find('.nav-last').simulate('click');
        expect(handler).toHaveBeenCalledTimes(0);
      });
    });
  });
});
