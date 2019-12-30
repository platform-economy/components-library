import * as React from 'react';
import { Basic } from '@relayr/ui-elements-skeletons';

export type WithSkeletonExampleSkeletonProps = {};

export class WithSkeletonExampleSkeleton extends React.Component<WithSkeletonExampleSkeletonProps> {

  public render() {
    return (
      <Basic height="20px" width="200px" />
    );
  }
}
