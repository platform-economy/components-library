import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Chart } from '../';
import { Line } from '../../Line';
import { XAxis } from '../../XAxis';
import { YAxis } from '../../YAxis';
import { timeTicks } from '../../../timeUtils';

enzyme.configure({ adapter: new Adapter() });

jest.mock('d3-time', () => ({
  ...jest.requireActual('d3-time'),
  timeSecond: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - date.getMilliseconds());
    return dat;
  },
  timeMinute: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - date.getSeconds());
    return dat;
  },
  timeHour: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - date.getMinutes());
    return dat;
  },
  timeDay: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - date.getUTCHours());
    return dat;
  },
  timeMonth: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - (date.getUTCDate() - 1));
    return dat;
  },
  timeYear: (date: Date) => {
    const dat = new Date(date);
    dat.setTime(date.getTime() - date.getMonth());
    return dat;
  },
}));

jest.mock('d3-time-format', () => ({
  timeFormat: (format: string) => (date: Date) => {
    switch (format) {
      case '.%L':
        const ms = date.getMilliseconds();
        return `.${ms < 10 ? '00' : (ms < 100 ? '0' : '')}${ms}`;
      case ':%S':
        const s = date.getSeconds();
        return `:${s < 10 ? '0' : ''}${s}`;
      case '%I:%M %p':
        const isPM = date.getUTCHours() > 12;
        const m = date.getMinutes();
        const h = isPM ? date.getUTCHours() / 2 : date.getUTCHours() || 12;
        return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m} ${isPM ? 'PM' : 'AM'}`;
      case '%a %d':
        return `Sun ${date.toLocaleString('en-US', { day: '2-digit' })}`;
      case '%b %d':
        return date.toLocaleString('en-US', { month: 'short', day: '2-digit' });
      case '%Y':
        return date.getFullYear().toString();
      default:
        return date.toLocaleString();
    }
  },
}));

const data = {
  name1: [
    {
      x: 0,
      y: 1,
    },
    {
      x: 1,
      y: 2,
    },
    {
      x: 2,
      y: 3,
    },
  ],
  name2: [
    {
      x: 0,
      y: 3,
    },
    {
      x: 1,
      y: 3,
    },
    {
      x: 2,
      y: 2,
    },
  ],
};

describe('ui-elements-charts', () => {
  describe('Components', () => {
    describe('Chart', () => {
      it('Renders chart', () => {
        const wrapper = enzyme.mount(
          <Chart
            data={data}
            width={800}
            height={600}
          >
            <YAxis name="yaxis" scale="linear" />
            <XAxis name="xaxis" scale="linear" />
            <Line name="name1" color="#0045FF" axisX="xaxis" axisY="yaxis" />
            <Line name="name2" color="#FF4500" axisX="xaxis" axisY="yaxis" />
          </Chart >);

        expect(wrapper.html()).toMatchSnapshot();
      });

      it('Rerenders chart after receive new data', async () => {
        const newData = {
          name1: [
            {
              x: 0,
              y: 3,
            },
            {
              x: 1,
              y: 2,
            },
            {
              x: 2,
              y: 1,
            },
          ],
          name2: [
            {
              x: 0,
              y: 1,
            },
            {
              x: 1,
              y: 1,
            },
            {
              x: 2,
              y: 3,
            },
          ],
        };

        const wrapper = enzyme.mount(
          <Chart
            data={data}
            width={800}
            height={600}
          >
            <YAxis name="yaxis" scale="linear" />
            <XAxis name="xaxis" scale="time" />
            <YAxis name="yaxis2" scale="linear" domain={[0, 5]} />
            <XAxis name="xaxis2" scale="time" domain={[0, 5]} />
            <Line name="name1" color="#4500FF" axisX="xaxis" axisY="yaxis" />
            <Line name="name2" color="#FF0045" axisX="xaxis2" axisY="yaxis2" />
          </Chart >,
        );

        expect(wrapper.html()).toMatchSnapshot();
        wrapper.setProps({ data: newData });
        await new Promise(resolve => setTimeout(resolve, 500));
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('Changes SVG dimensions', () => {
        const wrapper = enzyme.mount(<Chart data={{}} width={0} height={0} />);

        expect(wrapper.html()).toMatchSnapshot();
        wrapper.setProps({ width: 1, height: 1 });
        expect(wrapper.html()).toMatchSnapshot();
      });

      it('Context has default values', () => {
        const wrapper = enzyme.mount(
          <Line name="name1" color="#4500FF" axisX="xaxis" axisY="yaxis" />,
        );

        expect(wrapper.childAt(0).prop('registerAxis')()).toBe(null);
        expect(wrapper.childAt(0).prop('registerComponent')()).toBe(null);
        expect(wrapper.childAt(0).prop('unregisterAxis')()).toBe(null);
        expect(wrapper.childAt(0).prop('unregisterComponent')()).toBe(null);
      });

      it('TimeTicks returns valid date', () => {
        expect(timeTicks(new Date(Date.UTC(2000, 0, 0, 0, 0, 0, 200)))).toBe('.200');
        expect(timeTicks(new Date(Date.UTC(2000, 0, 0, 0, 0, 2)))).toBe(':02');
        expect(timeTicks(new Date(Date.UTC(2000, 0, 0, 0, 2)))).toBe('12:02 AM');
        expect(timeTicks(new Date(Date.UTC(2000, 0, 1, 2)))).toBe('02:00 AM');
        expect(timeTicks(new Date(Date.UTC(2000, 0, 2)))).toBe('Sun 02');
        expect(timeTicks(new Date(Date.UTC(2000, 2)))).toBe('Mar 01');
        expect(timeTicks(new Date(Date.UTC(2000, 0)))).toBe('2000');
      });
    });
  });
});
