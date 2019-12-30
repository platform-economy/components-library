import * as React from 'react';
import { Moment } from 'moment';
import { noop } from 'lodash';
import { weekDaySymbolicNames } from './Calendar.common';
import classnames from 'classnames';

export type CalendarDayProps = {
  date: Moment;
  isCurrentMonth: boolean;
  isCurrentDay: boolean;
  isSelectedDay: boolean;
  isSelectionStart: boolean;
  isSelectionEnd: boolean;
  isSelectionSpan: boolean;
  isDisabled?: boolean;
  onClick?: (date: Date, ev: React.SyntheticEvent) => void,
  onMouseEnter?: (date: Date, ev: React.SyntheticEvent) => void,
  onMouseLeave?: (date: Date, ev: React.SyntheticEvent) => void,
};

export class CalendarDay extends React.Component<CalendarDayProps> {

  private handleClick = (ev: React.SyntheticEvent) => {
    const { date, onClick = noop, isDisabled } = this.props;
    if (!isDisabled) {
      onClick(date.toDate(), ev);
    }
  }

  private handleMouseEnter = (ev: React.SyntheticEvent) => {
    const { date, onMouseEnter = noop, isDisabled } = this.props;
    if (!isDisabled) {
      onMouseEnter(date.toDate(), ev);
    }
  }

  private handleMouseLeave = (ev: React.SyntheticEvent) => {
    const { date, onMouseLeave = noop, isDisabled } = this.props;
    if (!isDisabled) {
      onMouseLeave(date.toDate(), ev);
    }
  }

  render() {
    const {
      date,
      isCurrentDay,
      isSelectedDay,
      isDisabled,
      isCurrentMonth,
      isSelectionStart,
      isSelectionEnd,
      isSelectionSpan,
    } = this.props;
    const localeData = date.localeData();
    const firstDayOfWeek = localeData.firstDayOfWeek();
    const weekdayIndex = (date.weekday() + firstDayOfWeek) % weekDaySymbolicNames.length;
    const weekdaySymbolicName = weekDaySymbolicNames[weekdayIndex];

    return (
      <td
        className={classnames('CalendarDay', 'day', `day-${weekdaySymbolicName}`, {
          current: isCurrentDay,
          selected: isSelectedDay || isSelectionStart || isSelectionEnd || isSelectionSpan,
          disabled: isDisabled,
          'current-month': isCurrentMonth,
          'other-month': !isCurrentMonth,
          'selection-single': isSelectedDay,
          'selection-start': isSelectionStart,
          'selection-end': isSelectionEnd,
          'selection-span': isSelectionSpan,
        })}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {date.date()}
      </td>
    );
  }
}
