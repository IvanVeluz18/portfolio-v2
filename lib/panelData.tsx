import { ReactNode } from 'react';

export interface PanelEntry {
  title: string;
  content: ReactNode;
}

export const PROJECTS = [
  {
    title: 'LB Client Booking',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    href: 'https://client.lay-bare.com/',
    image: '/assets/lb-client.png',
  },
  {
    title: 'Find The Pulse',
    tech: ['WordPress', 'Elementor', 'PHP'],
    href: 'https://findthepulse.co.uk/',
    image: '/assets/ftp.png',
  },
  {
    title: 'Lay Bare',
    tech: ['PHP', 'Bootstrap', 'jQuery'],
    href: 'https://lay-bare.com/',
    image: '/assets/lb-ws.png',
  },
  {
    title: 'Team Easy Crane',
    tech: ['WordPress', 'Elementor', 'PHP'],
    href: 'https://teameasycrane.co.uk/',
    image: '/assets/tec.png',
  },
  {
    title: 'Power Up Retreat',
    tech: ['WordPress', 'Elementor', 'PHP'],
    href: 'https://powerupretreat.com/',
    image: '/assets/pure.png',
  },
  {
    title: 'Other Projects',
    tech: ['VueJs', 'Supabase', 'Tailwind', 'Python'],
    href: 'https://github.com/IvanVeluz18',
  },
];

export const PANEL_DATA: Record<string, PanelEntry> = {
}

export const MENU_ITEMS = [
  { key: 'about', label: 'About Me' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Technical Skills' },
  null,
  { key: 'contact', label: 'Contact' },
] as const;