"use client";
import { useEffect, useRef } from 'react';
import SimplexNoise from '@/lib/simplex-noise';
import { TAU, rand, randRange, fadeInOut, lerp, cos, sin } from '@/lib/canvas-utils';

const SwirlBackground = () => {
  const containerRef = useRef(null);
  const canvasARef = useRef(null);
  const canvasBRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlePropsRef = useRef(null);
  const simplexRef = useRef(null);
  const tickRef = useRef(0);
  const centerRef = useRef([0, 0]);

  // Configuration
  const config = {
    particleCount: 700,
    particlePropCount: 9,
    rangeY: 100,
    baseTTL: 50,
    rangeTTL: 150,
    baseSpeed: 0.1,
    rangeSpeed: 2,
    baseRadius: 1,
    rangeRadius: 4,
    baseHue: 220,
    rangeHue: 100,
    noiseSteps: 8,
    xOff: 0.00125,
    yOff: 0.00125,
    zOff: 0.0005,
    backgroundColor: 'hsla(260,40%,5%,1)'
  };

  useEffect(() => {
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;
    if (!canvasA || !canvasB) return;

    const ctxA = canvasA.getContext('2d');
    const ctxB = canvasB.getContext('2d');

    // Initialize particles
    const initParticles = () => {
      tickRef.current = 0;
      simplexRef.current = new SimplexNoise();
      const particlePropsLength = config.particleCount * config.particlePropCount;
      particlePropsRef.current = new Float32Array(particlePropsLength);

      for (let i = 0; i < particlePropsLength; i += config.particlePropCount) {
        initParticle(i);
      }
    };

    const initParticle = (i) => {
      const x = rand(canvasA.width);
      const y = centerRef.current[1] + randRange(config.rangeY);
      const vx = 0;
      const vy = 0;
      const life = 0;
      const ttl = config.baseTTL + rand(config.rangeTTL);
      const speed = config.baseSpeed + rand(config.rangeSpeed);
      const radius = config.baseRadius + rand(config.rangeRadius);
      const hue = config.baseHue + rand(config.rangeHue);

      particlePropsRef.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    };

    const checkBounds = (x, y) => {
      return x > canvasA.width || x < 0 || y > canvasA.height || y < 0;
    };

    const drawParticle = (x, y, x2, y2, life, ttl, radius, hue) => {
      ctxA.save();
      ctxA.lineCap = 'round';
      ctxA.lineWidth = radius;
      ctxA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctxA.beginPath();
      ctxA.moveTo(x, y);
      ctxA.lineTo(x2, y2);
      ctxA.stroke();
      ctxA.closePath();
      ctxA.restore();
    };

    const updateParticle = (i) => {
      const props = particlePropsRef.current;
      const i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i;
      const i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;

      const x = props[i];
      const y = props[i2];
      const n = simplexRef.current.noise3D(
        x * config.xOff,
        y * config.yOff,
        tickRef.current * config.zOff
      ) * config.noiseSteps * TAU;

      const vx = lerp(props[i3], cos(n), 0.5);
      const vy = lerp(props[i4], sin(n), 0.5);
      const life = props[i5];
      const ttl = props[i6];
      const speed = props[i7];
      const x2 = x + vx * speed;
      const y2 = y + vy * speed;
      const radius = props[i8];
      const hue = props[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      const newLife = life + 1;
      props[i] = x2;
      props[i2] = y2;
      props[i3] = vx;
      props[i4] = vy;
      props[i5] = newLife;

      if (checkBounds(x, y) || newLife > ttl) {
        initParticle(i);
      }
    };

    const drawParticles = () => {
      const particlePropsLength = config.particleCount * config.particlePropCount;
      for (let i = 0; i < particlePropsLength; i += config.particlePropCount) {
        updateParticle(i);
      }
    };

    const renderGlow = () => {
      ctxB.save();
      ctxB.filter = 'blur(8px) brightness(200%)';
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();

      ctxB.save();
      ctxB.filter = 'blur(4px) brightness(200%)';
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const renderToScreen = () => {
      ctxB.save();
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const draw = () => {
      tickRef.current++;

      ctxA.clearRect(0, 0, canvasA.width, canvasA.height);
      ctxB.fillStyle = config.backgroundColor;
      ctxB.fillRect(0, 0, canvasA.width, canvasA.height);

      drawParticles();
      renderGlow();
      renderToScreen();

      animationFrameRef.current = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const { innerWidth, innerHeight } = window;

      canvasA.width = innerWidth;
      canvasA.height = innerHeight;
      ctxA.drawImage(canvasB, 0, 0);

      canvasB.width = innerWidth;
      canvasB.height = innerHeight;
      ctxB.drawImage(canvasA, 0, 0);

      centerRef.current[0] = 0.5 * canvasA.width;
      centerRef.current[1] = 0.5 * canvasA.height;
    };

    // Setup
    resize();
    initParticles();
    draw();

    // Event listener
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    >
      <canvas
        ref={canvasARef}
        style={{ display: 'none' }}
      />
      <canvas
        ref={canvasBRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default SwirlBackground;
