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
  about: {
    title: 'About Me',
    content: (
      <>
        <p>
          Hi! I'm Ivan Veluz, a performance-driven Full Stack Developer based in Quezon City, Philippines.
          I graduated Cum Laude with a BS in Computer Science from the Polytechnic University of the Philippines.
          My software engineering journey began back in 2018. Today, I specialize in bridging the gap between robust backend
          architectures and sleek, high-performance frontend interfaces. I love taking complex backend systems 
          and transforming them into seamless, lightning-fast user experiences.
        </p>
        <h3 style={{marginBottom: '24px'}}>Let's Connect!</h3>
        <p>
          I am actively seeking full-time, part-time, or project-based opportunities. 
          If you're looking for a versatile, dedicated developer who delivers results and thrives in team environments, 
          let's build something great together! Feel free to reach out for collaborations or inquiries.
        </p>
        <p
          style={{
            color: 'inherit',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: '24px',
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#d4aa00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
        >
          Location &bull; Quezon City, PH
        </p>
      </>
    ),
  },

  projects: {
    title: 'Projects',
    content: null, // 👈 now rendered inside PanelOverlay
  },

  skills: {
    title: 'Technical Skills',
    content: (
      <>
        <p>
          React &bull; Next.js &bull; TypeScript
          <br />
          Node.js &bull; Supabase &bull; PostgreSQL
          <br />
          Tailwind CSS &bull; Framer Motion
        </p>
        <p
          style={{
            marginTop: '20px',
            color: '#4a3e2a',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          Intelligence: 40 &bull; Dexterity: 38 &bull; Endurance: 45
        </p>
      </>
    ),
  },

  contact: {
    title: 'Send Message',
    content: (
      <>
        <p>Let's connect and forge something meaningful together.</p>

        <a
          href="mailto:johnivanveluz@gmail.com"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          johnivanveluz@gmail.com
        </a>

        <p style={{ marginTop: '20px', letterSpacing: '3px' }}>
          <a
            href="https://github.com/IvanVeluz18"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#d4aa00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
          >
            GitHub
          </a>

          <span> • </span>

          <a
            href="https://www.linkedin.com/in/ivanveluz/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#d4aa00')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
          >
            LinkedIn
          </a>
        </p>
      </>
    ),
  },
};

export const MENU_ITEMS = [
  { key: 'about', label: 'About Me' },
  { key: 'projects', label: 'Projects' },
  { key: 'skills', label: 'Skills & Arsenal' },
  null,
  { key: 'contact', label: 'Contact' },
] as const;