import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { DropdownContext, DropdownContextType, withDropdownContext } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('withDropdownContext', () => {

      it('should provide context to wrapped component', () => {
        const context = {
          opened: false,
          coverRef: React.createRef(),
          iconOpened: null,
          iconClosed: null,
          onCoverClick: () => {},
          onContentClick: () => {},
          onMouseOver: () => {},
          onMouseOut: () => {},
        } as DropdownContextType;
        let receivedContext: DropdownContextType|null = null;
        const TestWrappedComponent = (props: {dropdownContext: DropdownContextType}) => {
          receivedContext = props.dropdownContext;
          return null;
        };
        const TestComponentWithContext = withDropdownContext()(TestWrappedComponent);

        TestRenderer
          .create((
            <DropdownContext.Provider value={context}>
              <TestComponentWithContext />
            </DropdownContext.Provider>
          ));

        expect(receivedContext).toBe(context);
      });

      it('should generate proper displayName on wrapper', () => {
        const TestWrappedComponent = () => null;
        const TestComponentWithContext = withDropdownContext()(TestWrappedComponent);
        expect(TestComponentWithContext.displayName)
          .toBe('TestWrappedComponentWithDropdownContext');
      });

      it('should set provided displayName on wrapper', () => {
        const TestWrappedComponent = () => null;
        const TestComponentWithContext = withDropdownContext('MyTestComponent')(
          TestWrappedComponent,
        );
        expect(TestComponentWithContext.displayName)
          .toBe('MyTestComponent');
      });
    });
  });
});
