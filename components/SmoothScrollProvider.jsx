"use client";
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * SmoothScrollProvider - Global smooth scrolling for the entire website
 *
 * This component uses Lenis for buttery-smooth scrolling across all interactions:
 * - Mouse wheel
 * - Touch/swipe
 * - Keyboard (arrow keys, space, page up/down)
 * - Programmatic scrolls
 *
 * @param {Object} props
 * @param {number} props.duration - Animation duration in seconds (default: 1.2)
 * @param {string} props.easing - Easing function (default: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)))
 * @param {string} props.orientation - Scroll direction: 'vertical' or 'horizontal' (default: 'vertical')
 * @param {string} props.gestureOrientation - Gesture direction: 'vertical', 'horizontal', or 'both' (default: 'vertical')
 * @param {number} props.smoothWheel - Enable smooth wheel scrolling (default: true)
 * @param {number} props.wheelMultiplier - Wheel scroll speed multiplier (default: 1)
 * @param {number} props.touchMultiplier - Touch scroll speed multiplier (default: 2)
 * @param {boolean} props.infinite - Enable infinite scroll (default: false)
 * @param {boolean} props.autoResize - Auto resize on window resize (default: true)
 * @param {React.ReactNode} props.children
 */
export default function SmoothScrollProvider({
  children,
  duration = 1.2,
  easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation = 'vertical',
  gestureOrientation = 'vertical',
  smoothWheel = true,
  wheelMultiplier = 1,
  touchMultiplier = 2,
  infinite = false,
  autoResize = true,
  lerp = 0.1, // Linear interpolation factor (0-1, lower = smoother but slower)
}) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration,
      easing,
      orientation,
      gestureOrientation,
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      infinite,
      autoResize,
      lerp,
    });

    lenisRef.current = lenis;

    // Animation loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose Lenis instance globally for programmatic scrolling
    window.lenis = lenis;

    // Cleanup
    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [duration, easing, orientation, gestureOrientation, smoothWheel, wheelMultiplier, touchMultiplier, infinite, autoResize, lerp]);

  return <>{children}</>;
}

/**
 * Helper hook to access Lenis instance
 * Usage: const lenis = useLenis();
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = window.lenis;
  }, []);

  return lenisRef.current;
}

/**
 * Helper function to scroll to a specific target
 *
 * @param {string|HTMLElement|number} target - CSS selector, element, or pixel value
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Offset in pixels
 * @param {number} options.duration - Duration override
 * @param {Function} options.easing - Easing override
 * @param {boolean} options.immediate - Skip animation
 * @param {Function} options.onComplete - Callback when scroll completes
 *
 * @example
 * // Scroll to element
 * scrollTo('#courses', { offset: -100 });
 *
 * // Scroll to pixel value
 * scrollTo(500, { duration: 2 });
 *
 * // Scroll to top
 * scrollTo(0, { immediate: true });
 */
export function scrollTo(target, options = {}) {
  if (window.lenis) {
    window.lenis.scrollTo(target, options);
  } else {
    // Fallback to native scroll
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/**
 * Helper function to start/stop scrolling
 * Useful for modals, overlays, etc.
 */
export function toggleScroll(enabled = true) {
  if (window.lenis) {
    if (enabled) {
      window.lenis.start();
    } else {
      window.lenis.stop();
    }
  }
}
