import * as React from 'react';
import moment, { Moment } from 'moment';
import { range, some } from 'lodash';
import { CalendarWeek } from './CalendarWeek';
import { CalendarDay } from './CalendarDay';
import { SelectedRange } from './types';
import { weekDaySymbolicNames } from './Calendar.common';
import classnames from 'classnames';

export type CalendarMonthProps = {
  currentDate: Moment;
  selectedDate?: Date;
  selectedRange?: SelectedRange;
  displayAdjacentDays?: boolean;
  onDayClick?: (date: Date, ev: React.SyntheticEvent) => void;
  onDayMouseEnter?: (date: Date, ev: React.SyntheticEvent) => void;
  onDayMouseLeave?: (date: Date, ev: React.SyntheticEvent) => void;
  isDateDisabled?: (date: Date) => boolean;
};

export class CalendarMonth extends React.Component<CalendarMonthProps> {

  private getWeeks() {
    const { currentDate, selectedDate, selectedRange, isDateDisabled } = this.props;
    const locale = currentDate.localeData();
    const firstDayOfWeek = locale.firstDayOfWeek();
    const month = currentDate.month();
    const firstDay = currentDate.clone().startOf('month');
    const lastDay = currentDate.clone().endOf('month');

    const weeksInYear = firstDay.weeksInYear();

    // weeks are calculated as YEAR * WEEKS_IN_YEAR + WEEK,
    // making range monotonic even on years' boundary
    // later it can be decoded with div and mod.
    const firstWeek = firstDay.weekYear() * weeksInYear + firstDay.week();
    const lastWeek = lastDay.weekYear() * weeksInYear + lastDay.week();

    return range(firstWeek, lastWeek + 1).map((weekWithYear) => {
      const week = weekWithYear % weeksInYear;
      const year = Math.floor(weekWithYear / weeksInYear);

      const days = range(0, 7).map((weekday) => {
        const weekdayIndex = (weekday + firstDayOfWeek) % 7;
        const weekdaySymbolicName = weekDaySymbolicNames[weekdayIndex];
        const date = moment(0)
          .locale(currentDate.locale())
          .year(year)
          .week(week)
          .weekday(weekday)
          .startOf('day');
        const isCurrentMonth = date.month() === month;
        const isCurrentDay = date.isSame(currentDate, 'day');
        const isSelectedDay = selectedDate ? date.isSame(selectedDate, 'day') : false;

        let isSelectionStart = false;
        let isSelectionEnd = false;
        let isSelectionSpan = false;
        if (selectedRange != null) {
          const isDateInSelectedRange =
            (selectedRange.from == null || date.isSameOrAfter(selectedRange.from, 'day')) &&
            (selectedRange.to == null || date.isSameOrBefore(selectedRange.to, 'day'));

          isSelectionStart = isDateInSelectedRange
            && selectedRange.from != null
            && date.isSame(selectedRange.from, 'day')
            && selectedRange.highlightFrom !== false;

          isSelectionEnd = isDateInSelectedRange
            && selectedRange.to != null
            && date.isSame(selectedRange.to, 'day')
            && selectedRange.highlightTo !== false;

          isSelectionSpan = isDateInSelectedRange
            && !isSelectionStart
            && !isSelectionEnd;
        }

        const isDisabled = isDateDisabled ? isDateDisabled(date.toDate()) : false;
        return {
          date,
          weekdaySymbolicName,
          isCurrentMonth,
          isCurrentDay,
          isSelectedDay,
          isSelectionStart,
          isSelectionEnd,
          isSelectionSpan,
          isDisabled,
        };
      });
      const isCurrentWeek = some(days, d => d.isCurrentDay);
      return { week, days, isCurrent: isCurrentWeek };
    });
  }

  private getWeekDays() {
    const { currentDate } = this.props;
    const locale = currentDate.localeData();
    const firstDayOfWeek = locale.firstDayOfWeek();
    const weekdays = locale.weekdaysMin();
    return range(0, 7).map((index) => {
      const weekdayIndex = (index + firstDayOfWeek) % 7;
      const caption = weekdays[weekdayIndex];
      const symbolicName = weekDaySymbolicNames[weekdayIndex];
      const className = classnames(`weekday-header-${symbolicName}`, {
        current: currentDate.weekday() === index,
      });
      return { caption, className, symbolicName };
    });
  }

  render() {
    const { onDayClick, onDayMouseEnter, onDayMouseLeave, displayAdjacentDays } = this.props;

    return (
      <table className="CalendarMonth">
        <thead>
          <tr>
            {this.getWeekDays().map(({ caption, className, symbolicName }) => (
              <th className={className} key={`weekday-header-${symbolicName}`}>{caption}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {this.getWeeks().map(week => (
          <CalendarWeek key={`week-${week.week}`} weekNumber={week.week} isCurrent={week.isCurrent}>
            {week.days.map((day) => {
              if (!day.isCurrentMonth && !displayAdjacentDays) {
                return <td key={`day-${day.date.format('MM-dd')}`}/>;
              }
              return (<CalendarDay
                key={`day-${day.date.format('MM-dd')}`}
                onClick={onDayClick}
                onMouseEnter={onDayMouseEnter}
                onMouseLeave={onDayMouseLeave}
                {...day}
              />);
            })}
          </CalendarWeek>
        ))}
        </tbody>
      </table>
    );
  }
}
