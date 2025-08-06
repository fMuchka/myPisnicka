import { AppBar, Toolbar, Button } from '@mui/material';
import HideOnScroll from '../../MUIAppBarUtils/HideOnScroll/HideOnScroll';
import SideBar from '../SideBar/SideBar';
import { useState } from 'react';
import { Menu, Tune } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

import { startScroll } from '../../../features/Controls/ScrollControl/scrollSlice';
import { useLocation } from 'react-router';
import Navigation from '../Navigation/Navigation';

const TopBar = () => {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );
  const location = useLocation();

  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  const getColor = () => (colorScheme == 'dark' ? primaryColor : '#FFFFFF');

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar id="toolbar">
          <Navigation
            openNavigation={openNavigation}
            setOpenNavigation={setOpenNavigation}
          />
          <SideBar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50px 200px 60px',
              width: '100%',
              maxWidth: '1200px',
              margin: 'auto',
              placeContent: 'space-between',
            }}
          >
            <Button
              size="small"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: getColor(),
              }}
              onClick={() => setOpenNavigation(true)}
            >
              <Menu />
            </Button>

            <Button
              onClick={() => dispatch(startScroll())}
              size="small"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: getColor(),
                visibility:
                  location.pathname === '/my-pisnicka/' ? 'visible' : 'hidden',
              }}
            >
              Zapni posun
            </Button>

            <Button
              size="small"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: getColor(),
              }}
              onClick={() => setOpenDrawer(true)}
            >
              <Tune />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default TopBar;
