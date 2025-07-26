import { useEffect, useMemo, useState } from 'react';
import { ChordFormatter } from './components/ChordFormatter/ChordFormatter';
import fileLoader from './utils/fileLoader';
import rawSongRefiner, { type RefinedSong } from './utils/rawSongRefiner';
import SongSelector from './components/SongSelector/SongSelector';
import { Container, CssBaseline, Stack, ThemeProvider, useColorScheme } from '@mui/material';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import defaultTheme, { blueDarkTheme, blueLightTheme, greenDarkTheme, greenLightTheme, purpleDarkTheme, purpleLightTheme, redDarkTheme, redLightTheme, yellowDarkTheme, yellowLightTheme } from './theme/themes';  
import { PrimaryDarkThemeColor, PrimaryLightThemeColor } from './theme/enums';
import ScrollToggle from './components/ScrollToggle/ScrollToggle';
import FontSizeToggle from './components/FontSizeToggle/FontSizeToggle';
import { CookieAcceptState, CookieKeys } from './enums';
import CookieDialog from './components/CookieDialog/CookieDialog';
function App() {

  const [songs, setSongs] = useState<RefinedSong[]>();
  const [selectedSong, setSelectedSong] = useState<RefinedSong | null>(null);

  const { mode } = useColorScheme();
  const [primaryColor, setPrimaryColor] = useState<PrimaryLightThemeColor | PrimaryDarkThemeColor>(PrimaryDarkThemeColor.GREEN);
  const [colorScheme, setColorScheme] = useState<"dark" | "light" | "system" | undefined>(mode);
  const [defaultFontSize, setDefaultFontSize] = useState<number>(16);
  const [defaultScrollSpeed, setDefaultScrollSpeed] = useState<number>(1);

  const [cookieAcceptState, setCookieAcceptState] = useState<CookieAcceptState>(CookieAcceptState.NONE);

  useEffect(() => {
    let cookiesPresentCheck = false;

    const cookieColor = localStorage.getItem(CookieKeys.PRIMARY_COLOR);

    if (cookieColor) {
      setPrimaryColor(cookieColor as PrimaryLightThemeColor | PrimaryDarkThemeColor);
      cookiesPresentCheck = true;
    }

    const cookieScheme = localStorage.getItem(CookieKeys.COLOR_SCHEME);

    if (cookieScheme) {
      setColorScheme(cookieScheme as "dark" | "light");
      cookiesPresentCheck = true;
    }

    const cookieFontSize = localStorage.getItem(CookieKeys.FONT_SIZE);

    if (cookieFontSize) {
      setDefaultFontSize(parseInt(cookieFontSize));
      cookiesPresentCheck = true;
    }

    const cookieScrollSpeed = localStorage.getItem(CookieKeys.SCROLL_SPEED);

    if (cookieScrollSpeed) {
      setDefaultScrollSpeed(parseInt(cookieScrollSpeed));
      cookiesPresentCheck = true;
    }

    if (cookiesPresentCheck) {
      setCookieAcceptState(CookieAcceptState.ACCEPTED);
    }

  }, []);

  // Dynamically create theme based on primaryColor state
  const theme = useMemo(() => {
    if (colorScheme == "dark") {
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
          return defaultTheme;
      }
    } else {
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
          return greenLightTheme;
      }
    }
  }, [primaryColor, colorScheme]);

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
      loadSongs()
    }
  }, [songs])
    
  if (!songs) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container className="App" maxWidth="md" >
          <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 4, mt: 2 }}>           
            <ThemeToggle cookieAcceptState={cookieAcceptState} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} setColorScheme={setColorScheme} colorScheme={colorScheme} />
            <FontSizeToggle cookieAcceptState={cookieAcceptState} DEFAULT_FONT_SIZE={defaultFontSize}/>
            <ScrollToggle cookieAcceptState={cookieAcceptState} DEFAULT_SCROLL_SPEED={defaultScrollSpeed}/>
          </Stack>
          <SongSelector selectedSong={selectedSong} setSelectedSong={setSelectedSong} songs={songs} />
          <ChordFormatter song={selectedSong} />
        </Container>

        <CookieDialog cookieAcceptState={cookieAcceptState} setCookieAcceptState={setCookieAcceptState} />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App

