import { Component } from 'react';
import * as d3 from 'd3';
import { withChartContext, ChartContextType } from '../Chart';
import { AXIS_MARGIN, AXIS_WIDTH } from '../../constants';
import { D3Selection } from '../../d3types';

import { Value } from '../../types';

export type LineProps = {
  name: string,
  color: string,
  axisX: string,
  axisY: string,
};

export type LineAllProps = LineProps & ChartContextType;

export class LinePure extends Component<LineAllProps, {}> {
  lineSelection: D3Selection;
  xScale = d3.scaleLinear();
  yScale = d3.scaleLinear();
  line = d3.line<Value>().defined(d => !isNaN(d.y))
    .x(d => this.xScale(d.x))
    .y(d => this.yScale(d.y));

  setDomain(domainX: [number, number], domainY: [number, number]) {
    const { svgDimensions, axisCount } = this.props;

    this.xScale.domain(domainX)
      .range([
        Math.ceil(axisCount.y / 2) * AXIS_WIDTH + AXIS_MARGIN,
        svgDimensions.width - Math.floor(axisCount.y / 2) * AXIS_WIDTH - AXIS_MARGIN,
      ]);
    this.yScale.domain(domainY)
      .range([
        svgDimensions.height - Math.ceil(axisCount.x / 2) * AXIS_WIDTH - AXIS_MARGIN,
        Math.floor(axisCount.x / 2) * AXIS_WIDTH + AXIS_MARGIN,
      ]);
  }

  createLine() {
    const { svgSelection, color, data, name } = this.props;

    if (!svgSelection) {
      return;
    }

    const values = data[name];

    this.lineSelection = svgSelection.append('g')
      .classed('line', true);

    this.lineSelection.append('path')
      .style('stroke', color)
      .attr('d', () => this.line(values));

    this.lineSelection.selectAll('circle')
      .data(values)
      .enter().append('circle')
      .style('fill', color)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', 2.5);
  }

  updateLine() {
    const { svgSelection, color, data, name } = this.props;

    if (!svgSelection) {
      return;
    }

    const values = data[name];

    this.lineSelection.select('path')
      .transition()
      .style('stroke', color)
      .attr('d', () => this.line(values));

    const circleSelection = this.lineSelection.selectAll('circle')
      .data(values);

    circleSelection.transition()
      .style('fill', color)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y));

    circleSelection.enter()
      .append('circle')
      .style('fill', color)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .attr('r', 2.5);

    circleSelection.exit()
      .remove();
  }

  componentDidMount() {
    const { name, axisX, axisY, registerComponent } = this.props;

    registerComponent({
      name,
      axes: { x: axisX, y: axisY },
      passDomains: (domainX, domainY) => {
        this.setDomain(domainX, domainY);
        this.lineSelection
          ? this.updateLine()
          : this.createLine();
      },
    });
  }

  componentDidUpdate() {
    if (this.lineSelection) {
      this.updateLine();
    }
  }

  componentWillUnmount() {
    const { unregisterComponent, name } = this.props;

    if (this.lineSelection) {
      this.lineSelection.remove();
    }
    unregisterComponent(name);
  }

  render() {
    return null;
  }
}

export const Line = withChartContext(LinePure);
