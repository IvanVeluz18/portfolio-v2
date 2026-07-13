'use client';

import { useEffect } from 'react';
import { PANEL_DATA } from '@/lib/panelData';
import { useSound } from '@/lib/useSound';
import ProjectsPanel from './ProjectsPanel';
import AboutPanel from './AboutPanel';
import SkillsPanel from './SkillsPanel';
import ContactPanel from './ContactPanel';

interface Props {
  section: string | null;
  visible: boolean;
  onClose: () => void;
}

const FULL_PANELS = ['projects', 'about', 'skills', 'contact'];

export default function PanelOverlay({ section, visible, onClose }: Props) {
  const playOpen = useSound('/sounds/open-sound.MP3', 0.5);
  const playBack = useSound('/sounds/back-sound.MP3', 0.5);

  useEffect(() => {
    if (visible) playOpen();
  }, [visible, playOpen]);

  const handleClose = () => {
    playBack();
    onClose();
  };

  if (visible && section && FULL_PANELS.includes(section)) {
    return (
      <div className="ds-panel visible" style={{ padding: 0 }}>
        {section === 'projects' && <ProjectsPanel onClose={handleClose} />}
        {section === 'about'    && <AboutPanel    onClose={handleClose} />}
        {section === 'skills'   && <SkillsPanel   onClose={handleClose} />}
        {section === 'contact'  && <ContactPanel  onClose={handleClose} />}
      </div>
    );
  }

  const data = section ? PANEL_DATA[section] : null;
  return (
    <div className={`ds-panel${visible ? ' visible' : ''}`}>
      <div className="ds-panel-inner">
        <div className="ds-panel-back" onClick={handleClose}>Back</div>
        {data && (
          <>
            <div className="ds-panel-title">{data.title}</div>
            <div className="ds-panel-content">{data.content}</div>
          </>
        )}
      </div>
    </div>
  );
}