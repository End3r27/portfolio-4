"use client";
import { useEffect, useRef } from 'react';

export default function FinisherHeader({
  title = 'LearnX',
  subtitle = 'Learn without limits',
  config
}) {
  const elRef = useRef(null);

  useEffect(() => {
    let tick;
    let stop;
    let injected = false;

    const injectScript = () => {
      if (injected || typeof document === 'undefined') return;
      injected = true;

      // Get base path from current URL or use default
      const getBasePath = () => {
        if (typeof window === 'undefined') return '';
        const path = window.location.pathname;
        // If URL contains /portfolio-4/, extract it
        const match = path.match(/^(\/portfolio-4)/);
        return match ? match[1] : '';
      };

      const basePath = getBasePath();
      const trySources = [
        `${basePath}/vendor/finisher-header.es5.min.js`,
        'https://cdn.jsdelivr.net/npm/finisher-header@1.3.1/dist/finisher-header.es5.min.js',
      ];
      let idx = 0;
      const loadNext = () => {
        if (idx >= trySources.length) return; // give up; fallback remains
        const s = document.createElement('script');
        s.src = trySources[idx++];
        s.async = true;
        s.onload = () => init();
        s.onerror = () => loadNext();
        document.body.appendChild(s);
      };
      loadNext();
    };
    const init = () => {
      if (!elRef.current) return;
      if (elRef.current.dataset.finisher === '1') return; // prevent double init
      try {
        if (typeof window !== 'undefined' && window.FinisherHeader) {
          const defaults = {
            count: 12,
            size: { min: 1300, max: 1500, pulse: 0 },
            speed: { x: { min: 0.6, max: 3 }, y: { min: 0.6, max: 3 } },
            colors: {
              background: '#953eff',
              particles: ['#ff681c', '#87ddfe', '#231efe', '#ff0a53']
            },
            blending: 'lighten',
            opacity: { center: 0.6, edge: 0 },
            skew: -2,
            shapes: ['c']
          };

          // Sanitize user config to avoid invalid values that can break the library
          const user = config || {};
          const clamp = (n, min, max) => {
            const v = Number(n);
            return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min;
          };
          const safeCount = clamp(user.count ?? defaults.count, 1, 40);
          const uSz = user.size || {};
          const szMin = clamp(uSz.min ?? defaults.size.min, 1, 3000);
          const szMax = clamp(uSz.max ?? Math.max(defaults.size.max, szMin), szMin, 4000);
          const szPulse = clamp(uSz.pulse ?? defaults.size.pulse, 0, 10);
          const uSp = user.speed || {};

          // Handle speed object structure (can be simple x/y or min/max objects)
          let spX, spY;
          if (typeof defaults.speed.x === 'object') {
            const spXObj = typeof uSp.x === 'object' ? uSp.x : defaults.speed.x;
            spX = { min: clamp(spXObj.min, 0, 5), max: clamp(spXObj.max, 0, 5) };
          } else {
            spX = clamp(uSp.x ?? defaults.speed.x, 0, 5);
          }

          if (typeof defaults.speed.y === 'object') {
            const spYObj = typeof uSp.y === 'object' ? uSp.y : defaults.speed.y;
            spY = { min: clamp(spYObj.min, 0, 5), max: clamp(spYObj.max, 0, 5) };
          } else {
            spY = clamp(uSp.y ?? defaults.speed.y, 0, 5);
          }

          const uCol = user.colors || {};
          const particles = Array.isArray(uCol.particles) && uCol.particles.length
            ? uCol.particles.filter(c => typeof c === 'string' && c.trim().length >= 3)
            : defaults.colors.particles;
          const bg = typeof uCol.background === 'string' && uCol.background.trim() ? uCol.background : defaults.colors.background;
          const allowedBlend = new Set(['screen','lighter','overlay','source-over','lighten','normal']);
          const blend = allowedBlend.has(user.blending) ? user.blending : defaults.blending;

          // Handle opacity (can be single value or object with center/edge)
          let op;
          if (typeof user.opacity === 'object') {
            op = user.opacity;
          } else if (typeof defaults.opacity === 'object') {
            op = defaults.opacity;
          } else {
            op = clamp(user.opacity ?? defaults.opacity, 0, 1);
          }

          const safeConfig = {
            count: safeCount,
            size: { min: szMin, max: szMax, pulse: szPulse },
            speed: { x: spX, y: spY },
            colors: { background: bg, particles },
            blending: blend,
            opacity: op,
            skew: user.skew ?? defaults.skew,
            shapes: user.shapes ?? defaults.shapes
          };

          // eslint-disable-next-line no-new
          new window.FinisherHeader({ ...defaults, ...safeConfig });
          // Align header background to config for consistent look behind canvas
          elRef.current.style.background = bg;
          elRef.current.dataset.finisher = '1';
        }
      } catch {
        // fallback stays active
      }
    };

    if (typeof window !== 'undefined') {
      if (window.FinisherHeader) init();
      else {
        injectScript();
        tick = setInterval(() => {
          if (window.FinisherHeader) {
            clearInterval(tick);
            clearTimeout(stop);
            init();
          }
        }, 120);
        stop = setTimeout(() => clearInterval(tick), 5000);
      }
    }
    return () => {
      if (tick) clearInterval(tick);
      if (stop) clearTimeout(stop);
    };
  }, [config]);

  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const parallaxSpeed = 0.5;
        parallaxRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={elRef}
      className="finisher-header finisher-fallback"
      data-lenis-prevent
      style={{
        width: '100%',
        height: '60vh',
        minHeight: 300,
        position: 'relative',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        border: 'none',
        display: 'block',
        // If script fails/offline, use provided background color so visual matches config
        background: config?.colors?.background || 'transparent',
      }}
    >
      <div ref={parallaxRef} className="finisher-overlay container" style={{ transition: 'transform 0.1s ease-out' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '8px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)'
        }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--accent-1)', boxShadow: '0 0 16px var(--accent-1)' }} />
          <span className="muted">Next‑gen learning platform</span>
        </div>
        <h1 className="finisher-title">{title}</h1>
        <p className="finisher-subtitle">{subtitle}</p>
      </div>
    </header>
  );
}
