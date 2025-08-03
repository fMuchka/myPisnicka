import { Close } from '@mui/icons-material';
import { Button, Drawer } from '@mui/material';
import ChordDetailsToggle from '../../../features/Controls/ChordDetailsControl/ChordDetailsControl';
import FontSizeToggle from '../../../features/Controls/FontSizeControl/FontSizeControl';
import ScrollToggle from '../../../features/Controls/ScrollControl/ScrollControl';
import ThemeToggle from '../../../features/Controls/ThemeControl/ThemeControl';
import type { SideBarProps } from './types';

const SideBar = (props: SideBarProps) => {
  return (
    <Drawer
      anchor={'right'}
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
    >
      {
        <div
          style={{
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 35px)',
          }}
        >
          <ThemeToggle />
          <ChordDetailsToggle />
          <FontSizeToggle />
          <ScrollToggle />
        </div>
      }
      <Button
        onClick={() => props.setOpenDrawer(false)}
        variant="contained"
        fullWidth
        sx={{ position: 'absolute', bottom: 0 }}
      >
        <Close />
      </Button>
    </Drawer>
  );
};

export default SideBar;
