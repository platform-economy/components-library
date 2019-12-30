import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';
import 'jest-styled-components';

import { BrandLogo } from '../index';

import { withTestTheme } from '@relayr/ui-elements-themes';

describe('ui-elements-basic', () => {
  describe('Components', () => {
    describe('BrandLogo', () => {
      it('should render with an img property', () => {
        const tree = TestRenderer
          .create(withTestTheme((
          <BrandLogo img="http://tv.proximetry.com/assets/images/relayr_logo_white.png" />
          )))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render without an img property', () => {
        const tree = TestRenderer
          .create(withTestTheme((
          <BrandLogo />
          )))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
      it('should render smaller if isMobile is set', () => {
        const tree = TestRenderer
          .create(withTestTheme((
          <BrandLogo isMobile={true} />
          )))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
    });
  });
});
