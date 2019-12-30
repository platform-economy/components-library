import * as React from 'react';
import * as TestRenderer from 'react-test-renderer';

import { withI18nContext } from '../story-decorators/WithI18nContext';

describe('ui-elements-core', () => {
  describe('utils', () => {
    describe('WithI18nContext', () => {

      it('should render component with I18N context correctly', () => {
        const tree = TestRenderer
          .create(withI18nContext(() => (<div>Test Component</div>)))
          .toJSON();
        expect(tree).toMatchSnapshot();
      });

    });
  });
});
