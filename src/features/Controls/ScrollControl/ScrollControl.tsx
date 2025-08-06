import {
  ArrowDropDown,
  TextRotateVertical,
  Add,
  Remove,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Typography,
  ButtonGroup,
  Alert,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';
import { CookieAcceptState, CookieKeys } from '../../Cookies/enums';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  decrementScrollSpeed,
  incrementScrollSpeed,
  resetScrollSpeed,
  stopScroll,
} from './scrollSlice';
import type { ControlProps } from '../../../components/AppBars/SideBar/types';
import { ListOfControls } from '../../../components/AppBars/SideBar/enums';

const ScrollToggle = (props: ControlProps) => {
  const { scrollSpeed } = useSelector(
    (state: RootState) => state.scrollReducer
  );
  const { cookieAcceptState } = useSelector(
    (state: RootState) => state.cookieReducer
  );
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetScrollSpeed());
    dispatch(stopScroll());
  };

  useEffect(() => {
    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.SCROLL_SPEED, scrollSpeed.toString());
    }
  }, [scrollSpeed, cookieAcceptState]);

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
      <Accordion
        expanded={props.expandedControl === ListOfControls.SCROLL}
        onChange={() => props.setExpandedControl(ListOfControls.SCROLL)}
        sx={{ width: '100%' }}
      >
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            color="primary"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              placeItems: 'center',
              width: '100%',
            }}
          >
            Rychlost posunu {scrollSpeed}x
            <TextRotateVertical color="primary" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Alert severity="info">
              Posun lze přerušit manuálním posunem.
              <br /> Zapíná se v horním menu.
            </Alert>
            <ButtonGroup>
              <Button
                disabled={scrollSpeed === 1}
                onClick={() => handleReset()}
              >
                Reset
              </Button>
              <Button
                disabled={scrollSpeed === 0}
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
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ScrollToggle;
