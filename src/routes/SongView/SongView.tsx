import { ChordFormatter } from '../../components/ChordFormatter/ChordFormatter';
import SongSelector from '../../features/Songs/SongSelector';
import LoadingSongScreen from './LoadingSongView/LoadingSongView';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const SongView = () => {
  const { selectedSong, songs } = useSelector(
    (state: RootState) => state.songReducer
  );

  if (!songs) {
    return <LoadingSongScreen />;
  }

  return (
    <>
      <SongSelector />
      <ChordFormatter song={selectedSong} />
    </>
  );
};

export default SongView;
