import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { TestTheme } from '../test';

export const withTestTheme = (Component: React.ReactChild) => (
  <ThemeProvider theme={TestTheme}>
    {Component}
  </ThemeProvider>
);

export const withTestThemeWrapper =  (props: { children: React.ReactElement }) => (
  <ThemeProvider theme={TestTheme}>
    {props.children}
  </ThemeProvider>
);
