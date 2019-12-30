import * as React from 'react';
import { getComponentDisplayName } from './getComponentDisplayName';

type PropsWithDefaults<TProps extends {}, TDefaults extends {}> =
  Partial<TDefaults> & Pick<TProps, Exclude<keyof TProps, keyof TDefaults>>;

export const withDefaults = <TDefaults extends {}>(defaults: TDefaults, name: string|null = null) =>
  <TProps extends TDefaults>(WrappedComponent: React.ComponentType<TProps>) => {
    const displayName = name != null
      ? name
      : `${getComponentDisplayName(WrappedComponent)}WithDefaults`;

    return class WrapperComponent extends React.Component<PropsWithDefaults<TProps, TDefaults>> {
      static displayName = displayName;

      render() {
        return (
          <WrappedComponent {...defaults} {...this.props as TProps}/>
        );
      }
    } as React.ComponentType<PropsWithDefaults<TProps, TDefaults>>;
  };
