import React, { ReactElement } from 'react';
import * as TestRenderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount } from 'enzyme';

import 'jest-styled-components';

import { withTestTheme } from '@relayr/ui-elements-themes';

configure({ adapter: new Adapter() });

// Component
import { TableExpandableRow } from '../TableExpandableRow';

const renderFunction = jest.fn(() => (
  <p>Rendered content</p>
));

describe('ui-elements-tables', () => {
  describe('Components', () => {
    describe('TableExpandableRow', () => {
      it('Should render without throwing an exception', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TableExpandableRow renderContent={renderFunction} />,
          ))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Should render with content', () => {
        const tree = TestRenderer
          .create(withTestTheme(
            <TableExpandableRow renderContent={renderFunction} expanded={true}>
              <td>Tabe data</td>
            </TableExpandableRow>,
          ))
          .toJSON();

        expect(tree).toMatchSnapshot();
      });

      it('Should handle onClick event', () => {
        const handler = jest.fn();
        const tree = mount(withTestTheme(
          <table>
            <tbody>
              <TableExpandableRow renderContent={renderFunction} onClick={handler} />
            </tbody>
          </table>,
        ));

        tree.find(TableExpandableRow).simulate('click');
        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('Should handle onClick event without handler', () => {
        const tree = mount(withTestTheme(
          <table>
            <tbody>
              <TableExpandableRow renderContent={renderFunction} />
            </tbody>
          </table>,
        ));
        let error;

        try {
          tree.find(TableExpandableRow).simulate('click');
        } catch (err) {
          error = err;
        }

        expect(error).toBe(undefined);
      });

      it('Should update alreadyExpanded state value', () => {
        const WrappingComponent = (props: { children: ReactElement }) => (
          withTestTheme(
            <table>
              <tbody>
                {props.children}
              </tbody>
            </table>,
          )
        );
        const tree = mount(
          <TableExpandableRow renderContent={renderFunction} />,
          {
            wrappingComponent: WrappingComponent,
          },
        );
        const expectedStateBeforeUpdate = {
          alreadyExpanded: false,
          contentHeight: 0,
        };
        const expectedStateAfterUpdate = {
          alreadyExpanded: true,
          contentHeight: 0,
        };

        expect(tree.state()).toEqual(expectedStateBeforeUpdate);
        tree.setProps({ expanded: true });
        expect(tree.state()).toEqual(expectedStateAfterUpdate);
        tree.setProps({ expanded: false });
        expect(tree.state()).toEqual(expectedStateAfterUpdate);
        tree.setProps({ expanded: true });
        expect(tree.state()).toEqual(expectedStateAfterUpdate);
      });

      it('Should update height state value', () => {
        const WrappingComponent = (props: { children: ReactElement }) => (
          withTestTheme(
            <table>
              <tbody>
                {props.children}
              </tbody>
            </table>,
          )
        );
        const tree = mount<TableExpandableRow>(
          <TableExpandableRow renderContent={renderFunction} />,
          {
            wrappingComponent: WrappingComponent,
          },
        );
        const expectedStateBeforeUpdate = {
          alreadyExpanded: false,
          contentHeight: 0,
        };

        const expectedStateAfterUpdate = {
          alreadyExpanded: false,
          contentHeight: 10,
        };

        expect(tree.state()).toEqual(expectedStateBeforeUpdate);
        tree.instance().setHeight(10);
        expect(tree.state()).toEqual(expectedStateAfterUpdate);
      });
    });
  });
});
