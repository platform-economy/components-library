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
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {
  Dropdown,
  DropdownContext,
  DropdownContextType,
  DropdownOpenState, DropdownProps,
} from '../index';
import { getContextInterceptor } from '../../../../../helpers/test-helpers';

library.add(
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faChevronUp,
);
enzyme.configure({ adapter: new Adapter() });

const iconOpened = <FontAwesomeIcon icon="caret-up"/>;
const iconClosed = <FontAwesomeIcon icon="caret-down"/>;
const iconOpenedAlt = <FontAwesomeIcon icon="chevron-up"/>;
const iconClosedAlt = <FontAwesomeIcon icon="chevron-down"/>;

const OPEN_DELAY = 20;
const CLOSE_DELAY = 300;

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('Dropdown', () => {

      beforeEach(() => {
        jest.resetAllMocks();
        jest.useFakeTimers();
      });

      /* -------------------- Snapshot tests for different props -------------------------------- */

      [false, true].forEach((isMobile) => {
        [false, true].forEach((dropOnHover) => {
          it(`should render (isMobile: ${isMobile}, dropOnHover: ${dropOnHover})`, () => {
            const tree = TestRenderer
              .create((
                <Dropdown
                  iconOpened={iconOpened}
                  iconClosed={iconClosed}
                  isMobile={isMobile}
                  dropOnHover={dropOnHover}
                >
                  <div/>
                </Dropdown>
              ))
              .toJSON();
            expect(tree).toMatchSnapshot();
          });
        });
      });

      /* -------------------- Single behavior tests --------------------------------------------- */

      it('should provide proper context to children', () => {
        const context = getContextInterceptor(DropdownContext);

        TestRenderer
          .create((
            <Dropdown
              iconOpened={iconOpened}
              iconClosed={iconClosed}
            >
              <context.Interceptor/>
            </Dropdown>
          ));
        expect(context.current.coverRef).toBeDefined();
        const actual = {
          iconOpened: context.current.iconOpened,
          iconClosed: context.current.iconClosed,
          opened: context.current.opened,
        };
        const expected = {
          iconOpened,
          iconClosed,
          opened: false,
        };
        expect(actual).toEqual(expected);
      });

      it('should not leave any document listeners after unmount', () => {
        const listeners: { [eventName: string]: Function[] } = {};
        const addEventListener = document.addEventListener;
        const removeEventListener = document.removeEventListener;
        try {
          // mocking addEventListener/removeEventListener to track active subscriptions
          document.addEventListener = jest.fn((eventName: string, callback: Function) => {
            listeners[eventName] = listeners[eventName] || [];
            listeners[eventName].push(callback);
          });
          document.removeEventListener = jest.fn((eventName: string, callback: Function) => {
            if (eventName in listeners) {
              listeners[eventName] = listeners[eventName].filter(cb => cb !== callback);
              if (listeners[eventName].length === 0) {
                delete listeners[eventName];
              }
            }
          });

          // mounting and unmounting
          enzyme
            .mount((
              <Dropdown>
                <div/>
              </Dropdown>
            ))
            .unmount();
        } finally {
          // restoring mocked methods
          document.addEventListener = addEventListener;
          document.removeEventListener = removeEventListener;
        }
        expect(Object.keys(listeners).length).toBe(0);
      });
      it('should clear opening timeout after unmount', () => {
        const context = getContextInterceptor(DropdownContext);
        const openStateChangeHandler = jest.fn();
        const tree = enzyme
          .mount((
            <Dropdown
              openState="closed"
              onOpenStateChange={openStateChangeHandler}
              dropOnHover={true}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        context.current.onMouseOver();
        tree.unmount();
        jest.runAllTimers();
        expect(openStateChangeHandler).toBeCalledTimes(0);
      });
      it('should clear closing timeout after unmount', () => {
        const context = getContextInterceptor(DropdownContext);
        const openStateChangeHandler = jest.fn();
        const tree = enzyme
          .mount((
            <Dropdown
              openState="hovered"
              onOpenStateChange={openStateChangeHandler}
              dropOnHover={true}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        context.current.onMouseOut();
        tree.unmount();
        jest.runAllTimers();
        expect(openStateChangeHandler).toBeCalledTimes(0);
      });

      it('should abort opening on mouse enter when mouse leaves', () => {
        const context = getContextInterceptor(DropdownContext);
        const openStateChangeHandler = jest.fn();
        enzyme
          .mount((
            <Dropdown
              openState="closed"
              onOpenStateChange={openStateChangeHandler}
              dropOnHover={true}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        context.current.onMouseOver();
        jest.advanceTimersByTime(OPEN_DELAY / 2);
        context.current.onMouseOut();
        jest.runAllTimers();
        expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
      });
      it('should abort closing on mouse leave when mouse entered again', () => {
        const context = getContextInterceptor(DropdownContext);
        const openStateChangeHandler = jest.fn();
        enzyme
          .mount((
            <Dropdown
              openState="hovered"
              onOpenStateChange={openStateChangeHandler}
              dropOnHover={true}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        context.current.onMouseOut();
        jest.advanceTimersByTime(CLOSE_DELAY / 2);
        context.current.onMouseOver();
        jest.runAllTimers();
        expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
      });
      it('should allow to change open icon in runtime', () => {
        const context = getContextInterceptor(DropdownContext);
        const tree = enzyme
          .mount((
            <Dropdown
              iconOpened={iconOpened}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        tree.setProps({ iconOpened: iconOpenedAlt });
        expect(context.current.iconOpened).toBe(iconOpenedAlt);
      });
      it('should allow to change open icon in runtime (to undefined)', () => {
        const context = getContextInterceptor(DropdownContext);
        const tree = enzyme
          .mount((
            <Dropdown
              iconOpened={iconOpened}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        tree.setProps({ iconOpened: undefined });
        expect(context.current.iconOpened).toBe(null);
      });
      it('should allow to change close icon in runtime', () => {
        const context = getContextInterceptor(DropdownContext);
        const tree = enzyme
          .mount((
            <Dropdown
              iconClosed={iconOpened}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        tree.setProps({ iconClosed: iconClosedAlt });
        expect(context.current.iconClosed).toBe(iconClosedAlt);
      });
      it('should allow to change close icon in runtime (to undefined)', () => {
        const context = getContextInterceptor(DropdownContext);
        const tree = enzyme
          .mount((
            <Dropdown
              iconClosed={iconOpened}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        tree.setProps({ iconClosed: undefined });
        expect(context.current.iconClosed).toBe(null);
      });

      /* -------------------- Test cases for event handling in different states ----------------- */

      const TEST_CASE_EVENTS = {
        'cover click': (context: DropdownContextType) => context.onCoverClick(),
        'content click': (context: DropdownContextType) => context.onContentClick(),
        'outside click': () => document.dispatchEvent(new Event('mousedown')),
        'mouse enter': (context: DropdownContextType) => context.onMouseOver(),
        'mouse leave': (context: DropdownContextType) => context.onMouseOut(),
        focus: (context: DropdownContextType) => context.onFocus(),
        blur: (context: DropdownContextType) => context.onBlur(),
      };
      type TestCase = {
        event: keyof typeof TEST_CASE_EVENTS,
        openState: DropdownOpenState,
        props?: Partial<DropdownProps>,
        verify: (args: {
          openStateChangeHandler: (openState: DropdownOpenState) => void,
        }) => void,
      };

      const TEST_CASES: TestCase[] = [
        {
          event: 'cover click',
          openState: 'closed',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('clicked');
          },
        },
        {
          event: 'cover click',
          openState: 'hovered',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('clicked');
          },
        },
        {
          event: 'cover click',
          openState: 'clicked',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('closed');
          },
        },
        {
          event: 'content click',
          openState: 'closed',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'content click',
          openState: 'hovered',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('clicked');
          },
        },
        {
          event: 'content click',
          openState: 'clicked',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'outside click',
          openState: 'closed',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'outside click',
          openState: 'hovered',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('closed');
          },
        },
        {
          event: 'outside click',
          openState: 'clicked',
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('closed');
          },
        },
        {
          event: 'mouse enter',
          openState: 'closed',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            jest.advanceTimersByTime(OPEN_DELAY);
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('hovered');
          },
        },
        {
          event: 'mouse enter',
          openState: 'hovered',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'mouse enter',
          openState: 'clicked',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'mouse leave',
          openState: 'closed',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'mouse leave',
          openState: 'hovered',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            jest.advanceTimersByTime(CLOSE_DELAY);
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('closed');
          },
        },
        {
          event: 'mouse leave',
          openState: 'clicked',
          props: { dropOnHover: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'focus',
          openState: 'closed',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            jest.advanceTimersByTime(OPEN_DELAY);
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('hovered');
          },
        },
        {
          event: 'focus',
          openState: 'hovered',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'focus',
          openState: 'clicked',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'blur',
          openState: 'closed',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        {
          event: 'blur',
          openState: 'hovered',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            jest.advanceTimersByTime(CLOSE_DELAY);
            expect(openStateChangeHandler).toHaveBeenCalledTimes(1);
            expect(openStateChangeHandler).toHaveBeenLastCalledWith('closed');
          },
        },
        {
          event: 'blur',
          openState: 'clicked',
          props: { dropOnFocus: true },
          verify: ({ openStateChangeHandler }) => {
            jest.runAllTimers();
            expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
          },
        },
        ... ['closed', 'hovered', 'opened'].map((openState) => {
          return {
            openState,
            event: 'mouse enter',
            props: { /*dropOnHover: false*/ },
            verify: ({ openStateChangeHandler }) => {
              expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            },
          } as TestCase;
        }),
        ... ['closed', 'hovered', 'opened'].map((openState) => {
          return {
            openState,
            event: 'focus',
            props: { /*dropOnFocus: false*/ },
            verify: ({ openStateChangeHandler }) => {
              expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            },
          } as TestCase;
        }),
        ... ['closed', 'hovered', 'opened'].map((openState) => {
          return {
            openState,
            event: 'mouse leave',
            props: { /*dropOnHover: false*/ },
            verify: ({ openStateChangeHandler }) => {
              expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            },
          } as TestCase;
        }),
        ... ['closed', 'hovered', 'opened'].map((openState) => {
          return {
            openState,
            event: 'blur',
            props: { /*dropOnFocus: false*/ },
            verify: ({ openStateChangeHandler }) => {
              expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
            },
          } as TestCase;
        }),
      ];

      TEST_CASES.forEach((testCase) => {
        const { event, openState, props = {}, verify } = testCase;
        let name = `should properly handle ${event} in state '${openState}'`;
        const propsDescription = Object.keys(props).map((key) => {
          return `${key}: ${props[key]}`;
        });
        if (propsDescription.length > 0) {
          name = `${name} (${propsDescription.join(', ')})`;
        }
        it(name, () => {
          const context = getContextInterceptor(DropdownContext);
          const openStateChangeHandler = jest.fn();
          enzyme
            .mount((
              <Dropdown
                openState={openState}
                onOpenStateChange={openStateChangeHandler}
                {...testCase.props || {}}
              >
                <context.Interceptor />
              </Dropdown>
            ));
          TEST_CASE_EVENTS[event](context.current);
          verify({ openStateChangeHandler });
        });
      });

      it('should ignore hover when clicked in the meantime', () => {
        const context = getContextInterceptor(DropdownContext);
        const openStateChangeHandler = jest.fn();
        const tree = enzyme
          .mount((
            <Dropdown
              openState="closed"
              onOpenStateChange={openStateChangeHandler}
              dropOnHover={true}
            >
              <context.Interceptor />
            </Dropdown>
          ));
        context.current.onMouseOver();
        tree.setProps({
          openState: 'clicked',
        });
        jest.runAllTimers();
        expect(openStateChangeHandler).toHaveBeenCalledTimes(0);
      });
    });
  });
});
