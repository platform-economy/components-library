import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { withUncontrolledValue } from '@relayr/ui-elements-core/utils/withUncontrolledValue';
import { select, boolean } from '@storybook/addon-knobs';
import { decorateAction } from '@storybook/addon-actions';

import { Select, SelectProps } from './index';
const exampleInfo = `
**description or documentation about Select component**

*supports markdown*
`;

const actionWithData = decorateAction([([data]) => [data]]);

const options = [
  { value: 'first_option' },
  { value: 'second_option', caption: 'Second option' },
];

type SelectWithStateProps = SelectProps & {
  value?: string;
  onValueChange?: (value?: string) => void;
};

const NewSelectWithState = withUncontrolledValue()(
  ({ onValueChange, value, ...restProps }: SelectWithStateProps) => {
    const handleChange = (value) => {
      actionWithData('select-value-change')(value);
      onValueChange(value);
    };

    return (
      <Select
        {...restProps}
        onChange={handleChange}
        value={value}
      />
    );
  },
);

storiesOf('ui-elements-basic/Select', module)
  .add('Select', () => (
    <div style={{ width: '370px' }}>
      <Select
        placeholder="Select option"
        placeholderAsOption={boolean('Placeholder as option', false)}
        options={options}
        icon={<FontAwesomeIcon icon={faChevronDown} />}
        value={select(
          'Value',
          ['' as undefined, 'first_option', 'second_option'],
          '',
        )}
        onChange={actionWithData('select-value-change')}
        disabled={boolean('Disabled', false)}
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  )
  .add('Select with state', () => (
    <div style={{ width: '370px' }}>
      <NewSelectWithState
        placeholder="Select option"
        placeholderAsOption={boolean('Placeholder as option', false)}
        options={options}
        icon={<FontAwesomeIcon icon={faChevronDown} />}
        disabled={boolean('Disabled', false)}
      />
    </div>
    ), ({
      info: exampleInfo,
    }),
  );
