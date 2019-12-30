import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import moment from 'moment';
import { CalendarMonth } from './CalendarMonth';
import { noop, upperFirst } from 'lodash';
import { SelectedRange } from './types';

export type CalendarProps = {
  className?: string;
  currentDate?: Date;
  minCurrentDate?: Date;
  maxCurrentDate?: Date;
  locale?: string;
  selectedDate?: Date;
  selectedRange?: SelectedRange;
  displayAdjacentDays?: boolean;
  previousYearIcon?: React.ReactNode|React.ReactNode[];
  previousMonthIcon?: React.ReactNode|React.ReactNode[];
  nextYearIcon?: React.ReactNode|React.ReactNode[];
  nextMonthIcon?: React.ReactNode|React.ReactNode[];
  onDayClick?: (date: Date, ev: React.SyntheticEvent) => void;
  onDayMouseEnter?: (date: Date, ev: React.SyntheticEvent) => void;
  onDayMouseLeave?: (date: Date, ev: React.SyntheticEvent) => void;
  onPreviousMonth?: (nextDate: Date, ev: React.SyntheticEvent) => void;
  onNextMonth?: (nextDate: Date, ev: React.SyntheticEvent) => void;
  onPreviousYear?: (nextDate: Date, ev: React.SyntheticEvent) => void;
  onNextYear?: (nextDate: Date, ev: React.SyntheticEvent) => void;
  onCurrentDateChanged?: (nextDate: Date, ev: React.SyntheticEvent) => void;
  isDateDisabled?: (date: Date) => boolean;
};

class CalendarPure extends React.Component<CalendarProps> {
  get currentDate() {
    const { locale } = this.props;
    const currentDate = moment(this.props.currentDate);
    if (locale) {
      currentDate.locale(locale);
    }
    return currentDate;
  }

  get previousYear() {
    return this.currentDate.clone().subtract(1, 'year');
  }

  get previousMonth() {
    return this.currentDate.clone().subtract(1, 'month');
  }

  get nextYear() {
    return this.currentDate.clone().add(1, 'year');
  }

  get nextMonth() {
    return this.currentDate.clone().add(1, 'month');
  }

  private get canOpenPreviousYear() {
    const { minCurrentDate } = this.props;
    return minCurrentDate == null || this.previousYear.isSameOrAfter(minCurrentDate, 'months');
  }

  private get canOpenPreviousMonth() {
    const { minCurrentDate } = this.props;
    return minCurrentDate == null || this.previousMonth.isSameOrAfter(minCurrentDate, 'months');
  }

  private get canOpenNextYear() {
    const { maxCurrentDate } = this.props;
    return maxCurrentDate == null || this.nextYear.isSameOrBefore(maxCurrentDate, 'months');
  }

  private get canOpenNextMonth() {
    const { maxCurrentDate } = this.props;
    return maxCurrentDate == null || this.nextMonth.isSameOrBefore(maxCurrentDate, 'months');
  }

  private isCurrentDateAllowed(date: moment.Moment) {
    const { minCurrentDate, maxCurrentDate } = this.props;
    return (
      (minCurrentDate == null || date.isSameOrAfter(minCurrentDate, 'days')) &&
      (maxCurrentDate == null || date.isSameOrBefore(maxCurrentDate, 'days'))
    );
  }

  private coerceCurrentDate(date: moment.Moment) {
    const { minCurrentDate, maxCurrentDate } = this.props;
    if (minCurrentDate && date.isBefore(minCurrentDate)) {
      return moment(minCurrentDate);
    }
    if (maxCurrentDate && date.isAfter(maxCurrentDate)) {
      return moment(maxCurrentDate);
    }
    return date;
  }

  private handleDayClick = (date: Date, ev: React.SyntheticEvent) => {
    const { onDayClick = noop, onCurrentDateChanged = noop } = this.props;
    onDayClick(date, ev);
    const momentDate = moment(date);
    if (this.isCurrentDateAllowed(momentDate)) {
      onCurrentDateChanged(this.coerceCurrentDate(momentDate).toDate(), ev);
    }
  }

  private handlePreviousYear = (ev: React.SyntheticEvent) => {
    const { onPreviousYear = noop, onCurrentDateChanged = noop } = this.props;
    if (!this.canOpenPreviousYear) {
      return;
    }
    const nextDate = this.coerceCurrentDate(this.currentDate.clone().subtract(1, 'year'));
    onPreviousYear(nextDate.toDate(), ev);
    onCurrentDateChanged(nextDate.toDate(), ev);
  }

  private handleNextYear = (ev: React.SyntheticEvent) => {
    const { onNextYear = noop, onCurrentDateChanged = noop } = this.props;
    if (!this.canOpenNextYear) {
      return;
    }
    const nextDate = this.coerceCurrentDate(this.currentDate.clone().add(1, 'year'));
    onNextYear(nextDate.toDate(), ev);
    onCurrentDateChanged(nextDate.toDate(), ev);
  }

  private handlePreviousMonth = (ev: React.SyntheticEvent) => {
    const { onPreviousMonth = noop, onCurrentDateChanged = noop } = this.props;
    if (!this.canOpenPreviousMonth) {
      return;
    }
    const nextDate = this.coerceCurrentDate(this.currentDate.clone().subtract(1, 'month'));
    onPreviousMonth(nextDate.toDate(), ev);
    onCurrentDateChanged(nextDate.toDate(), ev);
  }

  private handleNextMonth = (ev: React.SyntheticEvent) => {
    const { onNextMonth = noop, onCurrentDateChanged = noop } = this.props;
    if (!this.canOpenNextMonth) {
      return;
    }
    const nextDate = this.coerceCurrentDate(this.currentDate.clone().add(1, 'month'));
    onNextMonth(nextDate.toDate(), ev);
    onCurrentDateChanged(nextDate.toDate(), ev);
  }

  render() {
    const {
      className,
      selectedDate,
      selectedRange,
      isDateDisabled,
      onDayMouseEnter,
      onDayMouseLeave,
      previousYearIcon,
      previousMonthIcon,
      nextMonthIcon,
      nextYearIcon,
      displayAdjacentDays,
    } = this.props;

    return (
      <div className={classnames('Calendar', className)}>
        <div className="navigation">
          <div
            className={classnames('navigation-btn', 'previous-year', {
              disabled: !this.canOpenPreviousYear,
            })}
            onClick={this.handlePreviousYear}
          >
            {previousYearIcon || (<React.Fragment>&lt;&lt;</React.Fragment>)}
          </div>
          <div
            className={classnames('navigation-btn', 'previous-month', {
              disabled: !this.canOpenPreviousMonth,
            })}
            onClick={this.handlePreviousMonth}
          >
            {previousMonthIcon || (<React.Fragment>&lt;</React.Fragment>)}
          </div>
          <div className="current-month">
            {upperFirst(this.currentDate.format('MMMM YYYY'))}
            </div>
          <div
            className={classnames('navigation-btn', 'next-month', {
              disabled: !this.canOpenNextMonth,
            })}
            onClick={this.handleNextMonth}
          >
            {nextMonthIcon || (<React.Fragment>&gt;</React.Fragment>)}
          </div>
          <div
            className={classnames('navigation-btn', 'next-year', {
              disabled: !this.canOpenNextYear,
            })}
            onClick={this.handleNextYear}
          >
            {nextYearIcon || (<React.Fragment>&gt;&gt;</React.Fragment>)}
          </div>
        </div>
        <CalendarMonth
          currentDate={this.currentDate}
          selectedDate={selectedDate}
          selectedRange={selectedRange}
          displayAdjacentDays={displayAdjacentDays}
          isDateDisabled={isDateDisabled}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={onDayMouseEnter}
          onDayMouseLeave={onDayMouseLeave}
        />
      </div>
    );
  }
}

const CELL_SIZE = '2em';

export const Calendar = styled(CalendarPure)`
  background-color: ${props => props.theme.palette.surface};
  color: ${props => props.theme.palette.text};
  padding: 1em;
  user-select: none;

  .navigation {
    display: flex;
    margin-bottom: 1em;

    > div {
      display: inline-block;
    }

    .navigation-btn {
      cursor: pointer;
      flex: 0 0 auto;
    }

    .navigation-btn.disabled {
      cursor: default;
      color: ${props => props.theme.palette.inactive};
    }

    .previous-year, .previous-month {
      text-align: left;
      padding-right: 0.5em;
    }

    .next-year, .next-month {
      text-align: right;
      padding-left: 0.5em;
    }

    .current-month {
      text-align: center;
      flex: 1 1 auto;
      font-weight: 700;
      font-size: 1.1em;
    }
  }

  .CalendarMonth {
    margin: auto;
    border-spacing: 0px 5px;

    td {
      width: ${CELL_SIZE};
      height: ${CELL_SIZE};
      text-align: center;
      font-weight: 400;
    }
  }


  .day {
    background-color: ${props => props.theme.palette.surface};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.palette.hovered};
    }

    &.disabled {
      color: ${props => props.theme.palette.inactive};
      cursor: not-allowed;
    }

    &.other-month {
      color: ${props => props.theme.palette.inactive};
    }

    &.disabled:hover {
      background-color: ${props => props.theme.palette.surface};
    }

    &.selected {
      background-color: ${props => props.theme.palette.active};
      font-weight: 700;
    }

    &.selected:hover {
      background-color: ${props => props.theme.palette.active_hovered};
    }

    &.selection-single {
      border-radius: ${CELL_SIZE};
    }

    &.selection-start {
      border-top-left-radius: ${CELL_SIZE};
      border-bottom-left-radius: ${CELL_SIZE};
    }
    &.selection-end {
      border-top-right-radius: ${CELL_SIZE};
      border-bottom-right-radius: ${CELL_SIZE};
    }
  }


`;
