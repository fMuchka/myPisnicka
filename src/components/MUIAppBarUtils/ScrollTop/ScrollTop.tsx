import { useScrollTrigger, Fade, Box } from '@mui/material';
import type { ScrollTopProps } from './types';
import { useDispatch } from 'react-redux';
import { stopScroll } from '../../../features/Controls/ScrollControl/scrollSlice';

const ScrollTop = (props: ScrollTopProps) => {
  const { children } = props;

  const dispatch = useDispatch();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(stopScroll());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={(e) => handleClick(e)}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

export default ScrollTop;
