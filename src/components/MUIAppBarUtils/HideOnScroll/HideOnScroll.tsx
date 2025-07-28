import { useScrollTrigger, Slide } from "@mui/material";
import type { HideOnScrollProps } from "./types";


const HideOnScroll = (props: HideOnScrollProps) => {
    const { children } = props;

    const trigger = useScrollTrigger({});

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children ?? <div />}
      </Slide>
    );
}
  
export default HideOnScroll;