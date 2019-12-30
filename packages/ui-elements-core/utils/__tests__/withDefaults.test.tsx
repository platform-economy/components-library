import * as React from 'react';
import { withDefaults } from '../withDefaults';
import * as TestRenderer from 'react-test-renderer';

const MOCKED_DISPLAY_NAME = 'MockedDisplayName';

jest.mock('../getComponentDisplayName', () => ({
  getComponentDisplayName: () => MOCKED_DISPLAY_NAME,
}));

describe('ui-elements-core', () => {
  describe('utils/withDefaults', () => {

    it('should provide defaults to component', () => {
      type Props = {prop1: number, prop2: string, prop3: boolean};
      let actualProps: Props|null = null;

      const Component = (props: Props) => {
        actualProps = props;
        return null;
      };

      const ComponentWithDefaults = withDefaults({ prop1: 2, prop2: 'test' })(Component);
      TestRenderer.create(<ComponentWithDefaults prop3={true} />);
      expect(actualProps).toEqual({ prop1: 2, prop2: 'test', prop3: true });
    });

    it('should allow to override defaulted properties', () => {
      type Props = {prop1: number, prop2: string, prop3: boolean};
      let actualProps: Props|null = null;

      const Component = (props: Props) => {
        actualProps = props;
        return null;
      };

      const ComponentWithDefaults = withDefaults({ prop1: 2, prop2: 'test' })(Component);
      TestRenderer.create(<ComponentWithDefaults prop1={3} prop3={true} />);
      expect(actualProps).toEqual({ prop1: 3, prop2: 'test', prop3: true });
    });

    it('should generate display name if not provided', () => {
      const TestComponent: React.FunctionComponent = () => (<div />);
      const ComponentWithDefaults = withDefaults({})(TestComponent);
      expect(ComponentWithDefaults.displayName).toBe(`${MOCKED_DISPLAY_NAME}WithDefaults`);
    });

    it('should set desired display name if provided', () => {
      const TestComponent: React.FunctionComponent = () => (<div />);
      const ComponentWithDefaults = withDefaults({}, 'MyTestComponent')(TestComponent);
      expect(ComponentWithDefaults.displayName).toBe('MyTestComponent');
    });

  });
});
