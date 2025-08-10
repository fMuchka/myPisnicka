import { useScrollTrigger, Fade, Box } from '@mui/material';
import type { ScrollTopProps } from './types';
import { useAutoScroll } from '../../../hooks/useAutoScroll';

const ScrollTop = (props: ScrollTopProps) => {
  const { children } = props;

  const { stopScroll } = useAutoScroll();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    stopScroll();
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
