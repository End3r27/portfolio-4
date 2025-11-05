"use client";
import { useEffect, useCallback } from 'react';

/**
 * Custom hook for smooth scroll actions
 * Provides utilities for programmatic scrolling with Lenis
 */
export function useSmoothScroll() {
  const scrollTo = useCallback((target, options = {}) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, {
        offset: options.offset || 0,
        duration: options.duration,
        easing: options.easing,
        immediate: options.immediate || false,
        lock: options.lock || false,
        onComplete: options.onComplete,
      });
    } else {
      // Fallback
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const element = typeof target === 'string'
          ? document.querySelector(target)
          : target;
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const scrollToTop = useCallback((options = {}) => {
    scrollTo(0, { ...options, immediate: options.immediate || false });
  }, [scrollTo]);

  const scrollToElement = useCallback((selector, options = {}) => {
    scrollTo(selector, options);
  }, [scrollTo]);

  const stopScroll = useCallback(() => {
    window.lenis?.stop();
  }, []);

  const startScroll = useCallback(() => {
    window.lenis?.start();
  }, []);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
    stopScroll,
    startScroll,
    lenis: window.lenis,
  };
}

/**
 * Hook to listen to scroll events
 * @param {Function} callback - Called on scroll with scroll data
 */
export function useScrollListener(callback) {
  useEffect(() => {
    if (!window.lenis) return;

    const handleScroll = (data) => {
      callback(data);
    };

    window.lenis.on('scroll', handleScroll);

    return () => {
      window.lenis.off('scroll', handleScroll);
    };
  }, [callback]);
}

/**
 * Hook to detect scroll direction
 * @returns {string} 'up', 'down', or 'idle'
 */
export function useScrollDirection() {
  const [direction, setDirection] = React.useState('idle');

  useScrollListener((data) => {
    if (data.velocity > 0) {
      setDirection('down');
    } else if (data.velocity < 0) {
      setDirection('up');
    } else {
      setDirection('idle');
    }
  });

  return direction;
}

export default useSmoothScroll;
