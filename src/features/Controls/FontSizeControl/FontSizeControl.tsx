import { ArrowDropDown, FormatSize, Remove, Add } from '@mui/icons-material';
import {
  Box,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ButtonGroup,
  Button,
} from '@mui/material';
import { useEffect } from 'react';
import { CookieAcceptState, CookieKeys } from '../../Cookies/enums';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import {
  decrementFontSize,
  incrementFontSize,
  resetFontSize,
  initialState,
} from './fontSizeSlice';

const FontSizeToggle = () => {
  const { fontSize } = useSelector((state: RootState) => state.fontSizeReducer);
  const { cookieAcceptState } = useSelector(
    (state: RootState) => state.cookieReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.style.setProperty('--fontSize', `${fontSize}px`);

    if (cookieAcceptState === CookieAcceptState.ACCEPTED) {
      localStorage.setItem(CookieKeys.FONT_SIZE, fontSize.toString());
    }
  }, [fontSize, cookieAcceptState]);

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
      <Accordion sx={{ width: '100%' }}>
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
            Velikost písma {fontSize}px
            <FormatSize color="primary" />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroup>
            <Button
              disabled={fontSize === initialState.fontSize}
              onClick={() => dispatch(resetFontSize())}
            >
              Reset
            </Button>
            <Button
              disabled={fontSize === 5}
              onClick={() => dispatch(decrementFontSize())}
            >
              <Remove />
            </Button>
            <Button onClick={() => dispatch(incrementFontSize())}>
              <Add />
            </Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FontSizeToggle;
