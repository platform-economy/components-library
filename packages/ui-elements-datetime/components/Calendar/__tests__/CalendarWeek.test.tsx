import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { CalendarWeek } from '../CalendarWeek';

describe('ui-elements-datetime', () => {
  describe('Components', () => {
    describe('CalendarDay', () => {
      [false, true].forEach((isCurrent) => {
        it(`should render: isCurrent=${isCurrent}`, () => {
          const tree = TestRenderer
            .create(<CalendarWeek weekNumber={1} isCurrent={isCurrent}/>)
            .toJSON();
          expect(tree).toMatchSnapshot();
        });
      });
    });
  });
});
