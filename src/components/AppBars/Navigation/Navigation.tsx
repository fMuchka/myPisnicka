import {
  MenuOpen,
  LibraryMusic,
  PlaylistPlay,
  Info,
} from '@mui/icons-material';
import { Drawer, Stack, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import type { RootState } from '../../../app/store';
import type { NavigationProps } from './types';

const Navigation = (props: NavigationProps) => {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );
  const navigate = useNavigate();

  const getColor = () => (colorScheme == 'dark' ? primaryColor : '#FFFFFF');

  return (
    <Drawer
      anchor={'left'}
      open={props.openNavigation}
      onClose={() => props.setOpenNavigation(false)}
    >
      <Paper
        sx={{
          backgroundColor: colorScheme == 'dark' ? 'unset' : primaryColor,
          borderRadius: '0',
        }}
      >
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          width={'35%'}
          minWidth={350}
        >
          <div
            style={{
              paddingLeft: '16px',
              paddingTop: '5px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48px"
              viewBox="0 -960 960 960"
              width="48px"
              fill={getColor()}
            >
              <path d="M486-333q41 0 70-28.42T585-431v-252h116v-60H545v237q-11-9-26.32-14T486-525q-39.06 0-66.03 27.37-26.97 27.36-26.97 67Q393-391 419.97-362q26.97 29 66.03 29ZM260-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560v-560H260v560ZM140-80q-24 0-42-18t-18-42v-620h60v620h620v60H140Zm120-740v560-560Z" />
            </svg>
          </div>
          <Button
            onClick={() => props.setOpenNavigation(false)}
            variant="text"
            size="large"
            sx={{
              width: '50px',
              height: '55px',
              color: getColor(),
            }}
          >
            <MenuOpen sx={{ transform: 'rotate(180deg)' }} />
          </Button>
        </Stack>
      </Paper>
      <Stack spacing={1} direction={'column'} textAlign={'start'}>
        <Paper>
          <Button
            sx={{
              display: 'flex',
              placeSelf: 'center',
              placeContent: 'start',
              padding: '16px',
            }}
            onClick={() => {
              navigate('/my-pisnicka/', { viewTransition: true });
              props.setOpenNavigation(false);
            }}
            fullWidth
            startIcon={<LibraryMusic />}
          >
            Hlavní stránka
          </Button>
        </Paper>

        <Paper>
          <Button
            sx={{
              display: 'flex',
              placeSelf: 'center',
              placeContent: 'start',
              padding: '16px',
            }}
            onClick={() => {
              navigate('/my-pisnicka/ListView', { viewTransition: true });
              props.setOpenNavigation(false);
            }}
            fullWidth
            startIcon={<PlaylistPlay />}
          >
            Seznam písní
          </Button>
        </Paper>

        <Paper>
          <Button
            sx={{
              display: 'flex',
              placeSelf: 'center',
              placeContent: 'start',
              padding: '16px',
            }}
            onClick={() => {
              navigate('/my-pisnicka/Info', { viewTransition: true });
              props.setOpenNavigation(false);
            }}
            fullWidth
            startIcon={<Info />}
          >
            Info
          </Button>
        </Paper>
      </Stack>
    </Drawer>
  );
};

export default Navigation;
