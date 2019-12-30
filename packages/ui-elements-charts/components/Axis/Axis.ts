import { Component } from 'react';
import * as d3 from 'd3';
import { withChartContext, ChartContextType } from '../Chart';
import { timeTicks } from '../../timeUtils';
import { AXIS_MARGIN, AXIS_WIDTH } from '../../constants';
import { D3Selection, D3ScaleLinear, D3ScaleTime, D3Axis } from '../../d3types';

export type AxisProps = {
  direction: 'x' | 'y'
  name: string,
  scale: 'linear' | 'time',
  domain?: [number, number],
};

type AxisComposedProps = AxisProps & ChartContextType;

export class AxisPure extends Component<AxisComposedProps, {}> {
  private axisSelection: D3Selection;
  private scale: D3ScaleLinear | D3ScaleTime;
  private axis: D3Axis;

  constructor(props: AxisComposedProps) {
    super(props);

    this.setScale();
  }

  private setScale() {
    this.scale = this.props.scale === 'time' ? d3.scaleTime() : d3.scaleLinear();
  }

  private setDomain(domain: [number, number]) {
    const { svgDimensions, axisCount, direction } = this.props;
    if (direction === 'x') {
      this.scale.domain(domain);
      this.scale.range([
        AXIS_MARGIN,
        svgDimensions.width - axisCount.y * AXIS_WIDTH - AXIS_MARGIN,
      ]);
    } else {
      this.scale.domain(domain);
      this.scale.range([
        svgDimensions.height - axisCount.x * AXIS_WIDTH - AXIS_MARGIN,
        AXIS_MARGIN,
      ]);
    }
  }

  private translate() {
    const { svgDimensions, direction, axisCount, axisPositions, name } = this.props;
    let value = '';

    if (!axisPositions) {
      return value ;
    }

    if (direction === 'x') {
      if (axisPositions[name] % 2) {
        value = `${
          Math.ceil(axisCount.y / 2) * AXIS_WIDTH}px, ${
            svgDimensions.height - Math.ceil(axisPositions[name] / 2)
            * AXIS_WIDTH - AXIS_MARGIN}px`;
      } else {
        value = `${
          Math.ceil(axisCount.y / 2) * AXIS_WIDTH}px, ${
          Math.floor(axisCount.x / 2) * AXIS_WIDTH + AXIS_MARGIN}px`;
      }
    } else {
      if (axisPositions[name] % 2) {
        value = `${
          Math.ceil(axisPositions[name] / 2) * AXIS_WIDTH + AXIS_MARGIN}px, ${
          Math.floor(axisCount.x / 2) * AXIS_WIDTH}px`;
      } else {
        value = `${
          svgDimensions.width - axisPositions[name] / 2 * AXIS_WIDTH - AXIS_MARGIN}px, ${
          Math.floor(axisCount.x / 2) * AXIS_WIDTH}px`;
      }
    }
    return value;
  }

  private createAxis() {
    const { svgSelection, axisPositions, name, direction } = this.props;

    if (!axisPositions || !svgSelection) {
      return;
    }

    this.axis = direction === 'x'
      ? axisPositions[name] % 2
        ? d3.axisBottom(this.scale)
        : d3.axisTop(this.scale)
      : axisPositions[name] % 2
        ? d3.axisLeft(this.scale)
        : d3.axisRight(this.scale);

    this.axis.tickSizeOuter(0)
      .tickPadding(4);

    if (this.props.scale === 'time') {
      this.axis.tickFormat(timeTicks);
    }

    this.axisSelection = svgSelection.append('g')
      .call(this.axis);

    if (direction === 'x') {
      this.axisSelection.classed('xAxis', true);
    } else {
      this.axisSelection.classed('yAxis', true);
    }

    this.axisSelection.style(
      'transform',
      `translate(${this.translate()})`,
    );
  }

  private updateAxis() {
    const { svgSelection, axisPositions, name, direction } = this.props;

    if (!axisPositions || !svgSelection) {
      return;
    }

    this.axis = direction === 'x'
      ? axisPositions[name] % 2
        ? d3.axisBottom(this.scale)
        : d3.axisTop(this.scale)
      : axisPositions[name] % 2
        ? d3.axisLeft(this.scale)
        : d3.axisRight(this.scale);

    this.axis.tickSizeOuter(0)
      .tickPadding(4);

    if (this.props.scale === 'time') {
      this.axis.tickFormat(timeTicks);
    }

    this.axisSelection.transition()
      .call(this.axis.bind(this));

    if (direction === 'x') {
      this.axisSelection.classed('xAxis', true);
    } else {
      this.axisSelection.classed('yAxis', true);
    }

    this.axisSelection.style(
      'transform',
      `translate(${this.translate()})`,
    );
  }

  componentDidMount() {
    const { name, registerAxis, domain, direction } = this.props;

    registerAxis({
      name,
      direction,
      userDomain: domain,
      passDomain: (computedDomain) => {
        this.setDomain(computedDomain);
        this.axisSelection
          ? this.updateAxis()
          : this.createAxis();
      },
    });
  }

  componentDidUpdate(prevProps: AxisComposedProps) {
    if (prevProps.scale !== this.props.scale) {
      this.setScale();
    }
    if (this.axisSelection) {
      this.updateAxis();
    }
  }

  componentWillUnmount() {
    const { unregisterAxis, name } = this.props;

    if (this.axisSelection) {
      this.axisSelection.remove();
    }
    unregisterAxis(name);
  }

  render() {
    return null;
  }
}

export const Axis = withChartContext(AxisPure);
