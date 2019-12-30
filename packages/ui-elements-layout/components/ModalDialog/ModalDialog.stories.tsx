import * as React    from 'react';
import { storiesOf } from '@storybook/react';
import { ModalDialog } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { boolean, text } from '@storybook/addon-knobs';

import { actionWithoutEvent } from '../../../../helpers/storybook-helpers';

library.add(
  faTimes,
);

export const Title = styled.h1`
  padding-top: 12px;
  font-size: 1.5em;
  text-align: center;
  color: white;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: -0.43px;
  text-align: center;
  color: ${props => props.theme.palette.text};
`;

export const Subtitle = styled.h2`
  font-size: .875em;
  font-weight: normal;
  color: white;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.71;
  letter-spacing: -0.43px;
  text-align: center;
  margin-top: -3px;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  color: ${props => props.theme.palette.text};
`;

storiesOf('ui-elements-layout/ModalDialog', module)
  .add('ModalDialog', (() => (
      <ModalDialog
        closeIcon={
          <FontAwesomeIcon icon="times" />
        }
        onCloseClick={actionWithoutEvent('clicked-close-button')}
        header={
          [
            <Title key="title">Title</Title>,
            <Subtitle key="subtitle">Subtitle</Subtitle>,
          ]
        }
      >
        content
      </ModalDialog>

  )))
  .add('ModalDialog show', () => {

    return(
      <ModalDialog
        closeIcon={boolean('Show close icon', false) ? <FontAwesomeIcon icon="times" /> : undefined}
        header={boolean('Show header', false) ?
          [
            <Title key="example-title">{text('Title', 'Example title')}</Title>,
            <Subtitle key="example-subtitle">{text('Subtitle', 'Example subtitle')}</Subtitle>,
          ] : undefined
        }
      >
        {text('Content', 'Example content')}
      </ModalDialog>
    );
  });
