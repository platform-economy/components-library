import * as React from 'react';

export const getContextInterceptor = <T extends {}>(Context: React.Context<T>) => {
  let current: T | null = null;

  const Interceptor: React.FunctionComponent = () => (
    <Context.Consumer>
      {(c: T) => {
        current = c;
        return null;
      }}
    </Context.Consumer>
  );
  Interceptor.displayName = 'ContextInterceptor';

  return {
    Interceptor,
    get hasCurrent() {
      return current != null;
    },
    get current() {
      expect(current).not.toBeNull();
      return current as T;
    },
  };
};
