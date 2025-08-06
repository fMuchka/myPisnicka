import { MenuOpen } from '@mui/icons-material';
import { Button, Drawer, Paper, Stack, Typography } from '@mui/material';
import ChordDetailsToggle from '../../../features/Controls/ChordDetailsControl/ChordDetailsControl';
import FontSizeToggle from '../../../features/Controls/FontSizeControl/FontSizeControl';
import ScrollToggle from '../../../features/Controls/ScrollControl/ScrollControl';
import ThemeToggle from '../../../features/Controls/ThemeControl/ThemeControl';
import type { SideBarProps } from './types';
import { useState } from 'react';
import type { ListOfControls } from './enums';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

const SideBar = (props: SideBarProps) => {
  const { primaryColor, colorScheme } = useSelector(
    (state: RootState) => state.themeReducer
  );

  const getColor = () => (colorScheme == 'dark' ? primaryColor : '#FFFFFF');
  const [expandedControl, setExpandedControl] = useState<ListOfControls | null>(
    null
  );

  const handleSetExpandedControl = (newState: ListOfControls | null) => {
    if (newState === expandedControl) {
      setExpandedControl(null);
    } else {
      setExpandedControl(newState);
    }
  };

  return (
    <Drawer
      anchor={'right'}
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
    >
      <Paper
        sx={{
          backgroundColor: colorScheme == 'dark' ? 'unset' : primaryColor,
          borderRadius: '0',
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Button
            onClick={() => props.setOpenDrawer(false)}
            variant="text"
            size="large"
            sx={{
              width: '50px',
              height: '55px',
              color: getColor(),
            }}
          >
            <MenuOpen />
          </Button>
          <div
            style={{
              paddingRight: '16px',
              paddingTop: '5px',
            }}
          >
            <Typography variant="h5" sx={{ color: getColor() }}>
              My Písnička
            </Typography>
            <Typography
              variant="subtitle2"
              textAlign={'end'}
              sx={{ color: 'white' }}
            >
              by .fm97
            </Typography>
          </div>
        </Stack>
      </Paper>
      {
        <div
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 100px)',
          }}
        >
          <ChordDetailsToggle
            expandedControl={expandedControl}
            setExpandedControl={handleSetExpandedControl}
          />
          <ThemeToggle
            expandedControl={expandedControl}
            setExpandedControl={handleSetExpandedControl}
          />
          <FontSizeToggle
            expandedControl={expandedControl}
            setExpandedControl={handleSetExpandedControl}
          />
          <ScrollToggle
            expandedControl={expandedControl}
            setExpandedControl={handleSetExpandedControl}
          />
        </div>
      }
    </Drawer>
  );
};

export default SideBar;
