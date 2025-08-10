import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { setScrollStatus } from '../features/Controls/ScrollControl/scrollSlice';

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

export function useAutoScroll() {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const { scrollSpeed, isScrolling } = useSelector(
    (state: RootState) => state.scrollReducer
  );

  const dispatch = useDispatch();

  const startScroll = useCallback(() => {
    console.log('START');
    console.log('isScrolling: ', isScrolling);
    console.log('tweenRef before start:', tweenRef.current);

    // Avoid double-starts
    if (tweenRef.current?.isActive() && isScrolling) {
      return;
    } else {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const distance = scrollHeight - clientHeight - scrollTop;
      if (distance <= 0) return;
      console.log(isScrolling);
      dispatch(setScrollStatus(true));

      // duration in seconds for constant pixel/second speed
      const duration = distance / (scrollSpeed * 10);

      tweenRef.current = gsap.to(window, {
        scrollTo: scrollHeight - clientHeight,
        ease: 'none',
        duration,
        onComplete: () => {
          tweenRef.current = null;
          dispatch(setScrollStatus(false));
        },
      });
    }
  }, [dispatch, isScrolling, scrollSpeed]);

  const stopScroll = useCallback(() => {
    console.log('STOP');

    // Kill the specific tween first
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    // Then kill any lingering tweens on window
    gsap.killTweensOf(window);

    dispatch(setScrollStatus(false));
  }, [dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf(window);
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  return { startScroll, stopScroll };
}
