'use client';

import { useId } from 'react';

export default function DotGrid({
  dotSize = 0.75,
  spacing = 16,
  color = 'var(--color-border)',
  opacity = 0.4,
  className = '',
}: {
  dotSize?: number;
  spacing?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    >
      <pattern
        id={id}
        x="0"
        y="0"
        width={spacing}
        height={spacing}
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx={spacing / 2}
          cy={spacing / 2}
          r={dotSize}
          fill={color}
          style={{ opacity }}
        />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
