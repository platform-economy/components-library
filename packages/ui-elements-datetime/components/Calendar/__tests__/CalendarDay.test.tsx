import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CalendarDay, CalendarDayProps } from '../CalendarDay';
import moment from 'moment';

const currentDate = new Date(2019, 5, 12, 0, 0, 0);

enzyme.configure({ adapter: new Adapter() });

function createProps(overrides: Partial<CalendarDayProps> = {}): CalendarDayProps {
  return {
    date: moment(currentDate),
    isCurrentMonth: true,
    isCurrentDay: false,
    isSelectedDay: false,
    isSelectionStart: false,
    isSelectionEnd: false,
    isSelectionSpan: false,
    isDisabled: false,
    ...overrides,
  };
}

describe('ui-elements-datetime', () => {
  describe('Components', () => {
    describe('CalendarDay', () => {

      const SNAPSHOT_TEST_CASES: {name: string, props: Partial<CalendarDayProps>}[] = [
        {
          name: 'default',
          props: {},
        },
        {
          name: 'as current day',
          props: { isCurrentDay: true },
        },
        {
          name: 'as single selection',
          props: { isSelectedDay: true },
        },
        {
          name: 'as selection range start',
          props: { isSelectionStart: true },
        },
        {
          name: 'as selection range end',
          props: { isSelectionEnd: true },
        },
        {
          name: 'as selection range span',
          props: { isSelectionSpan: true },
        },
        {
          name: 'as disabled',
          props: { isDisabled: true },
        },
      ];
      SNAPSHOT_TEST_CASES.forEach((testCase) => {
        it(`should render: ${testCase.name}`, () => {
          const props = createProps(testCase.props);
          const tree = TestRenderer
            .create(<CalendarDay {...props}/>)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });

      it('should handle click', () => {
        const props = createProps({
          onClick: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('click', new Event('click'));
        const expectedDate = props.date.toDate();
        expect(props.onClick).toBeCalledTimes(1);
        expect(props.onClick).toBeCalledWith(expectedDate, expect.anything());
      });

      it('should handle click (no event attached)', () => {
        const props = createProps();
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('click', new Event('click'));
      });

      it('should handle mouse enter', () => {
        const props = createProps({
          onMouseEnter: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseenter', new Event('mouseenter'));
        const expectedDate = props.date.toDate();
        expect(props.onMouseEnter).toBeCalledTimes(1);
        expect(props.onMouseEnter).toBeCalledWith(expectedDate, expect.anything());
      });

      it('should handle mouse enter (no event attached)', () => {
        const props = createProps();
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseenter', new Event('mouseenter'));
      });

      it('should handle mouse leave', () => {
        const props = createProps({
          onMouseLeave: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseleave', new Event('mouseleave'));
        const expectedDate = props.date.toDate();
        expect(props.onMouseLeave).toBeCalledTimes(1);
        expect(props.onMouseLeave).toBeCalledWith(expectedDate, expect.anything());
      });

      it('should handle mouse leave (no event attached)', () => {
        const props = createProps();
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseleave', new Event('mouseleave'));
      });

      it('should not call click on disabled day', () => {
        const props = createProps({
          isDisabled: true,
          onClick: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('click', new Event('click'));
        expect(props.onClick).toBeCalledTimes(0);
      });

      it('should not call mouse enter on disabled day', () => {
        const props = createProps({
          isDisabled: true,
          onMouseEnter: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseenter', new Event('mouseenter'));
        expect(props.onMouseEnter).toBeCalledTimes(0);
      });

      it('should not call mouse leave on disabled day', () => {
        const props = createProps({
          isDisabled: true,
          onMouseLeave: jest.fn(),
        });
        enzyme
          .shallow(<CalendarDay {...props}/>)
          .simulate('mouseleave', new Event('mouseleave'));
        expect(props.onMouseLeave).toBeCalledTimes(0);
      });
    });
  });
});
