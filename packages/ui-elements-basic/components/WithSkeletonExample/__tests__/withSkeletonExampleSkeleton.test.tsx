import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

jest.mock('@relayr/ui-elements-skeletons', () => ({
  // tslint:disable-next-line:no-any
  Basic: (props: any) => (
    <div id="BasicSkeleton">{props.children}</div>
  ),
}));

// Component
import { WithSkeletonExampleSkeleton } from '../WithSkeletonExampleSkeleton';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('WithSkeletonExampleSkeleton', () => {

      it('should render with default properties only', () => {
        const tree = TestRenderer
          .create(<WithSkeletonExampleSkeleton />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
