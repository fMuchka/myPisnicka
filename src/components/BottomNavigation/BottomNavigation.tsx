import { LibraryMusic, QueueMusic, Info, Settings } from '@mui/icons-material';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from '@mui/material';
import { RoutesEnum } from '../../routes/routes';
import { useNavigate, useLocation } from 'react-router';
import ControlModal from '../../features/Controls/ControlModal/ControlModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { queue } = useSelector((state: RootState) => state.queueReducer);

  const [openSettings, setOpenSettings] = useState(false);

  const handleNavigation = (val: RoutesEnum) => {
    if (val === RoutesEnum.SETTINGS) {
      setOpenSettings(true);
    } else {
      navigate(val, { viewTransition: true });
    }
  };

  return (
    <>
      <ControlModal open={openSettings} setOpen={setOpenSettings} />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          color="primary"
          showLabels
          value={location.pathname}
          onChange={(_e, val) => handleNavigation(val)}
        >
          <BottomNavigationAction
            label="Písně"
            value={RoutesEnum.SONG_LIST}
            icon={<LibraryMusic />}
          />

          <BottomNavigationAction
            label="Fronta"
            value={RoutesEnum.SONG_QUEUE}
            icon={
              <Badge badgeContent={queue.length} color="primary">
                <QueueMusic />
              </Badge>
            }
          />
          <BottomNavigationAction
            label="Nastavení"
            value={RoutesEnum.SETTINGS}
            icon={<Settings />}
          />
          <BottomNavigationAction
            label="Informace"
            value={RoutesEnum.INFO}
            icon={<Info />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default Navigation;
