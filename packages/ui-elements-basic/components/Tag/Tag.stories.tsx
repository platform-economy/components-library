import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select } from '@storybook/addon-knobs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from './Tag';

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

const exampleInfo = `
  Single stateless Tag component
`;

const modes = ['basic', 'selected', 'removing'];

storiesOf('ui-elements-basic/Tag', module)
  .add('default', () => (
    <div style={{ fontSize: `${number('Font size', 32)}px` }}>
      <Tag
        tagId="test"
        title={text('Text', 'Test')}
        removeIcon={<FontAwesomeIcon className="removeIcon" icon="times" />}
        selected={select('Mode', modes, 'basic') === 'selected'}
        removing={select('Mode', modes, 'basic') === 'removing'}
        content={text('Text', 'Test')}
        onClick={actionWithoutEvent('onClick')}
      >
        <span>{text('Text', 'Test')}</span>
      </Tag>
    </div>
    ), ({
      info: exampleInfo,
    }),
  )
  .add('with formatted text', () => (
    <div style={{ fontSize: `${number('Font size', 32)}px` }}>
      <Tag
        tagId="test"
        removeIcon={<FontAwesomeIcon className="removeIcon" icon="times" />}
        selected={select('Mode', modes, 'basic') === 'selected'}
        removing={select('Mode', modes, 'basic') === 'removing'}
      >
        <strong>strong</strong>&nbsp;<em>emphasis</em>
      </Tag>
    </div>
    ), ({
      info: exampleInfo,
    }),
  );
