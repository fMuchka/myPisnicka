import {
  Autocomplete,
  darken,
  lighten,
  styled,
  TextField,
} from '@mui/material';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetCurrentChords,
  setFirstChordRoot,
  setFirstChordSuffix,
} from '../../features/Controls/ChordDetailsControl/chordDetailsSlice';
import type { RootState } from '../../app/store';
import { setSelectedSong } from './songsSlice';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles('dark', {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

const SongSelector = () => {
  const { selectedSong, songs } = useSelector(
    (state: RootState) => state.songReducer
  );

  const dispatch = useDispatch();

  const handleSongSelectorChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: { value: string | undefined; label: string | undefined } | null
  ) => {
    const songId = value?.value;
    const selected = songs?.find((s) => s.id === songId);

    if (selected !== undefined) {
      dispatch(setFirstChordRoot(''));
      dispatch(setFirstChordSuffix(''));
      dispatch(resetCurrentChords());
      dispatch(setSelectedSong(selected));
    }
  };

  return (
    <Autocomplete
      color="primary"
      value={{ label: selectedSong?.id, value: selectedSong?.id }}
      options={songsList(songs as RefinedSong[])}
      groupBy={(option) => {
        if (option.label === undefined) {
          return 'Ups...';
        }

        const authorWithSongNumber: string = option.label.split(' - ')[0];
        const delimiterPosition = authorWithSongNumber.indexOf(')');
        const author = authorWithSongNumber
          .substring(delimiterPosition + 1)
          .trim();

        return author;
      }}
      renderInput={(params) => <TextField {...params} label="Píseň" />}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      onChange={handleSongSelectorChange}
    />
  );
};

function songsList(songs: RefinedSong[]) {
  return songs.map((song) => ({
    label: song.id,
    value: song.id,
  }));
}

export default SongSelector;
