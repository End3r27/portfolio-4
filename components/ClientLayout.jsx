"use client";
import SmoothScrollProvider from './SmoothScrollProvider';

/**
 * Client-side layout wrapper that provides smooth scrolling
 * This separates client-side logic from the server-side root layout
 */
export default function ClientLayout({ children }) {
  return (
    <SmoothScrollProvider
      duration={1.2}
      easing={(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))}
      orientation="vertical"
      smoothWheel={true}
      wheelMultiplier={1}
      touchMultiplier={2}
      lerp={0.1}
    >
      {children}
    </SmoothScrollProvider>
  );
}
