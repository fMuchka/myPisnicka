import { createTheme } from '@mui/material';
import { PrimaryDarkThemeColor, PrimaryLightThemeColor } from './enums';

// #region Dark Themes
export const greenDarkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryDarkThemeColor.GREEN,
    },
  },
});

export const blueDarkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryDarkThemeColor.BLUE,
    },
  },
});

export const redDarkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryDarkThemeColor.RED,
    },
  },
});

export const yellowDarkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryDarkThemeColor.YELLOW,
    },
  },
});

export const purpleDarkTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: 'dark',
    primary: {
      main: PrimaryDarkThemeColor.PURPLE,
    },
  },
});

export default greenDarkTheme;

// #region Light Themes
export const greenLightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: PrimaryDarkThemeColor.GREEN,
    },
  },
});

export const blueLightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: PrimaryLightThemeColor.BLUE,
    },
  },
});

export const redLightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: PrimaryLightThemeColor.RED,
    },
  },
});

export const yellowLightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: PrimaryLightThemeColor.YELLOW,
    },
  },
});

export const purpleLightTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    primary: {
      main: PrimaryLightThemeColor.PURPLE,
    },
  },
});
