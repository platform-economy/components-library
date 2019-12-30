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
import { DropdownContentAlignment, DropdownContentStyled } from '../DropdownContent';

library.add(
  faCaretDown,
  faCaretUp,
);
enzyme.configure({ adapter: new Adapter() });

const iconOpened = <FontAwesomeIcon icon="caret-up"/>;
const iconClosed = <FontAwesomeIcon icon="caret-down"/>;

const createContext = ({ opened = false } = {}) => {
  const cover: HTMLElement = document.createElement('div');
  return {
    opened,
    iconOpened,
    iconClosed,
    coverRef: {
      current: cover,
    },
    onCoverClick: jest.fn(),
    onContentClick: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseOut: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  } as DropdownContextType;
};

const WINDOW_INNER_WIDTH = 1024; // provided by jsdom
const WINDOW_INNER_HEIGHT = 768; // provided by jsdom
const FAKE_COVER_WIDTH = 200;
const FAKE_CONTENT_WIDTH = 300; // greater than FAKE_COVER_WIDTH

const createBoundingBox = (width: number, align: 'left'|'right') => {
  return {
    width,
    left: align === 'left' ? 0 : WINDOW_INNER_WIDTH - width,
    right: align === 'right' ? 0 : WINDOW_INNER_WIDTH - width,
    top: 0,
    bottom: 0,
    height: WINDOW_INNER_HEIGHT,
  };
};

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('DropdownContent', () => {
      [false, true].forEach((opened) => {
        it(`should render (opened: ${opened})`, () => {
          const context = createContext({ opened });
          const tree = TestRenderer
            .create((
              <DropdownContentStyled dropdownContext={context}>
                <div/>
              </DropdownContentStyled>
            ));
          expect(tree.toJSON()).toMatchSnapshot();
        });
      });

      it('should handle click', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        tree.find('div.test-content').simulate('mousedown');
        expect(context.onContentClick).toBeCalled();
      });

      it('should not handle click if disabled', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context} disableClick={true}>
              <div className="test-cover"/>
            </DropdownContentStyled>
          ));
        tree.find('div.test-cover').simulate('mousedown');
        expect(context.onContentClick).toBeCalledTimes(0);
      });

      it('should handle mouse enter', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        tree.simulate('mouseenter');
        expect(context.onMouseOver).toBeCalled();
      });

      it('should handle mouse leave', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        tree.simulate('mouseleave');
        expect(context.onMouseOut).toBeCalled();
      });

      it('should handle focus', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        tree.simulate('focus');
        expect(context.onFocus).toBeCalled();
      });

      it('should handle blur', () => {
        const context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        tree.simulate('blur');
        expect(context.onBlur).toBeCalled();
      });

      it('should align to left by default', () => {
        let context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        context = createContext({ opened: true });

        const coverElement = context.coverRef.current as HTMLElement;
        coverElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
          FAKE_COVER_WIDTH,
          'left',
        ));
        const contentElement = tree.getDOMNode();
        contentElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
          FAKE_CONTENT_WIDTH,
          'left',
        ));
        tree.setProps({ dropdownContext: context });
        tree.update();
        const rootDiv = tree.find('.DropdownContent');
        expect(rootDiv.hasClass('left')).toBe(true);
      });

      it('should align to right if there is no space for left alignment', () => {
        let context = createContext();
        const tree = enzyme
          .mount((
            <DropdownContentStyled dropdownContext={context}>
              <div className="test-content"/>
            </DropdownContentStyled>
          ));
        context = createContext({ opened: true });

        const coverElement = context.coverRef.current as HTMLElement;
        coverElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
          FAKE_COVER_WIDTH,
          'right', // no place for (wider) content to be left aligned
        ));
        const contentElement = tree.getDOMNode();
        contentElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
          FAKE_CONTENT_WIDTH,
          'left',
        ));
        tree.setProps({ dropdownContext: context });
        tree.update();
        const rootDiv = tree.find('.DropdownContent');
        expect(rootDiv.hasClass('right')).toBe(true);
      });

      ['left', 'right', 'center', 'justify'].forEach((alignment: DropdownContentAlignment) => {
        it(`should respect provided ${alignment} alignment`, () => {
          let context = createContext();
          const tree = enzyme
            .mount((
              <DropdownContentStyled dropdownContext={context} alignment={alignment}>
                <div className="test-cover"/>
              </DropdownContentStyled>
            ));
          context = createContext({ opened: true });

          const coverElement = context.coverRef.current as HTMLElement;
          coverElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
            FAKE_COVER_WIDTH,
            'right', // no place for (wider) content to be left aligned
          ));
          const contentElement = tree.getDOMNode();
          contentElement.getBoundingClientRect = jest.fn(() => createBoundingBox(
            FAKE_CONTENT_WIDTH,
            'left',
          ));
          tree.setProps({ dropdownContext: context });
          tree.update();
          const rootDiv = tree.find('.DropdownContent');
          expect(rootDiv.hasClass(alignment)).toBe(true);
        });
      });
    });
  });
});
