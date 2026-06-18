'use client';

interface Props {
  hp: number;
  fp: number;
  st: number;
}

const BARS = [
  { label: 'HP', cls: 'fill-hp', key: 'hp' as const },
  { label: 'FP', cls: 'fill-fp', key: 'fp' as const },
  { label: 'ST', cls: 'fill-st', key: 'st' as const },
];

export default function HudBars({ hp, fp, st }: Props) {
  const values = { hp, fp, st };

  return (
    <div className="ds-hud-bar">
      {BARS.map(({ label, cls, key }) => (
        <div key={label} className="ds-hud-bar-wrap">
          <div className="ds-hud-bar-label">{label}</div>
          <div className="ds-hud-track">
            <div className={`ds-hud-fill ${cls}`} style={{ width: `${values[key]}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}