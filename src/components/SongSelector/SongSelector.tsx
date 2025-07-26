import { Autocomplete, TextField } from "@mui/material";
import type { RefinedSong } from "../../utils/rawSongRefiner";
import type { SongSelectorProps } from "./types";

const SongSelector = (props: SongSelectorProps) => {
    const { songs, selectedSong, setSelectedSong } = props;

    const handleSongSelectorChange = (_event: React.SyntheticEvent<Element, Event>, value: { value: string | undefined, label: string | undefined } | null) => {
        const songId = value?.value;
        const selected = songs?.find(s => s.id === songId)

        if (selected !== undefined) {
            setSelectedSong(selected);
        }
    }
    
    return (
        <Autocomplete
            color="primary"
            value={{ label: selectedSong?.id, value: selectedSong?.id }}
            disablePortal
            options={songsList(songs)}
            groupBy={(option) => {
                if (option.label === undefined) {
                    return 'Ups...';
                }

                return option.label.split(' - ')[0]
            }}
            renderInput={(params) => <TextField {...params} label="Song" />}
            onChange={handleSongSelectorChange}
      />
    )
}

function songsList(songs: RefinedSong[]) {
    return songs.map(song => ({
        label: song.id,
        value: song.id,
    }));
}


export default SongSelector;