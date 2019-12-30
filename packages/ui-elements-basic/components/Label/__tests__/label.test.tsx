import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

jest.mock('react-i18next', () => ({
  // tslint:disable-next-line:no-any
  NamespacesConsumer: (props: any) => (
    <div id="NamespacesConsumer">{props.children((text: string) => text)}</div>
  ),
}));

// Component to test
import { Label } from '../index';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Label', () => {
      it('should render with default properties only', () => {
        const tree = TestRenderer
          .create(<Label title="Test Title" />)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
