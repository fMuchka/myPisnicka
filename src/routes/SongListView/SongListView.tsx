import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {
  Button,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import { setSelectedSong } from '../../features/Songs/songsSlice';

import { indigo, red, pink, green } from '@mui/material/colors';
import { ColorScheme } from '../../features/Controls/ThemeControl/theme/enums';
import { useEffect, useState } from 'react';

enum SongTags {
  CESKE = 'České',
  PLOUZAK = 'Ploužák',
  TABOROVA = 'Táborová',
  POHADKY = 'Pohádky',
}

const TAG_COLOR_MAP = (tag: SongTags, scheme: ColorScheme): string => {
  switch (tag) {
    case SongTags.CESKE:
      return scheme === ColorScheme.LIGHT ? indigo[900] : indigo[100];

    case SongTags.PLOUZAK:
      return scheme === ColorScheme.LIGHT ? red[900] : red[100];

    case SongTags.TABOROVA:
      return scheme === ColorScheme.LIGHT ? pink[900] : pink[100];

    case SongTags.POHADKY:
      return scheme === ColorScheme.LIGHT ? green[900] : green[100];
  }

  return 'gold';
};

const SongListView = () => {
  const { songs } = useSelector((state: RootState) => state.songReducer);

  const { colorScheme } = useSelector((state: RootState) => state.themeReducer);
  const [tagFilter, setTagFilter] = useState<SongTags[]>([]);
  const [displaySongs, setDisplaySongs] = useState<RefinedSong[]>(songs ?? []);
  const [shouldIncludeAllFilters, setShouldIncludeAllFilters] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSongClick = (song: RefinedSong) => {
    navigate('/my-pisnicka/', { viewTransition: true });
    dispatch(setSelectedSong(song));
  };

  const filterByTag = (tag: SongTags) => {
    if (tagFilter.includes(tag)) {
      setTagFilter((prev) => prev.filter((e) => e !== tag));
    } else {
      setTagFilter((prev) => [...prev, tag]);
    }
  };

  function songNameSorter(a: RefinedSong, b: RefinedSong) {
    const songA = a.id.toUpperCase(); // ignore upper and lowercase
    const songB = b.id.toUpperCase(); // ignore upper and lowercase
    if (songA < songB) {
      return -1;
    }
    if (songA > songB) {
      return 1;
    }

    // names must be equal
    return 0;
  }

  useEffect(() => {
    if (tagFilter.length > 0) {
      const filtered: RefinedSong[] = [];
      songs?.forEach((s) => {
        const matchesAtLeastOneFilter = s.tags.some((t) =>
          tagFilter.includes(t as SongTags)
        );
        if (shouldIncludeAllFilters) {
          const matchesAllFilters = tagFilter.every((tF) =>
            s.tags.includes(tF)
          );

          if (tagFilter.length === 1 && matchesAtLeastOneFilter) {
            filtered.push(s);
          }

          if (tagFilter.length > 1 && matchesAllFilters) {
            filtered.push(s);
          }
        } else {
          if (matchesAtLeastOneFilter) {
            filtered.push(s);
          }
        }
      });

      filtered.sort((a, b) => songNameSorter(a, b));
      setDisplaySongs(filtered);
    } else {
      setDisplaySongs(songs ?? []);
    }
  }, [tagFilter, songs, shouldIncludeAllFilters]);

  return (
    <>
      <Stack spacing={5} direction={'row'}>
        <Stack spacing={2} direction={'column'}>
          <Typography variant="body1" color="text.secondary">
            Filtr
          </Typography>
          <RadioGroup
            sx={{ display: 'flex', flexDirection: 'column' }}
            aria-labelledby="tag filter type"
            value={shouldIncludeAllFilters}
            onChange={() =>
              setShouldIncludeAllFilters(!shouldIncludeAllFilters)
            }
          >
            <Typography variant="body2">
              <Radio value={true} aria-label="should include all tags" />
              Má všechny
            </Typography>
            <Typography variant="body2">
              <Radio value={false} aria-label="should include at least one" />
              Má aspoň jeden
            </Typography>
          </RadioGroup>
        </Stack>

        <Stack spacing={2} width={'50%'}>
          {Object.values(SongTags).map((t, tIdx) => (
            <Chip
              size="small"
              variant={tagFilter.includes(t) ? 'filled' : 'outlined'}
              sx={{
                color: TAG_COLOR_MAP(t as SongTags, colorScheme),
                marginLeft: '0.5em',
              }}
              onClick={() => filterByTag(t)}
              label={t}
              key={tIdx}
            />
          ))}
        </Stack>
      </Stack>

      <Divider sx={{ margin: '0.5rem 0 2rem 0' }}></Divider>
      <Stack spacing={2} marginBottom={5}>
        {displaySongs?.map((song, idx) => (
          <Button
            sx={{ placeContent: 'space-between', textAlign: 'start' }}
            key={idx}
            onClick={() => handleSongClick(song)}
            fullWidth
          >
            {song.id}
            <Stack direction={'row'} justifyContent={'right'}>
              {song.tags.map((t, tIdx) => (
                <Chip
                  size="small"
                  variant={'filled'}
                  sx={{
                    color: TAG_COLOR_MAP(t.trim() as SongTags, colorScheme),
                    marginLeft: '0.5em',
                  }}
                  label={t}
                  key={tIdx}
                />
              ))}
            </Stack>
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default SongListView;
