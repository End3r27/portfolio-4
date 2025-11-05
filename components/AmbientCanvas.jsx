"use client";
import { useEffect, useRef } from 'react';

/**
 * AmbientCanvas — lightweight, customizable ambient background.
 * Presets: "orbs" (default)
 * Options use CSS variables for easy branding.
 */
export default function AmbientCanvas({ preset = 'orbs', density = 12, intensity = 0.35 }) {
  const ref = useRef(null);
  const animRef = useRef(null);
  const orbsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    ref.current = canvas;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Colors from CSS variables
    const styles = getComputedStyle(document.documentElement);
    const colorA = styles.getPropertyValue('--ambient-a').trim() || 'hsl(200 95% 58%)';
    const colorB = styles.getPropertyValue('--ambient-b').trim() || 'hsl(280 85% 62%)';

    // Build orbs
    const count = Math.max(6, Math.min(40, density));
    const orbs = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.6;
      const radius = 80 + Math.random() * 140;
      const x = width * (0.25 + 0.5 * Math.random());
      const y = height * (0.15 + 0.7 * Math.random());
      const hueMix = i / count;
      const col = mixColors(colorA, colorB, hueMix);
      return { x, y, angle, speed, radius, color: col };
    });
    orbsRef.current = orbs;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const t = performance.now() * 0.0002;
      for (const o of orbsRef.current) {
        o.angle += (o.speed * 0.0025);
        const ampX = 80 + o.radius * 0.4;
        const ampY = 60 + o.radius * 0.3;
        const cx = width / 2 + Math.cos(o.angle + t) * ampX * (0.4 + intensity);
        const cy = height / 2 + Math.sin(o.angle * 0.9 + t * 1.1) * ampY * (0.4 + intensity);
        const r = o.radius * (0.4 + 0.6 * Math.abs(Math.sin(o.angle * 0.8 + t)));

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, withAlpha(o.color, 0.085));
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame() {
      draw();
      animRef.current = requestAnimationFrame(frame);
    }

    const onResize = () => {
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(dpr, dpr);
    };

    const onVis = () => {
      if (document.hidden) {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(frame);
      }
    };

    if (!prefersReduced) {
      animRef.current = requestAnimationFrame(frame);
      document.addEventListener('visibilitychange', onVis);
    } else {
      // Static, low-motion fallback
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (ref.current && ref.current.parentNode) {
        ref.current.parentNode.removeChild(ref.current);
      }
    };
  }, [preset, density, intensity]);

  return null; // Canvas is appended to body; nothing to render in tree
}

function withAlpha(color, a) {
  // Convert hsl or hex to rgba with alpha using canvas trick
  const c = document.createElement('canvas').getContext('2d');
  c.fillStyle = color; // lets browser parse
  const parsed = c.fillStyle; // becomes rgb(...)
  // parsed is like rgb(r, g, b)
  const m = parsed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
  if (!m) return color;
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${a})`;
}

function mixColors(a, b, t) {
  const ca = parseRGB(a); const cb = parseRGB(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function parseRGB(input) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = input;
  const s = ctx.fillStyle; // normalized rgb(...)
  const m = s.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
  if (!m) return [255,255,255];
  return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
}

