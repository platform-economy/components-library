import * as React from 'react';
import * as d3 from 'd3';
import { forIn } from 'lodash';
import styledComponents from 'styled-components';
import { D3Selection } from '../../d3types';

import {
  ChartContext,
  AssignedAxes,
  PassDomain,
  PassDomains,
  RegisterAxisArgs,
  RegisterComponentArgs,
} from './context';

import { Data, Value } from '../../types';

export type AxisList = {
  [name: string]: {
    direction: 'x' | 'y',
    userDomain: [number, number] | undefined,
    passDomain: PassDomain,
  },
};

export type ComponentList = {
  [name: string]: {
    axes: AssignedAxes,
    passDomains: PassDomains,
  },
};

export type ChartProps = {
  data: Data,
  width: number,
  height: number,
};

export type ChartState = {
  svgSelection?: D3Selection,
};

export const ChartDiv = styledComponents.div`
  .xAxis, .yAxis {
    path {
      stroke-width: 2;
      stroke: #7B7D85;
    }

    line {
      stroke-width: 1;
      stroke: #7B7D85;
    }
  }

  .xAxis, .yAxis {
    text {
      fill: #7B7D85;
    }
  }

  .line {
    clip-path: url(#clip);

    path {
      fill: none;
      stroke-width: 2;
    }
  }
`;

export class Chart extends React.Component<ChartProps, ChartState> {
  divRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
  clipSelection: D3Selection;
  axes: AxisList = {};
  components: ComponentList = {};
  axisPositions?: {
    [name: string]: number,
  };
  axisCount = { x: 0, y: 0 };

  constructor(props: ChartProps) {
    super(props);

    this.state = {
      svgSelection: undefined,
    };

    this.registerAxis = this.registerAxis.bind(this);
    this.registerComponent = this.registerComponent.bind(this);
    this.unregisterAxis = this.unregisterAxis.bind(this);
    this.unregisterComponent = this.unregisterComponent.bind(this);
  }

  registerAxis({
    name,
    direction,
    passDomain,
    userDomain,
  }: RegisterAxisArgs) {
    this.axes[name] = {
      direction,
      userDomain,
      passDomain,
    };
  }

  unregisterAxis(name: string) {
    delete this.axes[name];
  }

  registerComponent({
    name,
    axes,
    passDomains,
  }: RegisterComponentArgs) {
    this.components[name] = {
      axes,
      passDomains,
    };
  }

  unregisterComponent(name: string) {
    delete this.components[name];
  }

  createSVGAndDefs() {
    const { width, height } = this.props;

    const svgSelection = d3.select(this.divRef.current)
      .append('svg')
      .attr('width', `${width}px`)
      .attr('height', `${height}px`);

    this.clipSelection = svgSelection.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', width)
      .attr('height', height);

    this.setState({ svgSelection });
  }

  updateSVG() {
    const { width, height } = this.props;
    const { svgSelection } = this.state;

    if (!svgSelection) {
      return;
    }

    if (width.toString() !== svgSelection.attr('width')) {
      svgSelection.attr('width', width);
    }
    if (height.toString() !== svgSelection.attr('height')) {
      svgSelection.attr('height', height);
    }
  }

  updateDefs() {
    const { width, height } = this.props;

    this.clipSelection.style(
      'transform',
      `translate(${
      Math.ceil(this.axisCount.y / 2) * 30 + 5}px, ${
      Math.floor(this.axisCount.x / 2) * 30 + 5}px)`,
    );
    this.clipSelection.attr('width', width - this.axisCount.y * 30 - 10);
    this.clipSelection.attr('height', height - this.axisCount.x * 30 - 10);
  }

  updateChildren() {
    const { data } = this.props;
    const axisPositions = {};
    const axisCounter = { x: 0, y: 0 };
    const allDomains = {};

    forIn(this.axes, (axisValue, axisKey) => {
      const setAxisDomain = axisValue.passDomain;
      const userDomain = axisValue.userDomain;
      const axisDirection = axisValue.direction;
      let seriesData: number[] = [];

      axisPositions[axisKey] = axisCounter[axisDirection] += 1;

      forIn(this.components, (componentValue, componentKey) => {
        if (componentValue.axes.x === axisKey) {
          seriesData = seriesData.concat(filterValues(data[componentKey], axisDirection));
        } else if (componentValue.axes.y === axisKey) {
          seriesData = seriesData.concat(filterValues(data[componentKey], axisDirection));
        }
      });

      if (userDomain) {
        setAxisDomain(userDomain);
        allDomains[axisKey] = userDomain;
      } else {
        const computedDomain = d3.extent(seriesData);

        if (computedDomain[0] !== undefined && computedDomain[1] !== undefined) {
          setAxisDomain(computedDomain);
          allDomains[axisKey] = computedDomain;
        }
      }
    });

    this.axisPositions = axisPositions;
    this.axisCount = axisCounter;
    this.updateDefs();

    forIn(this.components, (componentValue) => {
      const setComponentDomain = componentValue.passDomains;
      let domainX: [number, number] = [0, 0];
      let domainY: [number, number] = [0, 0];

      forIn(this.axes, (axisValue, axisKey) => {
        if (componentValue.axes.x === axisKey) {
          domainX = allDomains[axisKey];
        } else if (componentValue.axes.y === axisKey) {
          domainY = allDomains[axisKey];
        }
      });

      setComponentDomain(domainX, domainY);
    });

    function filterValues(values: Value[], direction: 'x' | 'y'): number[] {
      return values.map(value => value[direction]);
    }
  }

  componentDidMount() {
    this.createSVGAndDefs();
    this.updateChildren();
  }

  componentDidUpdate() {
    this.updateSVG();
    this.updateChildren();
  }

  componentWillUnmount() {
    const { svgSelection } = this.state;

    if (svgSelection) {
      svgSelection.remove();
    }
  }

  render() {
    const { children, width, height, data } = this.props;
    const { svgSelection } = this.state;

    return (
      <ChartDiv ref={this.divRef}>
        <ChartContext.Provider
          value={{
            svgSelection,
            data,
            svgDimensions: { width, height },
            axisPositions: this.axisPositions,
            axisCount: this.axisCount,
            registerAxis: this.registerAxis,
            registerComponent: this.registerComponent,
            unregisterAxis: this.unregisterAxis,
            unregisterComponent: this.unregisterComponent,
          }}
        >
          {children}
        </ChartContext.Provider>
      </ChartDiv>
    );
  }
}
