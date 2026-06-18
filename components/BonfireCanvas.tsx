'use client';

import Image from 'next/image';

interface BonfireCanvasProps {
  displayWidth?: number;
  displayHeight?: number;
  width?: number;
  height?: number;
}

export default function BonfireCanvas({
  displayWidth = 80,
  displayHeight = 100,
}: BonfireCanvasProps) {
  return (
    <Image
      src="/dark-souls-bonfire.gif"
      alt="Bonfire"
      width={displayWidth}
      height={displayHeight}
      unoptimized
      priority
      style={{ display: 'block', imageRendering: 'pixelated' }}
    />
  );
}