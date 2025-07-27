import type { ChordFormatterProps } from "./types";
import styles from './ChordFormatter.module.css';
import { type JSX } from "react";
import type { RefinedSong } from "../../utils/rawSongRefiner";
import React from "react";
import { HSystem } from "../ChordDetailsToggle/enums";

export const ChordFormatter = (props: ChordFormatterProps) => {

    function transposeChord(semitones: number, chord: string) {
        // mapping flats → sharps for lookup
        const enharmonicMap: {[key: string]: string} = {
            Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#'
        };

        // Czech input → internal sharp names
        const inputMap: {[key: string]: string}  = { H: 'B', B: 'A#' };

        // internal → Czech output names
        const outputMap: {[key: string]: string}  = { 'A#': 'B', 'B': 'H' };

        // canonical sharp-based chromatic scale
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

        // split root (e.g. "Eb", "F#") from the rest ("m7", "maj")
        const match = chord.match(/^([A-H][b#]?)(.*)$/);
        if (!match) {
            // throw new Error(`Invalid chord format: "${chord}"`);
            return chord;
        }
        // eslint-disable-next-line prefer-const
        let [, root, suffix] = match;

        if (inputMap[root])      
        root = inputMap[root];
        else if (enharmonicMap[root]) root = enharmonicMap[root];
 
        const oldIndex = notes.indexOf(root);
        if (oldIndex === -1) {
            return chord;
        } 

        // shift and wrap within 0–11
        const newIndex = (oldIndex + semitones + 12) % 12;
        let newRoot = notes[newIndex];

        // convert back to Czech B/H if needed
        if (outputMap[newRoot] && props.hSystem === HSystem.CZECH) newRoot = outputMap[newRoot];

        return newRoot + suffix;
    }

    function formatChords(song: RefinedSong) {
    
        const result: JSX.Element[] = [];

        song.text.forEach((e) => {
            if (e.includes("chorus")) {
                replaceSection(song.chorus, "chorus");
            } else if (e.includes("verse")) {
                const verseIndex = e.split('_')[1] ? parseInt(e.split('_')[1]) - 1 : 0;
                replaceSection(song.verses[verseIndex], "verse");
            } else {
                replaceSection(e.split("  "), "interlude");
            }
        })

        function replaceSection(text: string[], sectionType: "chorus" | "verse" | "interlude") {
            const replacedSection: JSX.Element[] = [];

            text.forEach((line, idx) => {
                let i = 0;
                let lyrics = "";

                while (i < line.length) {
                    if (line[i] === '[') {
                        const end = line.indexOf(']', i);
                        if (end !== -1) {
                            const chord = line.substring(i + 1, end);

                            replacedSection.push(
                                <React.Fragment key={`${idx}_${i}`}>{ lyrics }</React.Fragment>
                            );

                            lyrics = "";

                            const transposedChord = transposeChord(props.transposition, chord);
                            
                            replacedSection.push(
                                <span key={`chord_${idx}_${i}`} className={styles["chords"]}>{transposedChord}</span>
                            )
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
                        <React.Fragment key={`${idx}_${i}`}>{ lyrics }</React.Fragment>
                    );

                    lyrics = "";
                }

                replacedSection.push(
                    <br key={`br${idx}`}></br>
                );
            });

            result.push(
                <div key={result.length} className={`${styles[sectionType]} ${styles["section"]}`}>
                    {replacedSection}
                </div>
            );
        }

        return result;
    }

    if (!props.song) {
        return <span>Vybral jsi píseň?</span>;
    }
    
    return <>{formatChords(props.song)}</>;
}