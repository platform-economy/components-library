import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';

import { createMediaQuery, sizesMapDefault } from './MediaQuery';

const exampleInfo = `
~~~js
<MediaQuery>{ component }</MediaQuery>

MediaQuery's purpose is to adjust child component to the screen size.
~~~
`;

enum CustomSizes {
  iPhone = 'iPhone',
  HD = 'HD',
  HD4k = 'HD4k',
}

const sizesMapCustom = new Map<CustomSizes, number>();

sizesMapCustom.set(CustomSizes.iPhone, 375);
sizesMapCustom.set(CustomSizes.HD, 1280);
sizesMapCustom.set(CustomSizes.HD4k, 3840);

const MediaQueryDefault = createMediaQuery(sizesMapDefault);
const MediaQueryCustom = createMediaQuery(sizesMapCustom);

const sizesMapKnob = (size:'default'|'custom') => {
  const sizes = { };
  size === 'default'
    ? sizesMapDefault.forEach((value, key) => sizes[value] = key)
    : sizesMapCustom.forEach((value, key) => sizes[value] = key);
  return sizes;
};

const conditionForDefault = (size:'min'|'max') => {
  const min = size === 'min';

  return boolean(`has ${size}imum size`, true)
  ? select(
      `${size}imum screen size`,
      sizesMapKnob('default'),
      min ? 'S' : 'XL')
  : undefined;
};

const conditionForCustom = (size:'min'|'max') => {
  const min = size === 'min';

  return boolean(`has ${size}imum size`, true)
  ? select(
      `${size}imum screen size`,
      sizesMapKnob('custom'),
      min ? CustomSizes.iPhone : CustomSizes.HD)
  : undefined;
};

storiesOf('ui-elements-basic/MediaQuery', module)
  .addParameters({
    info: exampleInfo,
  })
  .add('for display purpose', () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <MediaQueryDefault
        max={'S'}
      >
        <div style={{ padding: '20px', backgroundColor: 'red', borderRadius: '10px' }}>
          Visible under S screen display size
        </div>
      </MediaQueryDefault>
      <MediaQueryDefault
        min={'S'}
        max={'M'}
      >
        <div style={{ padding: '20px', backgroundColor: 'orange', borderRadius: '10px'  }}>
          Visible between S and M screen display size
        </div>
      </MediaQueryDefault>
      <MediaQueryDefault
        min={'M'}
        max={'L'}
      >
        <div style={{ padding: '20px', backgroundColor: 'yellow', borderRadius: '10px'  }}>
          Visible between M and L screen display size
        </div>
      </MediaQueryDefault>
      <MediaQueryDefault
        min={'L'}
        max={'XL'}
      >
        <div style={{ padding: '20px', backgroundColor: 'green', borderRadius: '10px'  }}>
          Visible between L and XL screen display size
        </div>
      </MediaQueryDefault>
      <MediaQueryDefault
        min={'XL'}
      >
        <div style={{ padding: '20px', backgroundColor: 'blue', borderRadius: '10px'  }}>
          Visible above XL screen display size
        </div>
      </MediaQueryDefault>
      <MediaQueryDefault
      >
        <div style={{ padding: '20px', backgroundColor: 'magenta', borderRadius: '10px' }}>
          Always visible
        </div>
      </MediaQueryDefault>
    </div>
  ))
  .add('with default size options', () => (
    <div>
      <MediaQueryDefault
        min={conditionForDefault('min')}
        max={conditionForDefault('max')}
      >
        <div style={{ padding: '20px', backgroundColor: 'grey', borderRadius: '10px' }}>
          <p>This should be visible, when those conditions are met:</p>
            <ul>
              <li>minimum screen width - {conditionForDefault('min') || 'any'} </li>
              <li>maximum screen width - {conditionForDefault('max') || 'any'} </li>
            </ul>
        </div>
      </MediaQueryDefault>
    </div>
  ))
  .add('with custom size options', () => (
    <div>
      <MediaQueryCustom
        min={conditionForCustom('min')}
        max={conditionForCustom('max')}
      >
        <div style={{ padding: '20px', backgroundColor: 'grey', borderRadius: '10px' }}>
          <p>This should be visible, when those conditions are met:</p>
            <ul>
              <li>minimum screen width - {conditionForCustom('min') || 'any'} </li>
              <li>maximum screen width - {conditionForCustom('max') || 'any'} </li>
            </ul>
        </div>
      </MediaQueryCustom>
    </div>
  ));
