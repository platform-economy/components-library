import * as React from 'react';
import { Data } from '../../types';
import { D3Selection } from '../../d3types';

export type PassDomain = (domain: [number, number]) => void;
export type PassDomains = (domainX: [number, number], domainY: [number, number]) => void;
export type PassData = (data: Data) => void;
export type RegisterAxisArgs = {
  name: string,
  direction: 'x' | 'y',
  passDomain: PassDomain,
  userDomain?: [number, number],
};
export type RegisterComponentArgs = {
  name: string,
  axes: AssignedAxes,
  passDomains: PassDomains,
};

type AxisPositions = { [name: string]: number };
type AxisCount = { x: number, y: number };
type SVGDimensions = { width: number, height: number };

type RegisterAxis = (args: RegisterAxisArgs) => void;
type RegisterComponent = (args: RegisterComponentArgs) => void;
type UnregisterAxis = (name: string) => void;
type UnregisterComponent = (name: string) => void;

export type AssignedAxes = {
  x: string,
  y: string,
};

export type ChartContextType = {
  svgSelection?: D3Selection;
  data: Data,
  axisPositions?: AxisPositions,
  axisCount: AxisCount,
  svgDimensions: SVGDimensions,
  registerAxis: RegisterAxis,
  registerComponent: RegisterComponent,
  unregisterAxis: UnregisterAxis,
  unregisterComponent: UnregisterComponent,
};

export const ChartContext = React.createContext<ChartContextType>({
  svgSelection: undefined,
  data: {},
  axisPositions: undefined,
  axisCount: { x: 0, y: 0 },
  svgDimensions: { width: 0, height: 0 },
  registerAxis: () => null,
  registerComponent: () => null,
  unregisterAxis: () => null,
  unregisterComponent: () => null,
});
