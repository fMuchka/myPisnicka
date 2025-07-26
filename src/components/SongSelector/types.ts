import type { RefinedSong } from "../../utils/rawSongRefiner";


export type SongSelectorProps = {
    songs: RefinedSong[];
    selectedSong: RefinedSong | null;
    setSelectedSong: (song: RefinedSong | null) => void;
};
