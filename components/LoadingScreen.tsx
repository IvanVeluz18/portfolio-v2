'use client';

import BonfireCanvas from './BonfireCanvas';

interface Props {
  fadeOut: boolean;
}

export default function LoadingScreen({ fadeOut }: Props) {
  return (
    <div className={`ds-loading-screen${fadeOut ? ' fade-out' : ''}`}>
      <BonfireCanvas displayWidth={80} displayHeight={100} />
      <div className="ds-loading-tip">Seek guidance from the bonfire</div>
    </div>
  );
}