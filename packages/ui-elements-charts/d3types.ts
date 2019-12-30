import { Selection, ScaleLinear, ScaleTime, Axis } from 'd3';

export type D3Selection = Selection<SVGElement, {}, null, undefined>;
export type D3ScaleLinear = ScaleLinear<number, number>;
export type D3ScaleTime = ScaleTime<number, number>;
export type D3Axis = Axis<number | { valueOf(): number }>;
