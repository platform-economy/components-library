import * as React from 'react';
import { ComponentWithValue, withUncontrolledValue } from '../withUncontrolledValue';
import * as TestRenderer from 'react-test-renderer';

type Props = {
  value?: string;
  onValueChange?(newValue: string, event: Symbol): void;
};

const getPropsInterceptor = <TProps extends {}>() => {
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

describe('ui-elements-core', () => {
  describe('utils/withUncontrolledValue', () => {

    it('should provide initial value to wrapped component', () => {
      const ComponentControlled = getPropsInterceptor<Props>();
      const ComponentUncontrolled = withUncontrolledValue()(ComponentControlled);
      TestRenderer.create(<ComponentUncontrolled value="1"/>);
      expect(ComponentControlled.props.value).toBe('1');
    });

    it('should expose "value" property', () => {
      const ControlledComponent = getPropsInterceptor<Props>();
      const ComponentUncontrolled = withUncontrolledValue()(ControlledComponent);
      const tree = TestRenderer.create(<ComponentUncontrolled value="1"/>);
      const instance = tree.root.instance as ComponentWithValue<string>;
      expect(instance.value).toBe('1');
    });

    it('should update value on event', () => {
      const ComponentControlled = getPropsInterceptor<Props>();
      const ComponentUncontrolled = withUncontrolledValue()(ComponentControlled);
      TestRenderer.create(<ComponentUncontrolled value="1"/>);
      expect(ComponentControlled.props.onValueChange).toBeDefined();
      if (ComponentControlled.props.onValueChange) { // only for Typescript
        ComponentControlled.props.onValueChange('2', Symbol());
      }
      expect(ComponentControlled.props.value).toBe('2');
    });

    it('should expose onValueChange event', () => {
      const ComponentControlled = getPropsInterceptor<Props>();
      const ComponentUncontrolled = withUncontrolledValue()(ComponentControlled);
      const onValueChange = jest.fn();
      TestRenderer.create(<ComponentUncontrolled value="1" onValueChange={onValueChange}/>);
      expect(ComponentControlled.props.onValueChange).toBeDefined();
      const arg = Symbol();
      if (ComponentControlled.props.onValueChange) { // only for Typescript
        ComponentControlled.props.onValueChange('2', arg);
      }
      expect(onValueChange).toBeCalledWith('2', arg);
    });
  });
});
