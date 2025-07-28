import { useEffect, useMemo, useState } from 'react';
import { ChordFormatter } from './components/ChordFormatter/ChordFormatter';
import fileLoader from './utils/fileLoader';
import rawSongRefiner, { type RefinedSong } from './utils/rawSongRefiner';
import SongSelector from './components/SongSelector/SongSelector';
import { AppBar, Button, Container, CssBaseline, Divider, Drawer, Fab, Skeleton, Stack, ThemeProvider, Toolbar, useColorScheme } from '@mui/material';
import ThemeToggle from './components/Controls/ThemeToggle/ThemeToggle';
import defaultTheme, { blueDarkTheme, blueLightTheme, greenDarkTheme, greenLightTheme, purpleDarkTheme, purpleLightTheme, redDarkTheme, redLightTheme, yellowDarkTheme, yellowLightTheme } from './theme/themes';  
import { PrimaryDarkThemeColor, PrimaryLightThemeColor } from './theme/enums';
import ScrollToggle from './components/Controls/ScrollToggle/ScrollToggle';
import FontSizeToggle from './components/Controls/FontSizeToggle/FontSizeToggle';
import { CookieAcceptState, CookieKeys } from './enums';
import CookieDialog from './components/CookieDialog/CookieDialog';
import ChordDetailsToggle from './components/Controls/ChordDetailsToggle/ChordDetailsToggle';
import { HSystem } from './components/Controls/ChordDetailsToggle/enums';
import { KeyboardArrowUp, Menu } from "@mui/icons-material"
import HideOnScroll from './components/MUIAppBarUtils/HideOnScroll/HideOnScroll';
import ScrollTop from './components/MUIAppBarUtils/ScrollTop/ScrollTop';

function App() {

  const [songs, setSongs] = useState<RefinedSong[]>();
  const [selectedSong, setSelectedSong] = useState<RefinedSong | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { mode } = useColorScheme();
  const [primaryColor, setPrimaryColor] = useState<PrimaryLightThemeColor | PrimaryDarkThemeColor>(PrimaryDarkThemeColor.GREEN);
  const [colorScheme, setColorScheme] = useState<"dark" | "light" | "system" | undefined>(mode);
  const [defaultFontSize, setDefaultFontSize] = useState<number>(16);
  const [defaultScrollSpeed, setDefaultScrollSpeed] = useState<number>(1);
  const [transposition, setTransposition] = useState<number>(0);
  const [hSystem, setHSystem] = useState<HSystem>(HSystem.CZECH);


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
    return (
      <>
        <Stack spacing={2} alignItems={"center"}>
          <Skeleton variant="rectangular" height={50} width={"100%"} />
          <Skeleton variant="rounded" height={50} width={"80%"} />

          <Stack spacing={3} alignItems={"center"} width={"100%"}>
            <Skeleton variant="rounded" height={200} width={"80%"} />
            <Skeleton variant="rounded" height={200} width={"80%"} />
          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <HideOnScroll>
          <AppBar>
            <Toolbar id="toolbar">
              <>   
                <Drawer
                  anchor={"right"}
                  open={openDrawer}
                  onClose={ () => setOpenDrawer(false)}
                >
                  {
                    <>
                      <ThemeToggle cookieAcceptState={cookieAcceptState} primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} setColorScheme={setColorScheme} colorScheme={colorScheme} />
                      <Divider > </Divider>
                      <ChordDetailsToggle hSystem={hSystem} setHSystem={setHSystem} transposition={transposition} setTransposition={setTransposition} />
                      <FontSizeToggle cookieAcceptState={cookieAcceptState} DEFAULT_FONT_SIZE={defaultFontSize}/>
                      <ScrollToggle cookieAcceptState={cookieAcceptState} DEFAULT_SCROLL_SPEED={defaultScrollSpeed} />
                    </>
                  }
                </Drawer>
              </>
              <div style={{ display: "grid", gridTemplateColumns: "50px 200px 60px", width: "100%", placeContent: "space-between" }}>       
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill={colorScheme == "dark" ? primaryColor : "#FFFFFF"}>
                  <path d="M486-333q41 0 70-28.42T585-431v-252h116v-60H545v237q-11-9-26.32-14T486-525q-39.06 0-66.03 27.37-26.97 27.36-26.97 67Q393-391 419.97-362q26.97 29 66.03 29ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z" />
                </svg>

                <Button disabled size='small' sx={{ display: "flex", justifyContent: "center" }}>
                  Zapni posun (TBD)
                </Button>
                
                <Button size='small' sx={{ display: "flex", justifyContent: "center" }} onClick={() => setOpenDrawer(true)}>
                  <Menu />
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Container className="App" maxWidth="md" sx={{marginTop: "5rem"}} >
          
          <SongSelector selectedSong={selectedSong} setSelectedSong={setSelectedSong} songs={songs} />
          <ChordFormatter hSystem={hSystem} song={selectedSong} transposition={transposition} />
        </Container>

        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top" id="back-to-top-button" color='primary'>
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>

        <CookieDialog cookieAcceptState={cookieAcceptState} setCookieAcceptState={setCookieAcceptState} />
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App

