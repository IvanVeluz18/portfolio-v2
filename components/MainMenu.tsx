'use client';

import { MENU_ITEMS } from 'lib/panelData';
import { useSound } from '@/lib/useSound';

interface Props {
  activeMenu: string;
  onHover: (key: string) => void;
  onSelect: (key: string) => void;
}

export default function MainMenu({ activeMenu, onHover, onSelect }: Props) {
  const playTick = useSound('/sounds/tic-sound.mp3', 0.4);

  return (
    <div className="ds-main-screen">
      <div className="ds-subtitle">Full Stack Developer &bull; AI Automation &bull; Designer</div>
      <div className="ds-title">John Ivan Veluz</div>

      <ul className="ds-menu-list">
        {MENU_ITEMS.map((item, i) =>
          item === null ? (
            <div key={`divider-${i}`} className="ds-menu-divider" />
          ) : (
            <li
              key={item.key}
              className={`ds-menu-item${activeMenu === item.key ? ' active' : ''}`}
              onMouseEnter={() => { onHover(item.key); playTick(); }}
              onClick={() => onSelect(item.key)}
            >
              {item.label}
            </li>
          )
        )}
      </ul>
    </div>
  );
}