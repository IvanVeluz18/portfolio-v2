'use client';

import ParticlesCanvas from './ParticlesCanvas';
import { useSound } from '@/lib/useSound';

interface Props {
  onClose: () => void;
}

export default function AboutPanel({ onClose }: Props) {
  const playTick = useSound('/sounds/tic-sound.mp3', 0.4);

  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '20+' },
    { label: 'Clients Served', value: '10+' },
  ];

  const timeline = [
    { year: '2025 - present', title: 'Automation Specialist', place: 'Freelance' },
    { year: '2023 - present', title: 'Full Stack Developer', place: 'Current Role' },
    { year: '2018 - 2022', title: 'Front-end Developer', place: 'First Role' },
  ];

  return (
    <div className="fp-root">
      <div className="proj-particles-wrap">
        <ParticlesCanvas containerRef={{ current: null }} />
      </div>

      <div className="fp-inner">
        <button className="proj-back" onClick={onClose}>
          <span className="proj-back-line" />
          Back to Bonfire
        </button>

        <div className="fp-header">
          <h1 className="fp-title">About Me</h1>
        </div>

        <div className="fp-body">
          <div className="fp-col">
            <p className="fp-text">
              Hi! I&apos;m Ivan Veluz, a performance-driven Full Stack Developer based in Quezon City, Philippines.
              I graduated Cum Laude with a BS in Computer Science from the Polytechnic University of the Philippines.
              My software engineering journey began back in 2018. Today, I specialize in bridging the gap between robust backend
              architectures and sleek, high-performance frontend interfaces. I love taking complex backend systems
              and transforming them into seamless, lightning-fast user experiences.
            </p>
            <p className="fp-text">
              I&apos;m actively seeking full-time, part-time, or project-based opportunities.
              If you&apos;re looking for a versatile, dedicated developer who delivers results and thrives in team environments,
              let&apos;s build something great together! Feel free to reach out for collaborations or inquiries.
            </p>
          </div>

          <div className="fp-col">
            <div className="fp-stats-grid">
              {stats.map(s => (
                <div
                  key={s.label}
                  className="fp-stat-card"
                  onMouseEnter={playTick}
                >
                  <div className="fp-stat-value">{s.value}</div>
                  <div className="fp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="fp-section-label" style={{ marginTop: '28px' }}>Professional Experience</div>
            <div className="fp-timeline">
              {timeline.map((t, i) => (
                <div key={i} className="fp-timeline-item">
                  <span className="fp-timeline-year">{t.year}</span>
                  <div className="fp-timeline-dot" />
                  <div className="fp-timeline-content">
                    <div className="fp-timeline-title">{t.title}</div>
                    <div className="fp-timeline-place">{t.place}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fp-section-label" style={{ marginTop: '28px' }}>More Info</div>
            <div className="fp-detail-list">
              {[
                { label: 'Location', value: 'Quezon City, PH' },
                { label: 'Available', value: 'Open to opportunities' },
                { label: 'Languages', value: 'Filipino, English' },
              ].map(d => (
                <div key={d.label} className="fp-detail-item">
                  <span className="fp-detail-label">{d.label}</span>
                  <span className="fp-detail-value">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}