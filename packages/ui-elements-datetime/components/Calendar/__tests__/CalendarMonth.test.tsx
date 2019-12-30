import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CalendarMonth, CalendarMonthProps } from '../CalendarMonth';
import moment from 'moment';

const currentDate = new Date(2019, 5, 12, 0, 0, 0);
const selectedDate = new Date(2019, 5, 13, 0, 0, 0);
const selectedRange = {
  from: new Date(2019, 5, 13, 0, 0, 0),
  to: new Date(2019, 5, 15, 0, 0, 0),
};
const invalidSelectedRange = {
  from: new Date(2019, 5, 15, 0, 0, 0),
  to: new Date(2019, 5, 13, 0, 0, 0),
};

enzyme.configure({ adapter: new Adapter() });

function createProps(overrides: Partial<CalendarMonthProps> = {}): CalendarMonthProps {
  return {
    currentDate: moment(currentDate),
    onDayClick: jest.fn(),
    onDayMouseEnter: jest.fn(),
    onDayMouseLeave: jest.fn(),
    isDateDisabled: date => moment(date).isBefore(currentDate, 'days'),
    ...overrides,
  };
}

describe('ui-elements-datetime', () => {
  describe('Components', () => {
    describe('CalendarDay', () => {

      const SNAPSHOT_TEST_CASES: {name: string, props: Partial<CalendarMonthProps>}[] = [
        {
          name: 'default',
          props: {},
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
          name: 'with selected range (invalid)',
          props: { selectedRange: invalidSelectedRange },
        },
        {
          name: 'with selected range (open "from")',
          props: { selectedRange: { ...selectedRange, from: null } },
        },
        {
          name: 'with selected range (open "to")',
          props: { selectedRange: { ...selectedRange, to: null } },
        },
        {
          name: 'with selected range (no highlight "from")',
          props: { selectedRange: { ...selectedRange, highlightFrom: false } },
        },
        {
          name: 'with selected range (no highlight "to")',
          props: { selectedRange: { ...selectedRange, highlightTo: false } },
        },
      ];
      SNAPSHOT_TEST_CASES.forEach((testCase) => {
        it(`should render: ${testCase.name}`, () => {
          const props = createProps(testCase.props);
          const tree = TestRenderer
            .create(<CalendarMonth {...props}/>)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
});
