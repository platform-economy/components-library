import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

// Component
import { withSkeleton, LoadingBoxComponent } from '../withSkeleton';

class ComponentA extends React.Component {
  render() {
    return <div>ComponentA</div>;
  }
}

class ComponentB extends React.Component {
  render() {
    return <div>ComponentB</div>;
  }
}

class ComponentC extends React.Component {
  render() {
    return <div>ComponentC</div>;
  }
}

describe('ui-elements-skeletons', () => {
  describe('HoC', () => {
    describe('withSkeleton', () => {
      let LoaderBox: typeof LoadingBoxComponent;

      beforeEach(() => {
        LoaderBox = withSkeleton(ComponentB)(ComponentA);
      });

      it('should render default component', () => {
        const tree = TestRenderer
          .create(<LoaderBox />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render skeleton component', () => {
        const tree = TestRenderer
          .create(<LoaderBox isLoading={true} />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render skeleton component (from static property)', () => {
        const tree = TestRenderer
          .create(<LoaderBox.Skeleton />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render base component (from static property)', () => {
        const tree = TestRenderer
          .create(<LoaderBox.Base />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should switch skeleton component', () => {
        const NewLBComponent = withSkeleton(ComponentC)(LoaderBox);

        const tree1 = TestRenderer
          .create(<NewLBComponent isLoading={true} />)
          .toJSON();

        const tree2 = TestRenderer
          .create(<NewLBComponent />)
          .toJSON();

        expect(tree1).toMatchSnapshot();
        expect(tree2).toMatchSnapshot();
      });

    });
  });
});
