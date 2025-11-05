/**
 * Canvas utility functions for animations
 */

export const TAU = Math.PI * 2;

export const rand = (n) => n * Math.random();

export const randRange = (n) => n - rand(2 * n);

export const fadeInOut = (life, ttl) => {
  const halfLife = ttl / 2;
  return life < halfLife ? life / halfLife : 1 - (life - halfLife) / halfLife;
};

export const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end;
};

export const cos = Math.cos;
export const sin = Math.sin;
