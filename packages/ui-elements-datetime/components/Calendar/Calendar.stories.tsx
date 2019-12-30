import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, date, select } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';
import moment from 'moment';
import { noop } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faBackward,
  faForward,
} from '@fortawesome/free-solid-svg-icons';

import { Calendar, CalendarProps } from './Calendar';

library.add(
  faCaretLeft,
  faCaretRight,
  faBackward,
  faForward,
);

/* ------------------------------ UTILITIES ----------------------------------------------------- */

const now = new Date();
const actionWithData = decorateAction([([data]) => [data]]);
const isDateInFuture = (date: Date) => moment(date).isAfter(moment.now(), 'day');
type Omit<T1 extends {}, T2 extends keyof T1> = Pick<T1, Exclude<keyof T1, T2>>;

/* ------------------------------ HELPER COMPONENTS --------------------------------------------- */

// Stated wrapper for Calendar

type CalendarWrapperProps = Omit<CalendarProps, 'currentDate'>;
type CalendarWrapperState = {
  currentDate: Date,
};
class CalendarWrapper extends React.Component<CalendarWrapperProps, CalendarWrapperState> {
  constructor(props: CalendarWrapperProps) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  handleCurrentDateChanged = (currentDate: Date, ev: React.SyntheticEvent) => {
    const { onCurrentDateChanged = noop } = this.props;
    this.setState({ currentDate });
    onCurrentDateChanged(currentDate, ev);
  }

  render() {
    return (
      <Calendar
        {...this.props}
        currentDate={this.state.currentDate}
        onCurrentDateChanged={this.handleCurrentDateChanged}
      />
    );
  }
}

// Wrapper for two calendars

type TwoCalendarsWrapperProps = Omit<CalendarProps,
  'currentDate'|'maxCurrentDate'|'minCurrentDate'
>;
type TwoCalendarsWrapperState = {
  leftCurrentDate: Date,
  rightCurrentDate: Date,
};
class TwoCalendarsWrapper extends React.Component<
  TwoCalendarsWrapperProps,
  TwoCalendarsWrapperState
> {
  constructor(props: TwoCalendarsWrapperProps) {
    super(props);
    this.state = {
      leftCurrentDate: new Date(),
      rightCurrentDate: new Date(),
    };
  }

  handleLeftCurrentDateChanged = (leftCurrentDate: Date, ev: React.SyntheticEvent) => {
    const { onCurrentDateChanged = noop } = this.props;
    this.setState({ leftCurrentDate });
    onCurrentDateChanged(leftCurrentDate, ev);
  }

  handleRightCurrentDateChanged = (rightCurrentDate: Date, ev: React.SyntheticEvent) => {
    const { onCurrentDateChanged = noop } = this.props;
    this.setState({ rightCurrentDate });
    onCurrentDateChanged(rightCurrentDate, ev);
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Calendar
          {...this.props}
          currentDate={this.state.leftCurrentDate}
          maxCurrentDate={this.state.rightCurrentDate}
          onCurrentDateChanged={this.handleLeftCurrentDateChanged}
        />
        <Calendar
          {...this.props}
          currentDate={this.state.rightCurrentDate}
          minCurrentDate={this.state.leftCurrentDate}
          onCurrentDateChanged={this.handleRightCurrentDateChanged}
        />
      </div>
    );
  }
}

// Icons

const previousYearIcon = [
  <FontAwesomeIcon key="1" icon="caret-left"/>,
  <FontAwesomeIcon key="2" icon="caret-left"/>,
];
const previousMonthIcon = (<FontAwesomeIcon icon="caret-left"/>);
const nextMonthIcon = (<FontAwesomeIcon icon="caret-right"/>);
const nextYearIcon = [
  <FontAwesomeIcon key="1" icon="caret-right"/>,
  <FontAwesomeIcon key="2" icon="caret-right"/>,
];

/* ------------------------------ STORIES ------------------------------------------------------- */

storiesOf('ui-elements-datetime/Calendar', module)
  .add('default (stateless)', () => (
    <Calendar
      currentDate={date('Current date', now)}
      locale={select('Locale', { pl: 'pl', en: 'en' }, 'en')}
      displayAdjacentDays={boolean('Display adjacent days', false)}
      previousYearIcon={previousYearIcon}
      previousMonthIcon={previousMonthIcon}
      nextMonthIcon={nextMonthIcon}
      nextYearIcon={nextYearIcon}
      onDayClick={actionWithData('onDayClick')}
      onDayMouseEnter={actionWithData('onDayMouseEnter')}
      onDayMouseLeave={actionWithData('onDayMouseLeave')}
      onCurrentDateChanged={actionWithData('onCurrentDateChanged')}
      onPreviousYear={actionWithData('onPreviousYear')}
      onPreviousMonth={actionWithData('onPreviousMonth')}
      onNextMonth={actionWithData('onNextMonth')}
      onNextYear={actionWithData('onNextYear')}
    />
  ))
  .add('with single selection', () => (
    <CalendarWrapper
      locale={select('Locale', { pl: 'pl', en: 'en' }, 'en')}
      selectedDate={date('Selected Date', now)}
      displayAdjacentDays={boolean('Display adjacent days', false)}
      previousYearIcon={previousYearIcon}
      previousMonthIcon={previousMonthIcon}
      nextMonthIcon={nextMonthIcon}
      nextYearIcon={nextYearIcon}
      onDayClick={actionWithData('onDayClick')}
      onCurrentDateChanged={actionWithData('onCurrentDateChanged')}
      onPreviousYear={actionWithData('onPreviousYear')}
      onPreviousMonth={actionWithData('onPreviousMonth')}
      onNextMonth={actionWithData('onNextMonth')}
      onNextYear={actionWithData('onNextYear')}
      isDateDisabled={boolean('Disable future days', false) ? isDateInFuture : undefined}
    />
  ))
  .add('with range selection', () => (
    <CalendarWrapper
      locale={select('Locale', { pl: 'pl', en: 'en' }, 'en')}
      selectedRange={{
        from: boolean('Set Selected Range Start', true)
          ? date('Selected Range Start', now)
          : null,
        to: boolean('Set Selected Range End', true)
          ? date('Selected Range End', now)
          : null,
        highlightFrom: boolean('Highlight Start', true),
        highlightTo: boolean('Highlight End', true),
      }}
      displayAdjacentDays={boolean('Display adjacent days', false)}
      previousYearIcon={previousYearIcon}
      previousMonthIcon={previousMonthIcon}
      nextMonthIcon={nextMonthIcon}
      nextYearIcon={nextYearIcon}
      onDayClick={actionWithData('onDayClick')}
      onCurrentDateChanged={actionWithData('onCurrentDateChanged')}
      onPreviousYear={actionWithData('onPreviousYear')}
      onPreviousMonth={actionWithData('onPreviousMonth')}
      onNextMonth={actionWithData('onNextMonth')}
      onNextYear={actionWithData('onNextYear')}
      isDateDisabled={boolean('Disable future days', false) ? isDateInFuture : undefined}
    />
  ))
  .add('two calendars with range selection', () => (
    <TwoCalendarsWrapper
      locale={select('Locale', { pl: 'pl', en: 'en' }, 'en')}
      selectedRange={{
        from: date('Selected Range Start', now),
        to: date('Selected Range End', now),
        highlightFrom: boolean('Highlight Start', true),
        highlightTo: boolean('Highlight End', true),
      }}
      displayAdjacentDays={boolean('Display adjacent days', false)}
      previousYearIcon={previousYearIcon}
      previousMonthIcon={previousMonthIcon}
      nextMonthIcon={nextMonthIcon}
      nextYearIcon={nextYearIcon}
      onDayClick={actionWithData('onDayClick')}
      onCurrentDateChanged={actionWithData('onCurrentDateChanged')}
      onPreviousYear={actionWithData('onPreviousYear')}
      onPreviousMonth={actionWithData('onPreviousMonth')}
      onNextMonth={actionWithData('onNextMonth')}
      onNextYear={actionWithData('onNextYear')}
      isDateDisabled={boolean('Disable future days', false) ? isDateInFuture : undefined}
    />
  ));
