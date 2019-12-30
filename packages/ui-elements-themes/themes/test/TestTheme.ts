import { ITheme } from '@relayr/ui-elements-core';

export const TestTheme: ITheme = {
  palette: {
    background: '#background',
    background_inverted: '#background_inverted',
    surface: '#surface',
    midground: '#midground',
    foreground: '#foreground',

    surface_inverted: '#surface_inverted',

    text: '#text',
    text_inverted: '#text_inverted',
    text_highlight: '#text_highlight',

    divider: '#divider',
    divider_inverted: '#divider_inverted',

    hovered: '#hovered',

  // semantic palette

    active: '#active',
    active_hovered: '#active_hovered',
    active_lowered: '#active_lowered',
    active_disabled: '#active_disabled',

    shadow: '#shadow',

    inactive: '#inactive',

    warning: '#warning',
    warning_hovered: '#warning_hovered',
    warning_lowered: '#warning_lowered',

    positive: '#positive',
    positive_hovered: '#positive_hovered',
    positive_lowered: '#positive_lowered',

    negative: '#negative',
    negative_hovered: '#negative_hovered',
    negative_lowered: '#negative_lowered',

    dataPalette: [
      '#4682B4',
      '#1e8675',
      '#7eb828',
      '#fab200',
      '#f88200',
      '#e82928',
      '#db4cb2',
      '#840ea3',
      '#5026ab',
      '#6a3516',
      '#262e39',
      '#506a78',
    ],
  },
  logoURL: 'http://testUrl',
};
