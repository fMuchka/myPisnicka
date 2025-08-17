import {
  Box,
  Stack,
  useColorScheme,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Circle } from '@mui/icons-material';
import {
  ColorScheme,
  PrimaryDarkThemeColor,
  PrimaryLightThemeColor,
} from './theme/enums';
import type { MouseEvent } from 'react';
import { CookieAcceptState, CookieKeys } from '../../Cookies/enums';
import type { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setColorScheme, setPrimaryColor } from './themeSlice';

const ThemeToggle = () => {
  const { colorScheme, primaryColor } = useSelector(
    (state: RootState) => state.themeReducer
  );

  const { cookieAcceptState } = useSelector(
    (state: RootState) => state.cookieReducer
  );

  const dispatch = useDispatch();

  const { setColorScheme: setColorSchemeMUI } = useColorScheme();

  const handleModeChange = (
    _event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    newMode: ColorScheme
  ) => {
    if (newMode == null) return;
    dispatch(setColorScheme(newMode));

    setColorSchemeMUI(newMode);

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.COLOR_SCHEME, newMode);
    }
  };

  const handleColorChange = (
    _event: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    newColor: PrimaryDarkThemeColor | PrimaryLightThemeColor
  ) => {
    if (newColor == null) return;
    dispatch(setPrimaryColor(newColor));

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.PRIMARY_COLOR, newColor);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        minHeight: '56px',
      }}
    >
      <Stack spacing={2}>
        <ToggleButtonGroup
          exclusive
          value={colorScheme}
          color="primary"
          onChange={(e, value) => handleModeChange(e, value as ColorScheme)}
        >
          <ToggleButton value={ColorScheme.LIGHT}>
            <LightModeIcon />
          </ToggleButton>
          <ToggleButton value={ColorScheme.DARK}>
            <DarkModeIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={primaryColor}
          exclusive
          onChange={(e, value) =>
            handleColorChange(
              e,
              value as PrimaryDarkThemeColor | PrimaryLightThemeColor
            )
          }
        >
          {Object.values(
            colorScheme == 'dark'
              ? PrimaryDarkThemeColor
              : PrimaryLightThemeColor
          ).map((color) => (
            <ToggleButton value={color} color="primary" key={color}>
              <Circle sx={{ color: color }} />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
};

export default ThemeToggle;
