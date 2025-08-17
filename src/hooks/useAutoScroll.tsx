import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { setScrollStatus } from '../features/Controls/ScrollControl/scrollSlice';

import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

export function useAutoScroll() {
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const { isScrolling, scrollDuration } = useSelector(
    (state: RootState) => state.scrollReducer
  );

  const dispatch = useDispatch();

  const startScroll = useCallback(() => {
    // Avoid double-starts
    if (tweenRef.current?.isActive() && isScrolling) {
      return;
    } else {
      const { scrollHeight, clientHeight } = document.documentElement;

      dispatch(setScrollStatus(true));
      tweenRef.current = gsap.to(window, {
        scrollTo: scrollHeight - clientHeight,
        ease: 'linear',
        duration: scrollDuration,
        onComplete: () => {
          tweenRef.current = null;
          dispatch(setScrollStatus(false));
        },
      });
    }
  }, [dispatch, isScrolling, scrollDuration]);

  const stopScroll = useCallback(() => {
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
