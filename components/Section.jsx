"use client";
import { useEffect, useRef } from 'react';

export default function Section({ id, className = '', style, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');

          // Add staggered animation to children
          const staggerElements = e.target.querySelectorAll('.reveal-stagger');
          staggerElements.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('in-view');
            }, index * 100); // 100ms delay between each item
          });
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </section>
  );
}

