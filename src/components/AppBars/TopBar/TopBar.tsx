import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import HideOnScroll from '../../MUIAppBarUtils/HideOnScroll/HideOnScroll';
import { useState } from 'react';
import { ArrowBack, Audiotrack, Info } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

import ControlModal from '../../../features/Controls/ControlModal/ControlModal';
import { useLocation, useNavigate } from 'react-router';

const TopBar = () => {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );
  const { selectedSong } = useSelector((state: RootState) => state.songReducer);

  const navigate = useNavigate();
  const location = useLocation();

  const [openSettings, setOpenSettings] = useState(false);

  const getColor = () => (colorScheme == 'dark' ? primaryColor : '#FFFFFF');

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar id="toolbar">
          <div
            style={{
              display: location.key === 'default' ? 'none' : 'grid',
              width: '100%',
              maxWidth: '1200px',
              margin: 'auto',
              placeContent: 'space-between',
              gridTemplateAreas: `'menu song other'`,
              gridTemplateColumns: '1fr 170px 1fr',
            }}
          >
            <Button
              size="small"
              sx={{
                display: location.pathname.includes('ListView')
                  ? 'none'
                  : 'flex',
                justifyContent: 'start',
                gridArea: 'menu',
                color: getColor(),
              }}
              startIcon={<ArrowBack />}
              onClick={() =>
                navigate('/my-pisnicka/ListView', { viewTransition: true })
              }
            >
              Písně
            </Button>

            <Button
              size="small"
              sx={{
                display: location.pathname.includes('ListView')
                  ? 'flex'
                  : 'none',
                justifyContent: 'start',
                gridArea: 'menu',
                color: getColor(),
              }}
              onClick={() => {
                navigate('/my-pisnicka/Info', { viewTransition: true });
              }}
              startIcon={<Info />}
            >
              Info stránka
            </Button>
            <Typography
              variant="subtitle2"
              sx={{
                display: 'grid',
                gridArea: 'song',
                maxWidth: '170px',
                textAlign: 'center',
              }}
            >
              {selectedSong?.id}
            </Typography>
            <Button
              size="small"
              sx={{
                display: 'flex',
                justifyContent: 'end',
                gridArea: 'other',
                color: getColor(),
              }}
              endIcon={<Audiotrack />}
              onClick={() => setOpenSettings(true)}
            >
              Akordy
            </Button>
          </div>
        </Toolbar>
        <ControlModal open={openSettings} setOpen={setOpenSettings} />
      </AppBar>
    </HideOnScroll>
  );
};

export default TopBar;
