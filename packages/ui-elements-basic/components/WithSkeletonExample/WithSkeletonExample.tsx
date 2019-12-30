import * as React from 'react';
import { withSkeleton } from '@relayr/ui-elements-skeletons';
import { WithSkeletonExampleSkeleton } from './WithSkeletonExampleSkeleton';

export type WithSkeletonExampleProps = {
};

export class WithSkeletonExampleBase extends React.Component<WithSkeletonExampleProps> {
  render() {
    return (
      <div>WithSkeletonExample</div>
    );
  }
}

export const WithSkeletonExample = withSkeleton(
  WithSkeletonExampleSkeleton,
)(WithSkeletonExampleBase);
