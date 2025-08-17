import { Remove, Add } from '@mui/icons-material';
import {
  Box,
  ButtonGroup,
  Button,
  Stack,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useEffect, type MouseEvent } from 'react';
import { CookieAcceptState, CookieKeys } from '../../Cookies/enums';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  decrementFontSize,
  incrementFontSize,
  resetFontSize,
  initialState,
  decrementChordSize,
  incrementChordSize,
  resetChordSize,
  setChordPosition,
} from './fontSizeSlice';

const FontSizeToggle = () => {
  const { fontSize, chordPosition, chordSize } = useSelector(
    (state: RootState) => state.fontSizeReducer
  );
  const { cookieAcceptState } = useSelector(
    (state: RootState) => state.cookieReducer
  );
  const dispatch = useDispatch();

  const changeChordPosition = (
    _e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    value: typeof initialState.chordPosition
  ) => {
    if (value == null) return;
    dispatch(setChordPosition(value));
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--fontSize', `${fontSize}px`);

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.FONT_SIZE, fontSize.toString());
    }
  }, [fontSize, cookieAcceptState]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--chordFontSize',
      `${chordSize}px`
    );

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.CHORD_SIZE, chordSize.toString());
    }
  }, [chordSize, cookieAcceptState]);

  useEffect(() => {
    let chordWidth, chordTopPositionMultiplier: string;
    if (chordPosition === 'above') {
      chordWidth = '0';
      chordTopPositionMultiplier = '-1.75';
    } else {
      chordWidth = 'unset';
      chordTopPositionMultiplier = '0';
    }
    document.documentElement.style.setProperty('--chordWidth', chordWidth);
    document.documentElement.style.setProperty(
      '--chordTopPositionMultiplier',
      chordTopPositionMultiplier
    );

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.CHORD_POSITION, chordPosition.toString());
    }
  }, [chordPosition, cookieAcceptState]);

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
      <Stack spacing={4} direction={'column'}>
        <Stack spacing={2}>
          <Typography>Velikost písma: {fontSize}px</Typography>
          <ButtonGroup>
            <Button
              disabled={fontSize === initialState.fontSize}
              onClick={() => dispatch(resetFontSize())}
            >
              Reset
            </Button>
            <Button
              disabled={fontSize === 5}
              onClick={() => dispatch(decrementFontSize())}
            >
              <Remove />
            </Button>
            <Button onClick={() => dispatch(incrementFontSize())}>
              <Add />
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack spacing={2}>
          <Typography>Velikost akordů: {chordSize}px</Typography>
          <ButtonGroup>
            <Button
              disabled={chordSize === initialState.chordSize}
              onClick={() => dispatch(resetChordSize())}
            >
              Reset
            </Button>
            <Button
              disabled={chordSize === 5}
              onClick={() => dispatch(decrementChordSize())}
            >
              <Remove />
            </Button>
            <Button onClick={() => dispatch(incrementChordSize())}>
              <Add />
            </Button>
          </ButtonGroup>
        </Stack>
        <ToggleButtonGroup
          exclusive
          value={chordPosition}
          color="primary"
          onChange={(e, value) =>
            changeChordPosition(e, value as typeof initialState.chordPosition)
          }
        >
          <ToggleButton value={'above'}>Akordy nad textem</ToggleButton>
          <ToggleButton value={'inline'}>Akordy v textu</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
};

export default FontSizeToggle;
