import { AppBar, Toolbar, Button } from '@mui/material';
import HideOnScroll from '../../MUIAppBarUtils/HideOnScroll/HideOnScroll';
import { ArrowBack, ArrowForward, Done } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

import { useLocation } from 'react-router';
import { RoutesEnum } from '../../../routes/routes';
import { setSelectedSong } from '../../../features/Songs/songsSlice';
import {
  removeSongFromQueue,
  setCurrentSongIndex,
} from '../../../features/Queue/queueSlice';

const TopBar = () => {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );
  const { selectedSong } = useSelector((state: RootState) => state.songReducer);

  const { queue, currentSongIndex } = useSelector(
    (state: RootState) => state.queueReducer
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const getColor = () => (colorScheme == 'dark' ? primaryColor : '#FFFFFF');

  const handleBackClick = () => {
    if (queue.length > 0) {
      const prevSongIndex = currentSongIndex - 1;

      if (prevSongIndex > -1) {
        dispatch(setSelectedSong(queue[prevSongIndex]));
        dispatch(setCurrentSongIndex(prevSongIndex));
      }
    }
  };

  const handleForwardClick = () => {
    if (queue.length > 0) {
      const nextSongIndex = currentSongIndex + 1;

      if (nextSongIndex < queue.length) {
        dispatch(setSelectedSong(queue[nextSongIndex]));
        dispatch(setCurrentSongIndex(nextSongIndex));
      }
    }
  };

  const songTitleClick = () => {
    if (queue.length > 0 && selectedSong) {
      dispatch(removeSongFromQueue(selectedSong));

      handleForwardClick();
    }
  };

  if (
    location.pathname == RoutesEnum.HOME ||
    location.pathname == RoutesEnum.INFO ||
    location.pathname == RoutesEnum.SETTINGS
  )
    return null;

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar id="toolbar">
          <div
            style={{
              display: location.key === 'default' ? 'none' : 'grid',
              width: '100%',
              maxWidth: '1200px',
              margin: 'auto',
              placeContent: 'space-between',
              gridTemplateAreas: `'menu song other'`,
              gridTemplateColumns: '1fr 3fr 1fr',
            }}
          >
            {currentSongIndex > 0 && location.pathname === RoutesEnum.SONG && (
              <Button
                size="small"
                sx={{
                  justifyContent: 'start',
                  gridArea: 'menu',
                  color: getColor(),
                  fontSize: '10px',
                }}
                startIcon={<ArrowBack />}
                onClick={() => handleBackClick()}
              >
                Fronta
              </Button>
            )}
            <Button
              variant={queue.length === 0 ? 'text' : 'outlined'}
              sx={{
                display: 'flex',
                gridArea: 'song',
                textAlign: 'center',
                alignContent: 'center',
                fontSize: '12px',
                color: getColor(),
              }}
              endIcon={queue.length > 0 && <Done />}
              onClick={() => songTitleClick()}
            >
              {selectedSong?.id}
            </Button>

            {currentSongIndex < queue.length - 1 &&
              location.pathname === RoutesEnum.SONG && (
                <Button
                  size="small"
                  sx={{
                    justifyContent: 'end',
                    gridArea: 'other',
                    color: getColor(),
                    fontSize: '10px',
                  }}
                  endIcon={<ArrowForward />}
                  onClick={() => handleForwardClick()}
                >
                  Fronta
                </Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default TopBar;
