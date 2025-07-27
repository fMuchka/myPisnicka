import type { ChordProps } from "./types";
import styles from './Chord.module.css';
import { Box, Divider, Modal, Stack } from "@mui/material";
import { HSystem } from "../ChordDetailsToggle/enums";
import { useState } from "react";

// @ts-expect-error TODO: Fix types import
import TomChord from '@tombatossals/react-chords/lib/Chord'
import guitarChords from "@tombatossals/chords-db/lib/guitar.json"


const Chord = (props: ChordProps) => {

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [diagramChord, setDiagramChord] = useState<string>("");

    const handleClickRichDisplay = (chord: string) => {
        setOpenModal(true);
        setDiagramChord(chord);
    };

    const plainDisplay = (chord: string) => <span className={styles.chord} >{chord}</span>;

    const richDisplay = (chord: string) => <span className={styles.chord} onClick={() => handleClickRichDisplay(chord)}>{chord}</span>;

    function transposeChord() {
        const {chord, hSystem, transposition : semitones } = props;

        // mapping flats → sharps for lookup
        const enharmonicMap: { [key: string]: string } = {
            Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#'
        };

        // Czech input → internal sharp names
        const inputMap: { [key: string]: string } = { H: 'B', B: 'A#' };

        // internal → Czech output names
        const outputMap: { [key: string]: string } = { 'A#': 'B', 'B': 'H' };

        // canonical sharp-based chromatic scale
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        // split root (e.g. "Eb", "F#") from the rest ("m7", "maj")
        const match = chord.match(/^([A-H][b#]?)(.*)$/);
        if (!match) {
            // throw new Error(`Invalid chord format: "${chord}"`);
            return plainDisplay(chord);
        }
        // eslint-disable-next-line prefer-const
        let [, root, suffix] = match;

        if (inputMap[root])
            root = inputMap[root];
        else if (enharmonicMap[root]) root = enharmonicMap[root];

        const oldIndex = notes.indexOf(root);
        if (oldIndex === -1) {
            return plainDisplay(chord);
        }

        // shift and wrap within 0–11
        const newIndex = (oldIndex + semitones + 12) % 12;
        let newRoot = notes[newIndex];

        // convert back to Czech B/H if needed
        if (outputMap[newRoot] && hSystem === HSystem.CZECH) newRoot = outputMap[newRoot];

        return richDisplay(newRoot + suffix);
    }

    return (
        <>
            {openModal && <ChordDiagram chord={diagramChord} setOpenModal={setOpenModal} />}
            {transposeChord()}
        </>
    )
}

type ChordDiagramProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    chord: string,
}

const ChordDiagram = (props: ChordDiagramProps) => {
    const positions = guitarChords.chords.E[0].positions;

    const instrument = {
        strings: 6,
        fretsOnChord: 4,
        name: 'Guitar',
        keys: [],
        tunings: {
            standard: ['E', 'A', 'D', 'G', 'B', 'E']
        }
    }
    const lite = false // defaults to false if omitted


    return (
        <>
            <Modal
                open={true}
                onClose={() => props.setOpenModal(false)}
                aria-labelledby="chord Diagram"
                aria-describedby="svg displays of chord shapes"
            >
                <Box className={styles["chordDiagramModal"]}>
                    <Stack  className={styles["chordDiagramWrapper"]}>
                        {positions.map((chord) => (
                            <>
                                <TomChord
                                    chord={chord}
                                    instrument={instrument}
                                    lite={lite}
                                />    
                                <Divider />
                            </>
                        ))}
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default Chord;