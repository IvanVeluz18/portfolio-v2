'use client';

interface Props {
  souls: number;
  glow: boolean;
}

export default function SoulCounter({ souls, glow }: Props) {
  return (
    <div className="ds-soul-count">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="9" r="7" fill="#1a2a3a" stroke="#4a6a8a" strokeWidth="0.8" />
        <circle cx="9" cy="9" r="4" fill="#2a4a6a" opacity="0.8" />
        <circle cx="9" cy="9" r="1.5" fill="#8ab0d0" opacity="0.9" />
        <path d="M9 4 Q11 6 9 8 Q7 6 9 4Z" fill="#8ab0d0" opacity="0.5" />
      </svg>
      <div className={`ds-soul-number${glow ? ' glow' : ''}`}>
        {souls.toLocaleString()}
      </div>
    </div>
  );
}