import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breadcrumb } from './index';
import { boolean } from '@storybook/addon-knobs';

const exampleInfo = `
**description or documentation about Breadcrumb component**

*supports markdown*
`;

storiesOf('ui-elements-navigation/Breadcrumb', module)
  .add('Breadcrumb', () => (
    <Breadcrumb
      divider={
        <FontAwesomeIcon icon={faChevronRight} />}
    >
      <Breadcrumb.Item isCurrent={boolean('Devices is current', false)}>
        Devices
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent={boolean('Nodes is current', true)}>
        Nodes
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent={boolean('Maps is current', false)}>
        Maps
      </Breadcrumb.Item>
      <Breadcrumb.Item isCurrent={boolean('Modules is current', false)}>
        Modules
      </Breadcrumb.Item>
    </Breadcrumb>
    ), ({
      info: exampleInfo,
    }),
  );
