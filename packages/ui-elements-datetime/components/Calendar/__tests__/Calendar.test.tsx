import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Calendar, CalendarProps } from '../index';
import moment from 'moment';
import { withTestTheme } from '@relayr/ui-elements-themes';
import { CalendarDay, CalendarDayProps } from '../CalendarDay';

const currentDate = new Date(2019, 5, 12, 0, 0, 0);
const previousMonth = moment(currentDate).subtract(1, 'month').toDate();
const previousYear = moment(currentDate).subtract(1, 'year').toDate();
const nextMonth = moment(currentDate).add(1, 'month').toDate();
const nextYear = moment(currentDate).add(1, 'year').toDate();
const selectedDate = new Date(2019, 5, 13, 0, 0, 0);
const selectedRange = {
  from: new Date(2019, 5, 13, 0, 0, 0),
  to: new Date(2019, 5, 15, 0, 0, 0),
};

enzyme.configure({ adapter: new Adapter() });

function createProps(overrides: Partial<CalendarProps> = {}): CalendarProps {
  return {
    currentDate,
    className: 'test',
    ...overrides,
  };
}

const navigationButtons = {
  previousYearIcon: (<span>&lt;&lt;</span>),
  previousMonthIcon: (<span>&lt;</span>),
  nextYearIcon: (<span>&gt;&gt;</span>),
  nextMonthIcon: (<span>&gt;</span>),
};

const isDateDisabled = (date: Date) => moment(date).isBefore(currentDate, 'days');

function getDayDateSelector(date: moment.Moment) {
  return (el: enzyme.ReactWrapper<CalendarDayProps>) => {
    const dateFromProps = el.prop('date');
    return dateFromProps && dateFromProps.isSame(date, 'day');
  };
}

describe('ui-elements-datetime', () => {
  describe('Components', () => {
    describe('Calendar', () => {

      const SNAPSHOT_TEST_CASES: {name: string, props: Partial<CalendarProps>}[] = [
        {
          name: 'default',
          props: {},
        },
        {
          name: 'with locale',
          props: { locale: 'pl' },
        },
        {
          name: 'with selected date',
          props: { selectedDate },
        },
        {
          name: 'with selected range',
          props: { selectedRange },
        },
        {
          name: 'with selected range ("open" from)',
          props: { selectedRange: { ...selectedRange, highlightFrom: false } },
        },
        {
          name: 'with selected range ("open" to)',
          props: { selectedRange: { ...selectedRange, highlightTo: false } },
        },
        {
          name: 'with min current date equals current date',
          props: { minCurrentDate: currentDate },
        },
        {
          name: 'with min current date equals previous month',
          props: { minCurrentDate: previousMonth },
        },
        {
          name: 'with min current date equals previous year',
          props: { minCurrentDate: previousYear },
        },
        {
          name: 'with max current date equals current date',
          props: { maxCurrentDate: currentDate },
        },
        {
          name: 'with max current date equals next month',
          props: { maxCurrentDate: nextMonth },
        },
        {
          name: 'with max current date equals next year',
          props: { maxCurrentDate: nextYear },
        },
        {
          name: 'with previous/next buttons',
          props: { ...navigationButtons },
        },
        {
          name: 'with disabled dates',
          props: { isDateDisabled },
        },
      ];
      SNAPSHOT_TEST_CASES.forEach((testCase) => {
        it(`should render: ${testCase.name}`, () => {
          const props = createProps(testCase.props);
          const tree = TestRenderer
            .create(withTestTheme(<Calendar {...props}/>))
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });

      function mountAndGetDay(props: CalendarProps, date: moment.Moment) {
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        return tree
          .find(CalendarDay)
          .findWhere(getDayDateSelector(date));
      }

      it('should handle click on day', () => {
        const props = createProps({
          onDayClick: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const date = moment(currentDate);
        mountAndGetDay(props, date).simulate('click');
        const expectedDate = date.toDate();
        expect(props.onDayClick).toBeCalled();
        expect(props.onDayClick).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on day (no handlers attached)', () => {
        const props = createProps();
        const date = moment(currentDate);
        mountAndGetDay(props, date).simulate('click');
      });

      it('should handle click on date below minCurrentDate', () => {
        const props = createProps({
          minCurrentDate: currentDate,
          onDayClick: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const date = moment(currentDate).subtract(1, 'day');
        mountAndGetDay(props, date).simulate('click');
        const expectedDate = date.toDate();
        expect(props.onDayClick).toBeCalled();
        expect(props.onDayClick).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });

      it('should handle click on date above maxCurrentDate', () => {
        const props = createProps({
          maxCurrentDate: currentDate,
          onDayClick: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const date = moment(currentDate).add(1, 'day');
        mountAndGetDay(props, date).simulate('click');
        const expectedDate = date.toDate();
        expect(props.onDayClick).toBeCalled();
        expect(props.onDayClick).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });

      it('should handle mouse enter on day', () => {
        const props = createProps({
          onDayMouseEnter: jest.fn(),
        });
        const date = moment(currentDate);
        mountAndGetDay(props, date).simulate('mouseenter');
        const expectedDate = date.toDate();
        expect(props.onDayMouseEnter).toBeCalled();
        expect(props.onDayMouseEnter).toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle mouse leave on day', () => {
        const props = createProps({
          onDayMouseLeave: jest.fn(),
        });
        const date = moment(currentDate);
        mountAndGetDay(props, date).simulate('mouseleave');
        const expectedDate = date.toDate();
        expect(props.onDayMouseLeave).toBeCalled();
        expect(props.onDayMouseLeave).toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on previous year', () => {
        const props = createProps({
          onPreviousYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-year')
          .simulate('click');
        const expectedDate = previousYear;
        expect(props.onPreviousYear).toBeCalled();
        expect(props.onPreviousYear).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on previous year (no events attached)', () => {
        const props = createProps();
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-year')
          .simulate('click');
      });

      it('should coerce date when clicking on previous year', () => {
        const minCurrentDate = moment(previousYear).add(1, 'day').toDate();
        const props = createProps({
          minCurrentDate,
          onPreviousYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-year')
          .simulate('click');
        const expectedDate = minCurrentDate;
        expect(props.onPreviousYear).toBeCalled();
        expect(props.onPreviousYear).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should not handle click on disabled previous year', () => {
        const props = createProps({
          minCurrentDate: currentDate,
          onPreviousYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-year')
          .simulate('click');
        expect(props.onPreviousYear).toBeCalledTimes(0);
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });

      it('should handle click on previous month', () => {
        const props = createProps({
          onPreviousMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-month')
          .simulate('click');
        const expectedDate = previousMonth;
        expect(props.onPreviousMonth).toBeCalled();
        expect(props.onPreviousMonth).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on previous month (no events attached)', () => {
        const props = createProps();
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-month')
          .simulate('click');
      });

      it('should handle click on previous month (onPreviousMonth', () => {
        const props = createProps({
          onPreviousMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-month')
          .simulate('click');
        const expectedDate = previousMonth;
        expect(props.onPreviousMonth).toBeCalled();
        expect(props.onPreviousMonth).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should coerce date when clicking on previous month', () => {
        const minCurrentDate = moment(previousMonth).add(1, 'day').toDate();
        const props = createProps({
          minCurrentDate,
          onPreviousMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-month')
          .simulate('click');
        const expectedDate = minCurrentDate;
        expect(props.onPreviousMonth).toBeCalled();
        expect(props.onPreviousMonth).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should not handle click on disabled previous month', () => {
        const props = createProps({
          minCurrentDate: currentDate,
          onPreviousMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.previous-month')
          .simulate('click');
        expect(props.onPreviousMonth).toBeCalledTimes(0);
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });

      it('should handle click on next year', () => {
        const props = createProps({
          onNextYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-year')
          .simulate('click');
        const expectedDate = nextYear;
        expect(props.onNextYear).toBeCalled();
        expect(props.onNextYear).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on next year (no events attached)', () => {
        const props = createProps();
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-year')
          .simulate('click');
      });

      it('should coerce date when clicking on next year', () => {
        const maxCurrentDate = moment(nextYear).subtract(1, 'day').toDate();
        const props = createProps({
          maxCurrentDate,
          onNextYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-year')
          .simulate('click');
        const expectedDate = maxCurrentDate;
        expect(props.onNextYear).toBeCalled();
        expect(props.onNextYear).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should not handle click on disabled next year', () => {
        const props = createProps({
          maxCurrentDate: currentDate,
          onNextYear: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-year')
          .simulate('click');
        expect(props.onNextYear).toBeCalledTimes(0);
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });

      it('should handle click on next month', () => {
        const props = createProps({
          onNextMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-month')
          .simulate('click');
        const expectedDate = nextMonth;
        expect(props.onNextMonth).toBeCalled();
        expect(props.onNextMonth).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should handle click on next month (no events attached)', () => {
        const props = createProps();
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-month')
          .simulate('click');
      });

      it('should coerce date when clicking on next month', () => {
        const maxCurrentDate = moment(nextMonth).subtract(1, 'day').toDate();
        const props = createProps({
          maxCurrentDate,
          onNextMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-month')
          .simulate('click');
        const expectedDate = maxCurrentDate;
        expect(props.onNextMonth).toBeCalled();
        expect(props.onNextMonth).toHaveBeenLastCalledWith(expectedDate, expect.anything());
        expect(props.onCurrentDateChanged).toBeCalled();
        expect(props.onCurrentDateChanged)
          .toHaveBeenLastCalledWith(expectedDate, expect.anything());
      });

      it('should not handle click on disabled next month', () => {
        const props = createProps({
          maxCurrentDate: currentDate,
          onNextMonth: jest.fn(),
          onCurrentDateChanged: jest.fn(),
        });
        const tree = enzyme
          .mount(withTestTheme(<Calendar {...props}/>));
        tree
          .find('.navigation-btn.next-month')
          .simulate('click');
        expect(props.onNextMonth).toBeCalledTimes(0);
        expect(props.onCurrentDateChanged).toBeCalledTimes(0);
      });
    });
  });
});
