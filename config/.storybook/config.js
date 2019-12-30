import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemes } from 'storybook-styled-components';
import { create as createTheme } from '@storybook/theming';
import { withGlobalStyles } from './addons/global-styles-selector';
import { withBackground } from './addons/surface-selector';
import { withInfo } from '@storybook/addon-info';
import centered from '@storybook/addon-centered/react';

import { LightTheme, DarkTheme, Fonts } from '@relayr/ui-elements-themes';

// automatically import all files ending in *.stories.tsx
const req = require.context('../../packages', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

if (process.env.NODE_ENV === 'production' || process.env.STORYBOOK_WITHINFO === '1') {
  addDecorator(withInfo);
}
addDecorator(withKnobs);
addDecorator(centered);

addParameters({
  options: {
    theme: createTheme({
      base: 'dark',
      /**
       * name to display in the top left corner
       * @type {String}
       */
      brandTitle: 'Relayr UI Elements',
      /**
       * URL for name in top left corner to link to
       * @type {String}
       */
      brandUrl: '#',

    }),
    /**
     * show story component as full screen
     * @type {Boolean}
     */
    isFullscreen: false,
    /**
     * display panel that shows a list of stories
     * @type {Boolean}
     */
    showNav: true,
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: true,
    /**
     * where to show the addon panel
     * @type {('bottom'|'right')}
     */
    panelPosition: 'right',
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\//,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: null,
    /**
     * sidebar tree animations
     * @type {Boolean}
     */
    sidebarAnimations: true,
    /**
     * id to select an addon panel
     * @type {String}
     */
    selectedAddonPanel: undefined, // The order of addons in the "Addon panel" is the same as you import them in 'addons.js'. The first panel will be opened by default as you run Storybook
    /**
     * enable/disable shortcuts
     * @type {Boolean}
     */
    enableShortcuts: false, // true by default
  }
})

addDecorator(withBackground());

const themes = {
  'Dark Theme': DarkTheme,
  'Light Theme': LightTheme,
}
addDecorator(withThemes(themes));

const FontsDecorator = storyFn => (
  <div>
    <Fonts />
    { storyFn() }
  </div>
);
addDecorator(FontsDecorator);
addDecorator(withGlobalStyles);


configure(loadStories, module);
