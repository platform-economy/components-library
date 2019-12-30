import { withTestTheme } from '../withTestTheme';
import * as React from 'react';
import * as enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as TestRenderer from 'react-test-renderer';

import 'jest-styled-components';

enzyme.configure({ adapter: new Adapter() });

describe('ui-elements-themes', () => {
  describe('withTestTheme', () => {

    it('should be defined', () => {
      expect(withTestTheme).toBeDefined();
    });

    it('should wrap theme correctly', () => {
      const tree = TestRenderer
        .create(withTestTheme((
          <div/>
        )))
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
