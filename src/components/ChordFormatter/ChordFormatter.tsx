import type { ChordFormatterProps } from "./types";
import styles from './ChordFormatter.module.css';
import { type JSX } from "react";
import type { RefinedSong } from "../../utils/rawSongRefiner";
import React from "react";
export const ChordFormatter = (props: ChordFormatterProps) => {

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
                            
                            replacedSection.push(
                                <span key={`chord_${idx}_${i}`} className={styles["chords"]}>{chord}</span>
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