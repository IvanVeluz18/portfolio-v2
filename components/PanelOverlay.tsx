'use client';

import { useEffect } from 'react';
import { PANEL_DATA, PROJECTS } from '@/lib/panelData';
import { useSound } from '@/lib/useSound';

interface Props {
  section: string | null;
  visible: boolean;
  onClose: () => void;
}

export default function PanelOverlay({ section, visible, onClose }: Props) {
  const data = section ? PANEL_DATA[section] : null;

  const playOpen = useSound('/sounds/open-sound.MP3', 0.5);
  const playBack = useSound('/sounds/back-sound.MP3', 0.5);
  const playTick = useSound('/sounds/tic-sound.MP3', 0.4); // 👈 reused here

  useEffect(() => {
    if (visible) playOpen();
  }, [visible, playOpen]);

  const handleClose = () => {
    playBack();
    onClose();
  };

  return (
    <div className={`ds-panel${visible ? ' visible' : ''}`}>
      <div className="ds-panel-inner">
        <div className="ds-panel-back" onClick={handleClose}>
          Back
        </div>

        {data && (
          <>
            <div className="ds-panel-title">{data.title}</div>

            <div className="ds-panel-content">
              {section === 'projects' ? (
                <div className="project-grid">
                  {PROJECTS.map((p) => (
                    <div
                      key={p.title}
                      className="project-card"
                      onMouseEnter={() => playTick()} // 👈 SOUND HERE
                    >
                      <div className="project-card-image">
                        <div className="project-card-image-grid" />
                        <div className="project-card-image">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="project-card-img"
                          />
                        </div>
                      </div>

                      <div className="project-card-body">
                        <div className="project-card-title">{p.title}</div>

                        <div className="project-card-footer">
                          <div className="project-card-pills">
                            {p.tech.map((t) => (
                              <span key={t} className="project-pill">
                                {t}
                              </span>
                            ))}
                          </div>

                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card-btn"
                          >
                            Visit ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                data.content
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}