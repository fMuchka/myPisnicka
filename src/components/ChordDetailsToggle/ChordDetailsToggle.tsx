import { ArrowDropDown, Audiotrack, Add, Visibility, VisibilityOff, Remove } from "@mui/icons-material";
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, ButtonGroup, Button, Stack, RadioGroup, Radio } from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { ChordVisibility, HSystem } from "./enums";
import type { ChordDetailsToggleProps } from "./types";


const ChordDetailsToggle = (props: ChordDetailsToggleProps) => {

    const [chordVisibility, setChordVisibility] = useState<ChordVisibility>(ChordVisibility.UNSET);
    
    const handleChordVisibilityChange = (_event: ChangeEvent<HTMLInputElement>, newState: ChordVisibility) => {
        setChordVisibility(newState);

        document.documentElement.style.setProperty("--chordVisibility", `${newState}`);
    }

    const handleHSystemChange = (_event: ChangeEvent<HTMLInputElement>, newState: HSystem) => {
        props.setHSystem(newState);
    }

    const incrementTransposition = () => {
        props.setTransposition(prevValue => prevValue + 1);
    }

    const decrementTransposition = () => {
        props.setTransposition(prevValue => prevValue - 1);
    }

    const resetTransposition = () => {
        props.setTransposition(0);
    }
    
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
            <Accordion  sx={{ width: "100%" }}>
                <AccordionSummary
                    expandIcon={<ArrowDropDown />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography color="primary" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", placeItems: "center", width: '100%' }}>
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
                            sx={{ display: "flex", flexDirection: "row" }}
                            aria-labelledby="chord-visibility-toggle"
                            value={chordVisibility}
                            onChange={(e, value) => handleChordVisibilityChange(e, value as ChordVisibility)}
                            >
                            <Radio value={ChordVisibility.UNSET} aria-label="visible" icon={<Visibility />} checkedIcon={<Visibility />} />
                            <Radio value={ChordVisibility.HIDDEN} aria-label="hidden" icon={<VisibilityOff />} checkedIcon={<VisibilityOff />} />
                        </RadioGroup>
                        <Typography variant="body2" color="text.secondary">
                            Transpozice {props.transposition}
                        </Typography>
                        <ButtonGroup>
                            
                            <Button disabled={props.transposition === 0} onClick={resetTransposition}>Reset</Button>
                            <Button disabled={props.transposition === -12} onClick={decrementTransposition}><Remove /> </Button>
                            <Button disabled={props.transposition === 12} onClick={incrementTransposition} ><Add /></Button>
                        </ButtonGroup>

                        <RadioGroup
                            sx={{ display: "flex", flexDirection: "row" }}
                            aria-labelledby="hSystem-toggle"
                            value={props.hSystem}
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
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ChordDetailsToggle;