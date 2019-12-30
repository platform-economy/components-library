import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { number, color } from '@storybook/addon-knobs';

import { Chart } from './Chart';
import { Line } from '../Line';
import { XAxis } from '../XAxis';
import { YAxis } from '../YAxis';

const example1Info = `
**description or documentation about Chart component**

*supports markdown*

~~~js
<Chart />
~~~
`;

storiesOf('ui-elements-charts/Chart', module)
  .addParameters({
    info: example1Info,
  })
  .add('Line chart', () => (
    <Chart
      data={data}
      width={number('Width', 800)}
      height={number('Height', 600)}
    >
      <YAxis name="yaxis1" scale="linear" />
      <XAxis name="xaxis1" scale="linear" />
      <Line
        name="name1"
        color={color('Color', '#FF4500')}
        axisX="xaxis1"
        axisY="yaxis1"
      />
    </Chart >
  ))
  .add('Multiline chart', () => (
    <Chart
      data={multiData}
      width={number('Width', 800)}
      height={number('Height', 600)}
    >
      <YAxis name="yaxis1" scale="linear" />
      <XAxis name="xaxis1" scale="linear" />
      <Line
        name="name1"
        color={color('Color 1', '#FF4500')}
        axisX="xaxis1"
        axisY="yaxis1"
      />
      <Line
        name="name2"
        color={color('Color 2', '#4682B4')}
        axisX="xaxis1"
        axisY="yaxis1"
      />
      <Line
        name="name3"
        color={color('Color 3', '#3CB371')}
        axisX="xaxis1"
        axisY="yaxis1"
      />
    </Chart>
  ))
  .add('Dynamic line chart', () => (
    <ChartWrapper />
  ));

const data = {
  name1: [
    {
      x: 0,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 1,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 2,
      y: Math.floor(Math.random() * 50),
    },
  ],
};

const multiData = {
  name1: [
    {
      x: 0,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 1,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 2,
      y: Math.floor(Math.random() * 50),
    },
  ],
  name2: [
    {
      x: 0,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 1,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 2,
      y: Math.floor(Math.random() * 50),
    },
  ],
  name3: [
    {
      x: 0,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 1,
      y: Math.floor(Math.random() * 50),
    },
    {
      x: 2,
      y: Math.floor(Math.random() * 50),
    },
  ],
};

class ChartWrapper extends Component {
  state = {
    timerId: undefined,
    i: 2,
    data: {
      name1: [
        {
          x: 0,
          y: Math.floor(Math.random() * 50),
        },
        {
          x: 1,
          y: Math.floor(Math.random() * 50),
        },
      ],
      name2: [
        {
          x: 0,
          y: Math.floor(Math.random() * 50),
        },
        {
          x: 1,
          y: Math.floor(Math.random() * 50),
        },
      ],
    },
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      timerId: setInterval(
        () => {
          const { i, data } = this.state;

          data.name1.push({ x: i, y: Math.floor(Math.random() * 50) });
          data.name2.push({ x: i, y: Math.floor(Math.random() * 50) });

          if (data.name1.length > 15) {
            data.name1.shift();
            data.name2.shift();
          }

          this.setState({
            data,
            i: i + 1,
          });
        },
        1000,
      ),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    const { data } = this.state;

    return (
      <Chart
        data={data}
        width={800}
        height={600}
      >
        <YAxis name="yaxis1" scale="linear" />
        <XAxis name="xaxis1" scale="linear" />
        <Line
          name="name1"
          color={color('Color 1', '#FF4500')}
          axisX="xaxis1"
          axisY="yaxis1"
        />
        <Line
          name="name2"
          color={color('Color 2', '#4682B4')}
          axisX="xaxis1"
          axisY="yaxis1"
        />
      </Chart >
    );
  }
}
