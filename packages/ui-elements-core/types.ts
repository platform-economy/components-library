
export interface IThemeColors {
  background?: string;
  background_inverted?: string;
  surface?: string;
  midground?: string;
  foreground?: string;

  surface_inverted?: string;

  text?: string;
  text_inverted?: string;
  text_highlight?: string;

  divider?: string;
  divider_inverted?: string;

  hovered?: string;

// semantic palette

  active?: string;
  active_hovered?: string;
  active_lowered?: string;
  active_disabled?: string;

  shadow?: string;

  inactive?: string;

  warning?: string;
  warning_hovered?: string;
  warning_lowered?: string;

  positive?: string;
  positive_hovered?: string;
  positive_lowered?: string;

  negative?: string;
  negative_hovered?: string;
  negative_lowered?: string;

  dataPalette?: string | string[];
}
export interface ITheme {
  palette: IThemeColors;
  logoURL?: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
