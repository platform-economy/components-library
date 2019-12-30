import * as React from 'react';
import { DropdownContext, DropdownContextType } from './DropdownContext';
import { getComponentDisplayName } from '@relayr/ui-elements-core';

type DropdownContextProps = { dropdownContext: DropdownContextType };
type WrapperProps<P> = Pick<P, Exclude<keyof P, 'dropdownContext'>>;

export const withDropdownContext = (name: string | null = null) =>
  <P extends DropdownContextProps>(WrappedComponent: React.ComponentType<P>) => {
    const displayName = name != null
      ? name
      : `${getComponentDisplayName(WrappedComponent)}WithDropdownContext`;

    return class WrapperComponent extends React.Component<WrapperProps<P>> {
      static displayName = displayName;

      render() {
        return (
          <DropdownContext.Consumer>
            {dropdownContext => (
              <WrappedComponent dropdownContext={dropdownContext} {...this.props as P} />
            )}
          </DropdownContext.Consumer>
        );
      }
    };
  };
