import { ArrowDropDown, FormatSize, Remove, Add } from "@mui/icons-material";
import { Box, Accordion, AccordionSummary, Typography, AccordionDetails, ButtonGroup, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CookieAcceptState, CookieKeys } from "../../enums";
import type { FontSizeToggleProps } from "./types";

const FontSizeToggle = (props: FontSizeToggleProps) => {

    const [fontSize, setFontSize] = useState<number>(props.DEFAULT_FONT_SIZE);

    const decreaseFontSize = () => {
        setFontSize(prevValue => prevValue - 1);
    };

    const increaseFontSize = () => {
        setFontSize(prevValue => prevValue + 1);
    }

    const resetFontSize = () => {
        setFontSize(props.DEFAULT_FONT_SIZE);
    }
    
    useEffect(() => {
        document.documentElement.style.setProperty("--fontSize", `${fontSize}px`);

        if (props.cookieAcceptState === CookieAcceptState.ACCEPTED) {
            localStorage.setItem(CookieKeys.FONT_SIZE, fontSize.toString());
        }
    }, [fontSize, props.cookieAcceptState])


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
            <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                    expandIcon={<ArrowDropDown />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography color="primary" style={{ display: 'grid', gridTemplateColumns: "1fr 1fr", placeItems: "center", width: '100%' }}>
                        Velikost písma {fontSize}px
                        <FormatSize color="primary" />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ButtonGroup>
                        <Button disabled={fontSize === props.DEFAULT_FONT_SIZE} onClick={resetFontSize}>Reset</Button>
                        <Button disabled={fontSize === 5} onClick={decreaseFontSize}><Remove /></Button>
                        <Button onClick={increaseFontSize}><Add /></Button>
                    </ButtonGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default FontSizeToggle;