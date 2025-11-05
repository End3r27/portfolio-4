"use client";
import { useEffect, useState } from 'react';

export function useInView({ threshold = 0.12, rootMargin = '0px' } = {}) {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
          break;
        }
      }
    }, { threshold, rootMargin });
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);

  return { ref: setRef, inView };
}

