import * as React from 'react';

import { ChartContext, ChartContextType } from './context';

export const withChartContext = <P extends ChartContextType>(
  WrappedComponent: React.ComponentType<P>,
): React.ComponentType<Pick<P, Exclude<keyof P, keyof ChartContextType>>> =>
  class WithChartContext extends React.Component<
    Pick<P, Exclude<keyof P, keyof ChartContextType>>
  > {
    render() {
      return (
        <ChartContext.Consumer>
          {chartProps => (
            <WrappedComponent
              {...this.props as P}
              {...chartProps as ChartContextType}
            />
          )}
        </ChartContext.Consumer>
      );
    }
  };
