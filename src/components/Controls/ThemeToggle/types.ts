import type { CookieAcceptState } from '../../../enums';
import type {
  PrimaryLightThemeColor,
  PrimaryDarkThemeColor,
} from '../../../theme/enums';

export type ThemeToggleProps = {
  primaryColor: PrimaryLightThemeColor | PrimaryDarkThemeColor;
  setPrimaryColor: (
    color: PrimaryLightThemeColor | PrimaryDarkThemeColor
  ) => void;
  setColorScheme: (scheme: 'dark' | 'light' | 'system') => void;
  colorScheme: 'dark' | 'light' | 'system' | undefined;
  cookieAcceptState: CookieAcceptState;
};
