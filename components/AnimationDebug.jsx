"use client";
import { useEffect, useState } from 'react';

/**
 * Debug component to check animation status
 * Remove this in production
 */
export default function AnimationDebug() {
  const [status, setStatus] = useState({
    finisher: false,
    lenis: false,
  });

  useEffect(() => {
    const checkInterval = setInterval(() => {
      setStatus({
        finisher: typeof window !== 'undefined' && !!window.FinisherHeader,
        lenis: typeof window !== 'undefined' && !!window.lenis,
      });
    }, 1000);

    return () => clearInterval(checkInterval);
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '16px',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#0f0',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 99999,
        border: '1px solid #0f0',
      }}
    >
      <div>🎨 Animations Status:</div>
      <div>Finisher: {status.finisher ? '✅' : '❌'}</div>
      <div>Lenis: {status.lenis ? '✅' : '❌'}</div>
    </div>
  );
}
