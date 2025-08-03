import type { ChordProps } from './types';
import styles from './Chord.module.css';
import { Box, Divider, Modal, Stack, Typography } from '@mui/material';
import {
  Notes,
  HSystem,
} from '../../features/Controls/ChordDetailsControl/enums';
import { useState } from 'react';

// @ts-expect-error TODO: Fix types import
import TomChord from '@tombatossals/react-chords/lib/Chord';
import guitarChords from '@tombatossals/chords-db/lib/guitar.json';
import type { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstChord } from '../../features/Controls/ChordDetailsControl/chordDetailsSlice';

const Chord = (props: ChordProps) => {
  const {
    hSystem,
    transposition: semitones,
    firstChord,
  } = useSelector((state: RootState) => state.chordDetailsReducer);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [diagramChord, setDiagramChord] = useState<string>('');

  const handleClickRichDisplay = (chord: string) => {
    setOpenModal(true);
    setDiagramChord(chord);
  };

  const plainDisplay = (chord: string) => (
    <span className={styles.chord}>{chord}</span>
  );

  const richDisplay = (chord: string) => (
    <span
      className={styles.chord}
      onClick={() => handleClickRichDisplay(chord)}
    >
      {chord}
    </span>
  );

  function transposeChord() {
    const { chord } = props;

    // mapping flats → sharps for lookup
    const enharmonicMap: { [key: string]: string } = {
      Db: Notes.C_SHARP,
      Eb: Notes.D_SHARP,
      Gb: Notes.F_SHARP,
      Ab: Notes.G_SHARP,
      Bb: Notes.A_SHARP,
    };

    // Czech input → internal sharp names
    const inputMap: { [key: string]: string } = {
      H: Notes.B,
      [Notes.B]: Notes.A_SHARP,
    };

    // internal → Czech output names
    const outputMap: { [key: string]: string } = {
      [Notes.A_SHARP]: Notes.B,
      [Notes.B]: 'H',
    };

    // canonical sharp-based chromatic scale
    const notes = [
      Notes.C,
      Notes.C_SHARP,
      Notes.D,
      Notes.D_SHARP,
      Notes.E,
      Notes.F,
      Notes.F_SHARP,
      Notes.G,
      Notes.G_SHARP,
      Notes.A,
      Notes.A_SHARP,
      Notes.B,
    ];

    // split root (e.g. "Eb", "F#") from the rest ("m7", "maj")
    const match = chord.match(/^([A-H][b#]?)(.*)$/);
    if (!match) {
      // throw new Error(`Invalid chord format: "${chord}"`);
      return plainDisplay(chord);
    }
    // eslint-disable-next-line prefer-const
    let [, root, suffix] = match;

    if (firstChord.root === '') {
      dispatch(setFirstChord({ root, suffix }));
    }

    if (inputMap[root]) root = inputMap[root];
    else if (enharmonicMap[root]) root = enharmonicMap[root];

    const oldIndex = notes.indexOf(root as Notes);
    if (oldIndex === -1) {
      return plainDisplay(chord);
    }

    // shift and wrap within 0–11
    const newIndex = (oldIndex + semitones + 12) % 12;
    let newRoot = notes[newIndex];

    // convert back to Czech B/H if needed
    if (outputMap[newRoot] && hSystem === HSystem.CZECH)
      newRoot = outputMap[newRoot] as Notes;

    return richDisplay(newRoot + suffix);
  }

  return (
    <>
      {openModal && (
        <ChordDiagram chord={diagramChord} setOpenModal={setOpenModal} />
      )}
      {transposeChord()}
    </>
  );
};

type ChordDiagramProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  chord: string;
};

const ChordDiagram = (props: ChordDiagramProps) => {
  const { hSystem } = useSelector(
    (state: RootState) => state.chordDetailsReducer
  );

  try {
    const chordsMappingToTomChord = {
      [Notes.C]: 'C',
      [Notes.C_SHARP]: 'Csharp',
      [Notes.D]: 'D',
      [Notes.D_SHARP]: 'Eb',
      [Notes.E]: 'E',
      [Notes.F]: 'F',
      [Notes.F_SHARP]: 'Fsharp',
      [Notes.G]: 'G',
      [Notes.G_SHARP]: 'Ab',
      [Notes.A]: 'A',
      [Notes.A_SHARP]: 'Bb',
      [hSystem === HSystem.CZECH ? Notes.B : Notes.A_SHARP]: 'B',
      [Notes.B]: 'B',
      H: 'B',
    };

    const match = props.chord.match(/^([A-H][b#]?)(.*)$/);

    // @ts-expect-error TODO fix types
    const [, root, suffix] = match;

    const isMajor = suffix === '';
    const isMinor = suffix.includes('m');

    const index = isMajor
      ? 0
      : isMinor
        ? 1
        : // @ts-expect-error TODO: fix types
          guitarChords.chords[chordsMappingToTomChord[root]].findIndex(
            // @ts-expect-error TODO: fix types
            (e) => e.suffix === suffix
          );

    const positions =
      // @ts-expect-error TODO: fix types
      guitarChords.chords[chordsMappingToTomChord[root]][index].positions;

    const instrument = {
      strings: 6,
      fretsOnChord: 4,
      name: 'Guitar',
      keys: [],
      tunings: {
        standard: [Notes.E, Notes.A, Notes.D, Notes.G, Notes.B, Notes.E],
      },
    };
    const lite = false; // defaults to false if omitted

    return (
      <>
        <Modal
          open={true}
          onClose={() => props.setOpenModal(false)}
          aria-labelledby="chord Diagram"
          aria-describedby="svg displays of chord shapes"
        >
          <Box className={styles['chordDiagramModal']}>
            <Stack className={styles['chordDiagramWrapper']}>
              <Typography variant="h4" color="primary">
                {props.chord}
              </Typography>
              {positions.map((chord: unknown, index: number) => (
                <div key={index}>
                  <TomChord chord={chord} instrument={instrument} lite={lite} />
                  <Divider />
                </div>
              ))}
            </Stack>
          </Box>
        </Modal>
      </>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <></>;
  }
};

export default Chord;
