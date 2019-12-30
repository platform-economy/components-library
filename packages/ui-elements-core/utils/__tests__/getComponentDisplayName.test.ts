import * as React from 'react';
import { getComponentDisplayName } from '../getComponentDisplayName';

describe('ui-elements-core', () => {
  describe('utils/getComponentDisplayName', () => {

    it('should return displayName for component with displayName', () => {
      const TestComponent: React.FunctionComponent = () => null;
      TestComponent.displayName = 'TestComponentDisplayName';
      const displayName = getComponentDisplayName(TestComponent);
      expect(displayName).toBe('TestComponentDisplayName');
    });

    it('should return name for component without display name', () => {
      class TestComponent extends React.Component {
        render() {
          return null;
        }
      }
      const displayName = getComponentDisplayName(TestComponent);
      expect(displayName).toBe('TestComponent');
    });

    it('should return "Component" for unknown name', () => {
      // factory returning anonymous functional component, to force empty name (Unknown component)
      // for normal functional component React seems to guess name from variable
      const TestComponentFactory = () => (() => null) as React.FunctionComponent;
      const TestComponent = TestComponentFactory();
      expect(TestComponent.name).toBe(''); // verify if name is really empty
      const displayName = getComponentDisplayName(TestComponent);
      expect(displayName).toBe('Component');
    });
  });
});
