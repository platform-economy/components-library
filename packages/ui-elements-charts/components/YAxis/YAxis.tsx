import * as React from 'react';
import { Axis, AxisProps } from '../Axis';

export const YAxis = (props: Pick<AxisProps, Exclude<keyof AxisProps, 'direction'>>) => (
  <Axis {...props} direction="y" />
);
