import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { GroupedInputs } from './index';
import { TextInput } from '../TextInput';
import { InputLabel } from '../InputLabel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../Button';
import styled from 'styled-components';

import {
  faSave,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faSave,
  faTrash,
);

import { text, number, select, boolean } from '@storybook/addon-knobs';

const exampleInfo = `
**description or documentation about GroupedInputs component**

*supports markdown*
`;
type RatioType = [10, 20, 30, 40, 50, 60, 70, 80, 90];
const ratioOptions:RatioType = [10, 20, 30, 40, 50, 60, 70, 80, 90];

const ButtonsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  & button{
    font-size: 1em;
    padding: 5px 10px;
  }
`;

storiesOf('ui-elements-basic/GroupedInputs', module)
  .add('Grouped Inputs Two labels [text]', () => (
    <div style={{ width: `${number('Width', 500)}px` }}>
      <GroupedInputs
        dividerRatio={select('Ratio percentage', ratioOptions, 70)}
        componentsLeft={<TextInput />}
        componentsRight={<TextInput />}
        labelLeft={<InputLabel className="left">
          {text('Label 1 Text', 'Label 1')}
        </InputLabel>}
        labelRight={<InputLabel className="right">
          {text('Label 2 Text ', 'Label 2')}
        </InputLabel>}
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  )
  .add('Grouped Inputs one label [buttons]', () => (
    <div style={{ width: `${number('Width', 500)}px` }}>
      <GroupedInputs
        dividerRatio={select('Ratio percentage', ratioOptions, 80)}
        componentsLeft={<TextInput />}
        componentsRight={
          <ButtonsGroup>
            <Button.Tertiary
              icon={<FontAwesomeIcon icon="save" />}
            />
            <Button.Tertiary
              icon={<FontAwesomeIcon icon="trash" />}
            />
        </ButtonsGroup>}
        labelLeft={<InputLabel>
          {text('Label 1 Text', 'Label 1')}
        </InputLabel>}
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  );
