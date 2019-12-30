import * as React from 'react';
import { loadGoogleAPI } from './loadGoogleAPI';

export type WithGoogleAPI = {
  googleAPILoaded: boolean;
  googleAPILoadError: Error|null;
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export const withGoogleAPI = (...apiNames: string[]) => <TProps extends WithGoogleAPI>(
  WrappedComponent: React.ComponentType<TProps>,
) => {
  type WrapperProps = Subtract<TProps, WithGoogleAPI>;
  type WrapperState = {
    googleAPILoaded: boolean;
    googleAPILoadError: Error|null;
  };

  class WrapperComponent extends React.Component<WrapperProps, WrapperState> {
    state: WrapperState = {
      googleAPILoaded: false,
      googleAPILoadError: null,
    };

    componentDidMount() {
      loadGoogleAPI(...apiNames)
        .then(() => this.setState({ googleAPILoaded: true }))
        .catch(err => this.setState({ googleAPILoadError: err }));
    }

    render() {
      const { googleAPILoaded, googleAPILoadError } = this.state;
      return (
        <WrappedComponent
          {...this.props as TProps}
          googleAPILoaded={googleAPILoaded}
          googleAPILoadError={googleAPILoadError}
        />
      );
    }
  }
  return WrapperComponent as React.ComponentType<WrapperProps>;
};
