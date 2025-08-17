import type { ChordFormatterProps } from './types';
import styles from './ChordFormatter.module.css';
import { type JSX } from 'react';
import type { RefinedSong } from '../../utils/rawSongRefiner';
import React from 'react';
import Chord from '../Chord/Chord';
import { useDispatch, useSelector } from 'react-redux';
import { currentSongTransposition, type RootState } from '../../app/store';
import { setCurrentChords } from '../../features/Controls/ChordDetailsControl/chordDetailsSlice';
import {
  getToneCountDifference,
  transposeChord,
} from '../../utils/transposeChord';
import {
  setSelectedSongFirstChord,
  setSelectedSongNumberOfLines,
} from '../../features/Songs/songsSlice';
import type { Notes } from '../../features/Controls/ChordDetailsControl/enums';

export const ChordFormatter = (props: ChordFormatterProps) => {
  const { hSystem, currentChords } = useSelector(
    (state: RootState) => state.chordDetailsReducer
  );

  const { selectedSong } = useSelector((state: RootState) => state.songReducer);

  const currentTransposition = useSelector(currentSongTransposition);

  const dispatch = useDispatch();

  const uniqueChords = new Map<string, boolean>();
  let firstChordSet = false;

  const dispatchChords = (nOfLines: number) => {
    dispatch(setSelectedSongNumberOfLines(nOfLines));

    if (currentChords.length === 0) {
      const chords: { root: string; suffix: string }[] = [];

      uniqueChords.forEach((_val, key) => {
        const [root, suffix] = key.split('_');
        chords.push({ root, suffix });
      });

      dispatch(setCurrentChords(chords));
      uniqueChords.clear();
    }
  };

  const formatChords = (song: RefinedSong) => {
    const result: JSX.Element[] = [];

    let nOfLines = 0;

    song.text.forEach((e) => {
      if (e.includes('chorus')) {
        const chorusIndex = e.split('_')[1] ? parseInt(e.split('_')[1]) - 1 : 0;
        replaceSection(song.chorus[chorusIndex], 'chorus');
      } else if (e.includes('verse')) {
        const verseIndex = e.split('_')[1] ? parseInt(e.split('_')[1]) - 1 : 0;
        replaceSection(song.verses[verseIndex], 'verse');
      } else {
        replaceSection(e.split('  '), 'interlude');
      }
    });

    function replaceSection(
      text: string[],
      sectionType: 'chorus' | 'verse' | 'interlude'
    ) {
      const replacedSection: JSX.Element[] = [];

      text.forEach((line, idx) => {
        let i = 0;
        let lyrics = '';

        while (i < line.length) {
          if (line[i] === '[') {
            const end = line.indexOf(']', i);
            if (end !== -1) {
              const chord = line.substring(i + 1, end);

              replacedSection.push(
                <React.Fragment key={`${idx}_${i}`}>{lyrics}</React.Fragment>
              );

              lyrics = '';

              if (selectedSong?.firstChord === '' && firstChordSet === false) {
                dispatch(setSelectedSongFirstChord(chord));
                firstChordSet = true;
              }

              const transposedChord = transposeChord(
                chord,
                hSystem,
                getToneCountDifference(
                  selectedSong?.firstChord as Notes,
                  currentTransposition,
                  hSystem
                ),
                uniqueChords
              );

              replacedSection.push(
                <Chord
                  key={`chord_${idx}_${i}`}
                  chord={transposedChord.root + transposedChord.suffix}
                  useRichDisplay={transposedChord.useRichDisplay}
                />
              );

              i = end + 1;
            } else {
              i++;
            }
          } else {
            lyrics += line[i];
            i++;
          }
        }

        if (lyrics.length > 0) {
          replacedSection.push(
            <React.Fragment key={`${idx}_${i}`}>{lyrics}</React.Fragment>
          );

          lyrics = '';
        }

        nOfLines++;
        replacedSection.push(<br key={`br${idx}`}></br>);
      });

      result.push(
        <div
          key={result.length}
          className={`${styles[sectionType]} ${styles['section']}`}
        >
          {replacedSection}
        </div>
      );
    }

    dispatchChords(nOfLines);

    return result;
  };

  if (props.song === null) return <span>Vybral jsi píseň?</span>;
  return <>{formatChords(props.song)}</>;
};
