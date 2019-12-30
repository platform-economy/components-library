import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';

import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import { withI18nContext } from '../../utils/story-decorators/WithI18nContext';

import translations from '@relayr/ui-elements-i18n';

import { Label } from './label';

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: 'pl',
  });

storiesOf('ui-elements-basic/Label', module)
  .addDecorator(withI18nContext)
  .add('With i18n', () => (
    <Label
      title={text('Title', 'Label Editable Text')}
    />
  ));
