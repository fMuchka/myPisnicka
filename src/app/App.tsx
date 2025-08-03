import { useEffect, useMemo, useState } from 'react';
import { ChordFormatter } from '../components/ChordFormatter/ChordFormatter';
import fileLoader from '../utils/fileLoader';
import rawSongRefiner, { type RefinedSong } from '../utils/rawSongRefiner';
import SongSelector from '../components/SongSelector/SongSelector';
import {
  Container,
  CssBaseline,
  Fab,
  ThemeProvider,
  useColorScheme,
} from '@mui/material';
import defaultTheme, {
  blueDarkTheme,
  blueLightTheme,
  greenDarkTheme,
  greenLightTheme,
  purpleDarkTheme,
  purpleLightTheme,
  redDarkTheme,
  redLightTheme,
  yellowDarkTheme,
  yellowLightTheme,
} from '../features/Controls/ThemeControl/theme/themes';
import {
  ColorScheme,
  PrimaryDarkThemeColor,
  PrimaryLightThemeColor,
} from '../features/Controls/ThemeControl/theme/enums';
import { CookieAcceptState, CookieKeys } from '../features/Cookies/enums';
import CookieDialog from '../features/Cookies/CookieDialog';
import { KeyboardArrowUp } from '@mui/icons-material';
import ScrollTop from '../components/MUIAppBarUtils/ScrollTop/ScrollTop';
import LoadingSongScreen from '../components/LoadingSongScreen/LoadingSongScreen';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import {
  setColorScheme,
  setPrimaryColor,
} from '../features/Controls/ThemeControl/themeSlice';
import TopBar from '../components/AppBars/TopBar/TopBar';

import {
  setScrollSpeed,
  stopScroll,
} from '../features/Controls/ScrollControl/scrollSlice';
import { setFontSize } from '../features/Controls/FontSizeControl/fontSizeSlice';
import { updateCookieAcceptState } from '../features/Cookies/cookieSlice';

function App() {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );
  const { isScrolling } = useSelector(
    (state: RootState) => state.scrollReducer
  );
  const dispatch = useDispatch();

  const { setColorScheme: setColorSchemeMUI } = useColorScheme();

  const [songs, setSongs] = useState<RefinedSong[]>();
  const [selectedSong, setSelectedSong] = useState<RefinedSong | null>(null);

  useEffect(() => {
    let cookiesPresentCheck = false;
    const cookieColor = localStorage.getItem(CookieKeys.PRIMARY_COLOR);
    if (cookieColor) {
      dispatch(
        setPrimaryColor(
          cookieColor as PrimaryLightThemeColor | PrimaryDarkThemeColor
        )
      );
      cookiesPresentCheck = true;
    }
    const cookieScheme = localStorage.getItem(CookieKeys.COLOR_SCHEME);
    if (cookieScheme) {
      dispatch(setColorScheme(cookieScheme as ColorScheme));
      cookiesPresentCheck = true;
    }
    const cookieFontSize = localStorage.getItem(CookieKeys.FONT_SIZE);
    if (cookieFontSize) {
      setFontSize(parseInt(cookieFontSize));
      cookiesPresentCheck = true;
    }
    const cookieScrollSpeed = localStorage.getItem(CookieKeys.SCROLL_SPEED);
    if (cookieScrollSpeed) {
      setScrollSpeed(parseInt(cookieScrollSpeed));
      cookiesPresentCheck = true;
    }
    if (cookiesPresentCheck) {
      dispatch(updateCookieAcceptState(CookieAcceptState.ACCEPTED));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isScrolling) return;

    let lastScrollY = window.scrollY;
    const handleUserScroll = () => {
      // If scroll position changes by user, stop autoscroll
      if (Math.abs(window.scrollY - lastScrollY) > 10) {
        dispatch(stopScroll());
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });
    window.addEventListener('keydown', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      window.removeEventListener('keydown', handleUserScroll);
    };
  }, [isScrolling, dispatch]);

  // Dynamically create theme based on primaryColor state
  const theme = useMemo(() => {
    if (colorScheme == 'dark') {
      setColorSchemeMUI('dark');
      switch (primaryColor) {
        case PrimaryDarkThemeColor.BLUE:
          return blueDarkTheme;
        case PrimaryDarkThemeColor.GREEN:
          return greenDarkTheme;
        case PrimaryDarkThemeColor.RED:
          return redDarkTheme;
        case PrimaryDarkThemeColor.YELLOW:
          return yellowDarkTheme;
        case PrimaryDarkThemeColor.PURPLE:
          return purpleDarkTheme;

        default:
          dispatch(setPrimaryColor(PrimaryDarkThemeColor.GREEN));
          return defaultTheme;
      }
    } else {
      setColorSchemeMUI('light');
      switch (primaryColor) {
        case PrimaryLightThemeColor.BLUE:
          return blueLightTheme;
        case PrimaryLightThemeColor.GREEN:
          return greenLightTheme;
        case PrimaryLightThemeColor.RED:
          return redLightTheme;
        case PrimaryLightThemeColor.YELLOW:
          return yellowLightTheme;
        case PrimaryLightThemeColor.PURPLE:
          return purpleLightTheme;

        default:
          dispatch(setPrimaryColor(PrimaryLightThemeColor.GREEN));
          return greenLightTheme;
      }
    }
  }, [primaryColor, colorScheme, dispatch, setColorSchemeMUI]);

  useEffect(() => {
    async function loadSongs() {
      const refinedSongs: RefinedSong[] = [];

      const songsRaw = await fileLoader.loadFiles();
      songsRaw.forEach((rawSong) => {
        refinedSongs.push(rawSongRefiner.refine(rawSong));
      });

      setSongs(refinedSongs);
      setSelectedSong(refinedSongs[0]);
    }

    if (!songs) {
      loadSongs();
    }
  }, [songs]);

  if (!songs) {
    return <LoadingSongScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <TopBar />

        <Container maxWidth="md" sx={{ marginTop: '5rem' }}>
          <SongSelector
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            songs={songs}
          />
          <ChordFormatter song={selectedSong} />
        </Container>

        <ScrollTop>
          <Fab
            size="small"
            aria-label="scroll back to top"
            id="back-to-top-button"
            color="primary"
          >
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>

        <CookieDialog />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
