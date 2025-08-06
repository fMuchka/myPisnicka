import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  useColorScheme,
  RadioGroup,
  Radio,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Circle } from '@mui/icons-material';
import {
  ColorScheme,
  PrimaryDarkThemeColor,
  PrimaryLightThemeColor,
} from './theme/enums';
import type { ChangeEvent } from 'react';
import { CookieAcceptState, CookieKeys } from '../../Cookies/enums';
import type { RootState } from '../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setColorScheme, setPrimaryColor } from './themeSlice';
import { ListOfControls } from '../../../components/AppBars/SideBar/enums';
import type { ControlProps } from '../../../components/AppBars/SideBar/types';

const ThemeToggle = (props: ControlProps) => {
  const { colorScheme, primaryColor } = useSelector(
    (state: RootState) => state.themeReducer
  );

  const { cookieAcceptState } = useSelector(
    (state: RootState) => state.cookieReducer
  );

  const dispatch = useDispatch();

  const { setColorScheme: setColorSchemeMUI } = useColorScheme();

  const handleModeChange = (
    _event: ChangeEvent<HTMLInputElement>,
    newMode: ColorScheme
  ) => {
    dispatch(setColorScheme(newMode));

    setColorSchemeMUI(newMode);

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.COLOR_SCHEME, newMode);
    }
  };

  const handleColorChange = (
    _event: ChangeEvent<HTMLInputElement>,
    newColor: PrimaryDarkThemeColor | PrimaryLightThemeColor
  ) => {
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
      <Accordion
        expanded={props.expandedControl === ListOfControls.THEME}
        onChange={() => props.setExpandedControl(ListOfControls.THEME)}
        sx={{ width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="theme-content"
          id="theme-header"
        >
          <Typography
            color="primary"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              placeItems: 'center',
              width: '100%',
            }}
          >
            Barva
            <PaletteIcon color="primary" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Barevné schéma
            </Typography>
            <RadioGroup
              sx={{ display: 'flex', flexDirection: 'row' }}
              aria-labelledby="theme-toggle"
              value={colorScheme}
              onChange={(e, value) => handleModeChange(e, value as ColorScheme)}
            >
              <Radio
                value={ColorScheme.LIGHT}
                aria-label="light"
                icon={<LightModeIcon />}
                checkedIcon={<LightModeIcon />}
              />
              <Radio
                value={ColorScheme.DARK}
                aria-label="dark"
                icon={<DarkModeIcon />}
                checkedIcon={<DarkModeIcon />}
              />
            </RadioGroup>

            <Typography variant="body2" color="text.secondary">
              Primární barva
            </Typography>
            <RadioGroup
              aria-labelledby="color-toggle"
              value={primaryColor}
              row
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
                <Radio
                  value={color}
                  color="primary"
                  icon={<Circle sx={{ color: color }} />}
                  key={color}
                ></Radio>
              ))}
            </RadioGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ThemeToggle;
