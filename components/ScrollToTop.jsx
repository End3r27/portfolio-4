"use client";
import { useState, useEffect } from 'react';
import { scrollTo } from './SmoothScrollProvider';

/**
 * Scroll to Top Button Component
 * Appears when user scrolls down, smoothly scrolls back to top when clicked
 */
export default function ScrollToTop({ showAfter = 500 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > showAfter);
    };

    // Use Lenis scroll event if available, otherwise fallback
    if (window.lenis) {
      window.lenis.on('scroll', ({ scroll }) => {
        setIsVisible(scroll > showAfter);
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showAfter]);

  const handleClick = () => {
    scrollTo(0, { duration: 1.5 });
  };

  return (
    <button
      onClick={handleClick}
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
