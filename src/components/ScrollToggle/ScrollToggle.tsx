import { ArrowDropDown, TextRotateVertical, Add, Remove } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Typography, ButtonGroup } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import type { ScrollToggleProps } from "./types";
import { CookieAcceptState, CookieKeys } from "../../enums";


const ScrollToggle = (props: ScrollToggleProps) => {
    const [scrollSpeed, setScrollSpeed] = useState<number>(props.DEFAULT_SCROLL_SPEED);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollInterval = useRef<NodeJS.Timeout | null>(null);

    const incrementScrollSpeed = () => {
        setScrollSpeed(prevSpeed => prevSpeed + 1);
    }

    const decrementScrollSpeed = () => {
        setScrollSpeed(prevSpeed => Math.max(0, prevSpeed - 1));
    }

    const resetScrollSpeed = () => {
        setScrollSpeed(0);
        stopScroll();
    }

    const startScroll = () => {
        if (isScrolling || scrollSpeed === 0) return;
        setIsScrolling(true);
        scrollInterval.current = setInterval(() => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const scrollStep = 0.5 * scrollSpeed;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                stopScroll();
                return;
            }
            window.scrollBy({ top: scrollStep, behavior: "smooth" });
        }, 62);
    };

    const stopScroll = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current);
            scrollInterval.current = null;
        }
        setIsScrolling(false);
    };

    useEffect(() => {
        if (props.cookieAcceptState === CookieAcceptState.ACCEPTED) {
            localStorage.setItem(CookieKeys.SCROLL_SPEED, scrollSpeed.toString());
        }
    }, [scrollSpeed, props.cookieAcceptState])

    useEffect(() => {
        if (!isScrolling) return;

        let lastScrollY = window.scrollY;
        const handleUserScroll = () => {
            // If scroll position changes by user, stop autoscroll
            if (Math.abs(window.scrollY - lastScrollY) > 10) {
                stopScroll();
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('wheel', handleUserScroll, { passive: true });
        window.addEventListener('touchmove', handleUserScroll, { passive: true });
        window.addEventListener('keydown', handleUserScroll, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleUserScroll);
            window.removeEventListener('touchmove', handleUserScroll);
            window.removeEventListener('keydown', handleUserScroll);
        };
    }, [isScrolling]);

    useEffect(() => () => stopScroll(), []);


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
                        Rychlost posunu {scrollSpeed}x
                        <TextRotateVertical color="primary" />
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ButtonGroup>
                        <Button disabled={scrollSpeed === 0} onClick={resetScrollSpeed}>Reset</Button>
                        <Button disabled={scrollSpeed === 0} onClick={decrementScrollSpeed}><Remove /></Button>
                        <Button disabled={scrollSpeed === 10} onClick={incrementScrollSpeed}><Add /></Button>
                        <Button disabled={scrollSpeed === 0} onClick={startScroll}>Start</Button>
                    </ButtonGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default ScrollToggle;
