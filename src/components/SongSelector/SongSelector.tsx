import {
  Autocomplete,
  darken,
  lighten,
  styled,
  TextField,
} from '@mui/material';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import type { SongSelectorProps } from './types';
import { useDispatch } from 'react-redux';
import { setFirstChord } from '../../features/Controls/ChordDetailsControl/chordDetailsSlice';

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

const SongSelector = (props: SongSelectorProps) => {
  const { songs, selectedSong, setSelectedSong } = props;

  const dispatch = useDispatch();

  const handleSongSelectorChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: { value: string | undefined; label: string | undefined } | null
  ) => {
    const songId = value?.value;
    const selected = songs?.find((s) => s.id === songId);

    if (selected !== undefined) {
      dispatch(setFirstChord({ root: '', suffix: '' }));
      setSelectedSong(selected);
    }
  };

  return (
    <Autocomplete
      color="primary"
      value={{ label: selectedSong?.id, value: selectedSong?.id }}
      options={songsList(songs)}
      groupBy={(option) => {
        if (option.label === undefined) {
          return 'Ups...';
        }

        return option.label.split(' - ')[0];
      }}
      renderInput={(params) => <TextField {...params} label="Song" />}
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
