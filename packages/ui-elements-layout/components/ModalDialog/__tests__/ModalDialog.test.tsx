import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Title, Subtitle } from '../ModalDialog.stories';
import { CloseIconWrapper } from '../ModalDialog';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/*
A set of utilities for testing Styled Components with Jest.
This package improves the snapshot testing experience and
provides a brand new matcher to make expectations on the style rules.
*/
import 'jest-styled-components';

// Component
import { ModalDialog } from '../index';
import { withTestTheme } from '@relayr/ui-elements-themes';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-layout', () => {
  describe('Components', () => {
    describe('ModalDialog', () => {

      it('should render with default state', () => {
        const tree = TestRenderer
          .create(
            withTestTheme(
              <ModalDialog
                closeIcon={'Close icon.'}
              >
              {}
              </ModalDialog>,
            ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render all properties', () => {
        const tree = TestRenderer
          .create(
            withTestTheme(
              <ModalDialog
                closeIcon={'close-icon'}
                header={
                  <>
                  <Title>Title</Title>
                  <Subtitle>Subtitle</Subtitle>
                </>
                }
                footer={'footer'}
              >
              {}
              </ModalDialog>,
            ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should render without close icon', () => {
        const tree = TestRenderer
          .create(
            withTestTheme(
              <ModalDialog
              >
              {}
              </ModalDialog>,
            ),
          )
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

      it('should handle click event correctly', () => {
        const onCloseClick = jest.fn();
        const tree = enzyme.mount(withTestTheme(
        <ModalDialog
          onCloseClick={onCloseClick}
          closeIcon={'mock-of-close-icon'}
        >
          {}
        </ModalDialog>,
          ));
        tree.find(CloseIconWrapper).simulate('click');
        expect(onCloseClick).toHaveBeenCalledTimes(1);
      });
    });
  });
});
