import { Box, ToggleButtonGroup, ToggleButton, Accordion, AccordionDetails, AccordionSummary, Typography, Stack, useColorScheme, RadioGroup, Radio } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import PaletteIcon from '@mui/icons-material/Palette';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Circle } from '@mui/icons-material';
import { PrimaryDarkThemeColor, PrimaryLightThemeColor } from "../../theme/enums";
import type { ThemeToggleProps } from "./types";
import type { ChangeEvent } from "react";
import { CookieAcceptState, CookieKeys } from "../../enums";

const ThemeToggle = (props: ThemeToggleProps) => {
  
  const { setColorScheme } = useColorScheme();
  
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: 'light' | 'dark') => {
    props.setColorScheme(newMode);
    setColorScheme(newMode);

    if (props.cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.COLOR_SCHEME, newMode);
    }
  }

  const handleColorChange = (_event: ChangeEvent<HTMLInputElement>, newColor: PrimaryDarkThemeColor | PrimaryLightThemeColor) => {
    props.setPrimaryColor(newColor);

    if (props.cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.PRIMARY_COLOR, newColor);
    }
  }

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
      <Accordion  sx={{ width: "100%" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="theme-content"
          id="theme-header"
        >
          <Typography color="primary" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", placeItems: "center", width: '100%' }}>
              Barva
            <PaletteIcon color="primary" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <ToggleButtonGroup
              aria-labelledby="theme-toggle"
              value={props.colorScheme}
              exclusive
              onChange={handleModeChange}   
            >
              <ToggleButton value="light" aria-label="light">
                <LightModeIcon />
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark">
                <DarkModeIcon />
              </ToggleButton>
            </ToggleButtonGroup>

            <Typography variant="body2" color="text.secondary">
              Primární barva
            </Typography>
            <RadioGroup
              aria-labelledby="color-toggle"
              value={props.primaryColor}
              row
              onChange={(e, value) => handleColorChange(e, value as PrimaryDarkThemeColor | PrimaryLightThemeColor)}
            >
              {Object.values(props.colorScheme == "dark" ? PrimaryDarkThemeColor : PrimaryLightThemeColor).map((color) => (
                <Radio value={color} color="primary" icon={<Circle sx={{ color: color }} />} key={color}>
                </Radio>
              ))}
            </RadioGroup>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default ThemeToggle;