import * as React from 'react';
import { DropdownOpenState } from '../Dropdown';
import {
  ComponentWithUncontrolledDropdownState,
  withUncontrolledDropdownState,
} from '../withUncontrolledDropdownState';
import * as TestRenderer from 'react-test-renderer';

type Props = {
  openState?: DropdownOpenState;
  onOpenStateChange?(newOpenState: DropdownOpenState): void;
};

export const getPropsInterceptor = <TProps extends {}>() => {
  let actualProps: TProps|null = null;

  return class PropsInterceptor extends React.Component<TProps> {
    static get hasProps() {
      return actualProps != null;
    }
    static get props() {
      expect(actualProps).not.toBeNull();
      return actualProps as TProps;
    }
    render() {
      actualProps = this.props;
      return null;
    }
  };
};

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('withUncontrolledDropdownState', () => {

      it('should provide initial open state to wrapped component', () => {
        const Component = getPropsInterceptor<Props>();
        const ComponentUncontrolled = withUncontrolledDropdownState()(Component);
        TestRenderer.create(<ComponentUncontrolled openState="closed"/>);
        expect(Component.props.openState).toBe('closed');
      });

      it('should expose "openState" property', () => {
        const Component = getPropsInterceptor<Props>();
        const ComponentUncontrolled = withUncontrolledDropdownState()(Component);
        const tree = TestRenderer.create(<ComponentUncontrolled openState="closed"/>);
        const instance = tree.root.instance as ComponentWithUncontrolledDropdownState;
        expect(instance.openState).toBe('closed');
      });

      it('should update openState on event', () => {
        const Component = getPropsInterceptor<Props>();
        const ComponentUncontrolled = withUncontrolledDropdownState()(Component);
        TestRenderer.create(<ComponentUncontrolled openState="closed"/>);
        expect(Component.props.onOpenStateChange).toBeDefined();
        Component.props.onOpenStateChange && Component.props.onOpenStateChange('clicked');
        expect(Component.props.openState).toBe('clicked');
      });

      it('should expose onOpenStateChange event', () => {
        const Component = getPropsInterceptor<Props>();
        const ComponentUncontrolled = withUncontrolledDropdownState()(Component);
        const onOpenStateChange = jest.fn();
        TestRenderer.create(
          <ComponentUncontrolled
            openState="closed"
            onOpenStateChange={onOpenStateChange}
          />);
        expect(Component.props.onOpenStateChange).toBeDefined();
        Component.props.onOpenStateChange && Component.props.onOpenStateChange('clicked');
        expect(onOpenStateChange).toBeCalledWith('clicked');
      });
    });
  });
});
