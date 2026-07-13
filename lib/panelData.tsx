import { ReactNode } from 'react';

export interface PanelEntry {
  title: string;
  content: ReactNode;
}

export const PANEL_DATA: Record<string, PanelEntry> = {
}

export const MENU_ITEMS = [
  { key: 'about', label: 'About Me' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Technical Skills' },
  null,
  { key: 'contact', label: 'Contact' },
] as const;