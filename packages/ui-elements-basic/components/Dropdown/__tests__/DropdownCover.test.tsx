import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { DropdownContextType } from '../index';
import { DropdownCoverStyled } from '../DropdownCover';

library.add(
  faCaretDown,
  faCaretUp,
);
enzyme.configure({ adapter: new Adapter() });

const iconOpened = <FontAwesomeIcon icon="caret-up"/>;
const iconClosed = <FontAwesomeIcon icon="caret-down"/>;

const createContext = ({ opened = false } = {}) => {
  return {
    opened,
    iconOpened,
    iconClosed,
    coverRef: React.createRef(),
    onCoverClick: jest.fn(),
    onContentClick: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseOut: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  } as DropdownContextType;
};

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('DropdownCover', () => {
      [false, true].forEach((opened) => {
        it(`should render (opened: ${opened})`, () => {
          const context = createContext({ opened });
          const tree = TestRenderer
            .create((
              <DropdownCoverStyled dropdownContext={context}>
                <div/>
              </DropdownCoverStyled>
            ));
          expect(tree.toJSON()).toMatchSnapshot();
        });
      });

      it('should attach coverRef to context', () => {
        const context = createContext();
        TestRenderer
          .create((
            <DropdownCoverStyled dropdownContext={context}>
              <div/>
            </DropdownCoverStyled>
          ));
        expect(context.coverRef.current).toBeDefined();
      });

      it('should handle click', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.find('div.test-cover').simulate('click');
        expect(context.onCoverClick).toBeCalled();
      });

      it('should not handle click if disabled', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context} disableClick={true}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.find('div.test-cover').simulate('click');
        expect(context.onCoverClick).toBeCalledTimes(0);
      });

      it('should handle mouse enter', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.simulate('mouseenter');
        expect(context.onMouseOver).toBeCalled();
      });

      it('should handle mouse leave', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.simulate('mouseleave');
        expect(context.onMouseOut).toBeCalled();
      });

      it('should handle focus', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.simulate('focus');
        expect(context.onFocus).toBeCalled();
      });

      it('should handle blur', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownCoverStyled dropdownContext={context}>
              <div className="test-cover"/>
            </DropdownCoverStyled>
          ));
        tree.simulate('blur');
        expect(context.onBlur).toBeCalled();
      });
    });
  });
});
