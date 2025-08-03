import {
  ArrowDropDown,
  Audiotrack,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  RadioGroup,
  Radio,
  Slider,
} from '@mui/material';
import type { ChangeEvent } from 'react';
import { ChordVisibility, HSystem, Notes } from './enums';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  setTransposition,
  setHSystem,
  setChordVisibility,
} from './chordDetailsSlice';

const ChordDetailsToggle = () => {
  const { hSystem, transposition, chordVisibility, firstChord } = useSelector(
    (state: RootState) => state.chordDetailsReducer
  );
  const dispatch = useDispatch();

  const handleChordVisibilityChange = (
    _event: ChangeEvent<HTMLInputElement>,
    newState: ChordVisibility
  ) => {
    dispatch(setChordVisibility(newState));

    document.documentElement.style.setProperty(
      '--chordVisibility',
      `${newState}`
    );
  };

  const handleHSystemChange = (
    _event: ChangeEvent<HTMLInputElement>,
    newState: HSystem
  ) => {
    dispatch(setHSystem(newState));
  };

  const handleTranspositionChange = (transposition: number) => {
    dispatch(setTransposition(transposition));
  };

  const getTranspositionMarks = () => {
    const notes = [
      { value: -6, label: Notes.F_SHARP },
      { value: -5, label: Notes.G },
      { value: -4, label: Notes.G_SHARP },
      { value: -3, label: Notes.A },
      { value: -2, label: hSystem === HSystem.CZECH ? Notes.B : Notes.A_SHARP },
      { value: -1, label: hSystem === HSystem.CZECH ? 'H' : Notes.B },
      { value: 0, label: Notes.C },
      { value: 1, label: Notes.C_SHARP },
      { value: 2, label: Notes.D },
      { value: 3, label: Notes.D_SHARP },
      { value: 4, label: Notes.E },
      { value: 5, label: Notes.F },
    ];

    const chordIndex = notes.findIndex((e) => e.label === firstChord.root);

    if (chordIndex !== -1) {
      const val = notes[chordIndex].value;
      notes.forEach((e) => {
        e.value += -1 * val;

        if (e.value > 5) {
          e.value += -12;
        }

        if (e.value < -6) {
          e.value += 12;
        }

        e.label += firstChord.suffix;
      });
    }

    return notes;
  };

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
      <Accordion sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            color="primary"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              placeItems: 'center',
              width: '100%',
            }}
          >
            Akordy
            <Audiotrack color="primary" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              Viditelnost
            </Typography>
            <RadioGroup
              sx={{ display: 'flex', flexDirection: 'row' }}
              aria-labelledby="chord-visibility-toggle"
              value={chordVisibility}
              onChange={(e, value) =>
                handleChordVisibilityChange(e, value as ChordVisibility)
              }
            >
              <Radio
                value={ChordVisibility.UNSET}
                aria-label="visible"
                icon={<Visibility />}
                checkedIcon={<Visibility />}
              />
              <Radio
                value={ChordVisibility.HIDDEN}
                aria-label="hidden"
                icon={<VisibilityOff />}
                checkedIcon={<VisibilityOff />}
              />
            </RadioGroup>
            <RadioGroup
              sx={{ display: 'flex', flexDirection: 'row' }}
              aria-labelledby="hSystem-toggle"
              value={hSystem}
              onChange={(e, value) => handleHSystemChange(e, value as HSystem)}
            >
              <Typography variant="body2" color="text.secondary">
                Anglosaské B / A#
                <Radio value={HSystem.WORLD} aria-label="world" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                České/německé H / B
                <Radio value={HSystem.CZECH} aria-label="czech" />
              </Typography>
            </RadioGroup>
            <Typography variant="body2" color="text.secondary">
              Transpozice: {transposition}
            </Typography>

            <Box
              sx={{
                padding: '5px',
                width: '90%',
                display: 'flex',
                alignSelf: 'center',
              }}
            >
              <style>
                {`.MuiSlider-markLabel {
                  font-size: 12px;
                }`}
              </style>
              <Slider
                min={-6}
                max={5}
                marks={getTranspositionMarks()}
                step={1}
                defaultValue={transposition}
                onChange={(_e, value) => handleTranspositionChange(value)}
              />
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ChordDetailsToggle;
