import * as React from 'react';

export type LoadingBoxProps = {
  /** Indicates whether to show skeleton component or origin component */
  isLoading?: boolean;
};

export type ReactBaseComponent = React.ComponentClass<unknown>;

/**
 * LoadingBoxComponent contains both the origin component and its skeleton equivalent.
 */
export abstract class LoadingBoxComponent
  extends React.Component<LoadingBoxProps> {
  /** Component skeleton to show while loading */
  static readonly Skeleton: ReactBaseComponent;
  /** Base component without loader skeleton */
  static readonly Base: ReactBaseComponent;
}

/**
 * OriginComponent should be either base react component or LoadingBoxComponent
 */
export type OriginComponent = typeof LoadingBoxComponent | ReactBaseComponent;

/**
 * Ensure that given component is without skeleton. If given component is
 * an origin component, return it.
 * If given component is already wrapped with skeleton, return its origin version.
 * @param Component that needs to be checked
 */
export const ensureBaseComponent =
  (Component: OriginComponent): ReactBaseComponent => {
    if ((Component as typeof LoadingBoxComponent).Base) {
      return (Component as typeof LoadingBoxComponent).Base;
    }
    return (Component as ReactBaseComponent);
  };

/**
 * **withSkeleton** returns new `LoadingBoxComponent` which contains both *base
 * component* and its skeleton. `LoadingBoxComponent` contain logic for switching
 * between both Base and Skeleton based on `isLoading` property.
 *
 * @param SkeletonComponent Component to display when component is in loading state
 * @returns
 * New method which accepts `OriginComponent` as its argument.
 * If `OriginComponent` is `typeof LoadingBoxComponent`, the base component will
 * be extracted from it and used with given `SkeletonComponent`.
 *
 * @example
  ```
const LBComponent = withSkeleton(ReactComponentA)(ReactComponentB)
  ```
 */
export const withSkeleton = (SkeletonComponent: ReactBaseComponent) => (
  OriginComponent: OriginComponent,
): typeof LoadingBoxComponent => {

  class SkeletonComponentWrapped extends LoadingBoxComponent {

    static readonly Skeleton = SkeletonComponent;
    static readonly Base = ensureBaseComponent(OriginComponent);

    public render() {
      const { isLoading } = this.props;
      const Base = SkeletonComponentWrapped.Base;
      const Skeleton = SkeletonComponentWrapped.Skeleton;

      // choose either Skeleton Component or Base Component
      const ComponentWrapped = isLoading ? Skeleton : Base;
      return <ComponentWrapped {...this.props} />;
    }
  }

  return SkeletonComponentWrapped;
};
