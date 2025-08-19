import { ChordFormatter } from '../../components/ChordFormatter/ChordFormatter';
import LoadingSongScreen from './LoadingSongView/LoadingSongView';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import ScrollTop from '../../components/MUIAppBarUtils/ScrollTop/ScrollTop';
import SongPlayer from '../../components/SongPlayer/SongPlayer';

const SongView = () => {
  const { selectedSong, songs } = useSelector(
    (state: RootState) => state.songReducer
  );
  if (!songs) {
    return <LoadingSongScreen />;
  }

  return (
    <>
      <div style={{ marginBottom: '3rem', marginTop: '5rem' }}>
        <SongPlayer />
      </div>
      <ChordFormatter song={selectedSong} />

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
    </>
  );
};

export default SongView;
