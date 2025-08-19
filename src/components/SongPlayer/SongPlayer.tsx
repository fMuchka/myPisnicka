import { Pause, PlayArrow, Remove, Add } from '@mui/icons-material';
import {
  Card,
  Stack,
  Button,
  Typography,
  ToggleButton,
  ButtonGroup,
} from '@mui/material';
import {
  setStopScrollOnTouchScroll,
  decrementScrollSpeed,
  incrementScrollSpeed,
  decrementScrollStartDelay,
  incrementScrollStartDelay,
  resetScrollSpeed,
  resetScrollStartDelay,
  setScrollDuration,
} from '../../features/Controls/ScrollControl/scrollSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGSAP } from '@gsap/react';
import { useState, useRef, useEffect } from 'react';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
import { gsap } from 'gsap';
import type { RootState } from '../../app/store';

import styles from './SongPlayer.module.css';

gsap.registerPlugin(DrawSVGPlugin);

export const SongPlayer = () => {
  const {
    scrollSpeed,
    scrollStartDelay,
    isScrolling,
    scrollDuration,
    stopScrollOnTouchScroll,
  } = useSelector((state: RootState) => state.scrollReducer);

  const { selectedSong } = useSelector((state: RootState) => state.songReducer);

  const { chordPosition } = useSelector(
    (state: RootState) => state.fontSizeReducer
  );

  const [scrollStartClicked, setScrollStartClicked] = useState<boolean>(false);

  const dispatch = useDispatch();
  const { stopScroll, startScroll } = useAutoScroll();

  const circleRef = useRef<SVGCircleElement>(null);
  useGSAP(
    () => {
      gsap.set(circleRef.current, { drawSVG: '0%' });
    },
    { dependencies: [circleRef.current, isScrolling] }
  );

  useEffect(() => {
    const numberOfLines = selectedSong?.numberOfLines ?? 0;
    const numberOfSections = selectedSong?.text.length ?? 0;

    const chordPositionMultiplier = chordPosition === 'above' ? 1 : 0.5;

    const duration =
      (numberOfLines * 100 * chordPositionMultiplier) / (10 * scrollSpeed) +
      (numberOfSections * 50) / (10 * scrollSpeed);

    dispatch(setScrollDuration(duration));
  }, [
    dispatch,
    scrollSpeed,
    selectedSong?.numberOfLines,
    selectedSong?.text.length,
    chordPosition,
  ]);

  const handleResetScrollSpeed = () => {
    dispatch(resetScrollSpeed());
    stopScroll();
  };

  const handleResetScrollStartDelay = () => {
    dispatch(resetScrollStartDelay());
  };

  const handleScrollStart = () => {
    if (isScrolling) {
      stopScroll();
      setScrollStartClicked(false);
    } else {
      setScrollStartClicked(true);
      gsap.to(circleRef.current, {
        drawSVG: '100%',
        ease: 'linear',
        duration: scrollStartDelay,
        onComplete: () => {
          startScroll();
          setScrollStartClicked(false);
        },
      });
    }
  };

  const convertDurationToTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);

    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
  };

  return (
    <Card>
      <Stack direction={'row'} spacing={2}>
        <Stack
          spacing={2}
          direction={'column'}
          width={'100%'}
          sx={{ padding: '0.5rem 1rem' }}
        >
          <div>
            <Button
              onClick={() => handleScrollStart()}
              className={styles.scrollStartButton}
              size="large"
              color="primary"
              variant={scrollStartClicked ? 'text' : 'contained'}
            >
              {isScrolling ? <Pause /> : <PlayArrow />}
            </Button>
            <svg
              stroke="red"
              id="circle-border"
              height={50}
              width={50}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle ref={circleRef} strokeWidth={3} cx="25" cy="25" r="22" />
            </svg>
          </div>
          <Typography variant="body2" color="text.secondary">
            Doba posunu: {convertDurationToTime(scrollDuration)}
          </Typography>

          <ToggleButton
            size="small"
            value={true}
            color="primary"
            selected={stopScrollOnTouchScroll}
            onChange={() => {
              dispatch(setStopScrollOnTouchScroll(!stopScrollOnTouchScroll));
            }}
          >
            Přerušit na manuální posun
          </ToggleButton>
        </Stack>

        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '0.5rem 1rem',
          }}
          spacing={2}
        >
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Rychlost posunu: {scrollSpeed}x
            </Typography>
            <ButtonGroup size="small">
              <Button
                disabled={scrollSpeed === 1}
                onClick={() => handleResetScrollSpeed()}
              >
                Reset
              </Button>
              <Button
                disabled={scrollSpeed === 1}
                onClick={() => dispatch(decrementScrollSpeed())}
              >
                <Remove />
              </Button>
              <Button
                disabled={scrollSpeed === 10}
                onClick={() => dispatch(incrementScrollSpeed())}
              >
                <Add />
              </Button>
            </ButtonGroup>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              Zpoždění posunu: {scrollStartDelay}s
            </Typography>
            <ButtonGroup size="small">
              <Button
                disabled={scrollStartDelay === 3}
                onClick={() => handleResetScrollStartDelay()}
              >
                Reset
              </Button>
              <Button
                disabled={scrollStartDelay === 0}
                onClick={() => dispatch(decrementScrollStartDelay())}
              >
                <Remove />
              </Button>
              <Button onClick={() => dispatch(incrementScrollStartDelay())}>
                <Add />
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default SongPlayer;
