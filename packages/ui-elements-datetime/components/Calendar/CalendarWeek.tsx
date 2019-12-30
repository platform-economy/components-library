import * as React from 'react';
import classnames from 'classnames';

export type CalendarWeekProps = {
  weekNumber: number;
  isCurrent: boolean;
};

export class CalendarWeek extends React.Component<CalendarWeekProps> {
  render() {
    const { isCurrent, children } = this.props;
    return (
      <tr
        className={classnames('CalendarWeek', {
          current: isCurrent,
        })}
      >
        {children}
      </tr>
    );
  }
}
