'use client';

import { useState } from 'react';
import Image from 'next/image';
import ParticlesCanvas from './ParticlesCanvas';
import { useSound } from '@/lib/useSound';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  status: string;
  year: string;
  stats?: { value: string; label: string }[];
  links?: { live?: string; code?: string };
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'lb-client',
    title: 'Lay Bare Client Booking',
    subtitle: 'Self Care Booking Platform',
    description:
      'A custom booking management system for Lay Bare Waxing Philippines Inc. that eliminates double bookings and manual workloads. Operating across almost 200 branches in the Philippines, it’s ready for their imminent expansion into Asia.',
    image: '/assets/lb-client2.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    status: 'Completed',
    year: '2025',
    stats: [
      { value: '130,000+', label: 'Monthly Users' },
    ],
    links: { live: 'https://client.lay-bare.com/' },
    featured: true,
  },
  {
    id: 'find-the-pulse',
    title: 'Find The Pulse',
    subtitle: 'B2B Lead Generation',
    description: 'A data-driven lead generation platform engineered to automate cold outreach, source high-intent B2B prospects, and streamline client acquisition. Built with advanced filtering and verification systems to maximize campaign reply rates and eliminate manual pipeline management.',
    image: '/assets/ftp.png',
    tags: ['WordPress', 'Elementor', 'PHP'],
    status: 'Completed',
    year: '2026',
    links: { live: 'https://findthepulse.co.uk/' },
  },
  {
    id: 'lay-bare',
    title: 'Lay Bare',
    subtitle: 'Multi-Brand Web Ecosystem',
    description: 'A multi-brand corporate portal built for Lay Bare\'s complete salon ecosystem. The platform serves as a unified digital brochure for all subsidiary brands while seamlessly bridging users to an integrated Shopify e-commerce platform for direct-to-consumer product sales.',
    image: '/assets/lb-ws.png',
    tags: ['PHP', 'Bootstrap', 'jQuery'],
    status: 'Completed',
    year: '2025',
    links: { live: 'https://lay-bare.com/' },
  },
  {
    id: 'team-easy-crane',
    title: 'Team Easy Crane',
    subtitle: 'Enterprise E-Commerce',
    description: 'A robust distributor and franchise management platform built to scale B2B office supply operations. It features centralized inventory management, custom purchasing power modules, and localized sub-stores for independent distributors across the UK.',
    image: '/assets/tec.png',
    tags: ['WordPress', 'Elementor', 'PHP'],
    status: 'Completed',
    year: '2025',
    links: { live: 'https://teameasycrane.co.uk/' },
  },
  {
    id: 'power-up-retreat',
    title: 'Power Up Retreat',
    subtitle: 'Wellness Booking Portal',
    description: 'A minimalist event management and booking platform built for international fitness and corporate wellness retreats. Integrated with real-time reservation scheduling, secure payment processing, and dynamic itinerary mapping for multi-location itineraries.',
    image: '/assets/pure.png',
    tags: ['WordPress', 'Elementor', 'PHP'],
    status: 'Completed',
    year: '2026',
    links: { live: 'https://powerupretreat.com/' },
  },
];

interface Props {
  onClose: () => void;
}

export default function ProjectsPanel({ onClose }: Props) {
  const [inspected, setInspected] = useState<Project | null>(null);
  const featured = PROJECTS.find(p => p.featured)!;
  const grid = PROJECTS.filter(p => !p.featured);

  const playTick = useSound('/sounds/tic-sound.MP3', 0.4);
  const playOpen = useSound('/sounds/open-sound.MP3', 0.5);
  const playBack = useSound('/sounds/back-sound.MP3', 0.5);

  const handleInspect = (p: Project) => {
    playOpen();
    setInspected(p);
  };

  const handleCloseInspect = () => {
    playBack();
    setInspected(null);
  };

  return (
    <div className="proj-root">
      <div className="proj-particles-wrap">
        <ParticlesCanvas containerRef={{ current: null }} />
      </div>

      <div className={`proj-main${inspected ? ' inspected' : ''}`}>
        <button className="proj-back" onClick={onClose}>
          <span className="proj-back-line" />
          Back to Bonfire
        </button>

        <h1 className="proj-title">Projects</h1>
        {/* <p className="proj-subtitle">Archives of battles fought and systems forged.</p>
        <p className="proj-count">
          Projects Discovered: <span>{PROJECTS.length} / {PROJECTS.length}</span>
        </p> */}

        <div className="proj-featured">
          <div className="proj-featured-badge">◈ Featured Project</div>
          <div className="proj-featured-inner">
            <div className="proj-featured-img-wrap">
              <Image src={featured.image} alt={featured.title} fill className="proj-card-img" unoptimized />
            </div>
            <div className="proj-featured-body">
              <h2 className="proj-featured-title">{featured.title}</h2>
              <p className="proj-featured-sub">{featured.subtitle}</p>
              <p className="proj-featured-desc">{featured.description}</p>
              <div className="proj-pills">
                {featured.tags.map(t => <span key={t} className="proj-pill">{t}</span>)}
              </div>
              {featured.stats && (
                <div className="proj-featured-stats">
                  <div className="proj-stat">
                    <span className="proj-stat-label">Completed</span>
                    <span className="proj-stat-value">{featured.year}</span>
                  </div>
                  {featured.stats.map(s => (
                    <div key={s.label} className="proj-stat">
                      <span className="proj-stat-label">{s.label}</span>
                      <span className="proj-stat-value">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="proj-inspect-btn"
                onMouseEnter={playTick}
                onClick={() => handleInspect(featured)}
              >
                Inspect Project ↗
              </button>
            </div>
          </div>
        </div>

        <div className="proj-grid">
          {grid.map(p => (
            <div
              key={p.id}
              className="proj-card"
              onMouseEnter={playTick}
              onClick={() => handleInspect(p)}
            >
              <div className="proj-card-img-wrap">
                <Image src={p.image} alt={p.title} fill className="proj-card-img" unoptimized />
              </div>
              <div className="proj-card-body">
                <h3 className="proj-card-title">{p.title}</h3>
                <p className="proj-card-sub">{p.subtitle}</p>
                <div className="proj-pills">
                  {p.tags.map(t => <span key={t} className="proj-pill">{t}</span>)}
                </div>
                <button className="proj-card-inspect">Inspect ↗</button>
              </div>
            </div>
          ))}
        </div>

        <p className="proj-footer">The journey continues...</p>
      </div>

      <div className={`proj-inspect-panel${inspected ? ' open' : ''}`}>
        {inspected && (
          <>
            <div className="proj-inspect-header">
              <span className="proj-inspect-label">Inspect Project</span>
              <button className="proj-inspect-close" onClick={handleCloseInspect}>✕</button>
            </div>
            <h2 className="proj-inspect-title">{inspected.title}</h2>
            <p className="proj-inspect-sub">{inspected.subtitle}</p>
            <div className="proj-inspect-img-wrap">
              <Image src={inspected.image} alt={inspected.title} fill className="proj-card-img" unoptimized />
            </div>
            <div className="proj-inspect-section-label">Description</div>
            <p className="proj-inspect-desc">{inspected.description}</p>
            <div className="proj-inspect-section-label">Technologies</div>
            <div className="proj-pills" style={{ marginBottom: '8px' }}>
              {inspected.tags.map(t => <span key={t} className="proj-pill">{t}</span>)}
            </div>
            <div className="proj-inspect-section-label">Status</div>
            <div className="proj-inspect-status">
              <span className="proj-status-dot" />
              {inspected.status}
              <span className="proj-inspect-year">◈ {inspected.year}</span>
            </div>
            {inspected.links && (
              <div className="proj-inspect-links">
                {inspected.links.live && (
                  <a href={inspected.links.live} target="_blank" rel="noreferrer" className="proj-link-btn">
                    Visit Site ↗
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}