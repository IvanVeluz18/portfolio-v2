'use client';

import ParticlesCanvas from './ParticlesCanvas';

interface Props {
  onClose: () => void;
}

const SKILL_GROUPS = [
  {
    category: 'Front-end',
    skills: ['React / Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'],
  },
  {
    category: 'Back-end',
    skills: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'],
  },
  {
    category: 'AI & Automation',
    skills: ['LLM Integration', 'Workflow Automation', 'Prompt Engineering'],
  },
  {
    category: 'Design & Tools',
    skills: ['Figma', 'Git / GitHub'],
  },
];

const STACK = [
  { label: 'Languages',  value: 'TypeScript, JavaScript, PHP' },
  { label: 'Frameworks', value: 'Next.js, React, Node.js' },
  { label: 'Databases',  value: 'PostgreSQL, Supabase, MySQL' },
  { label: 'CMS',        value: 'WordPress, Elementor' },
  { label: 'Design',     value: 'Figma, Tailwind CSS' },
  { label: 'DevOps',     value: 'Git, Vercel, GitHub Actions' },
];

export default function SkillsPanel({ onClose }: Props) {
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
          <h1 className="fp-title">Technical Skills</h1>
        </div>

        <div className="fp-body">

          <div className="fp-col">
            <div className="fp-section-label">Proficiency</div>
            {SKILL_GROUPS.map(group => (
              <div key={group.category} className="sk-group">
                <div className="sk-group-title">
                  <span className="sk-group-icon">◈</span>
                  {group.category}
                </div>
                <div className="sk-tag-list">
                  {group.skills.map((skill, i) => (
                    <div key={skill} className="sk-tag-item">
                      <span className="sk-tag-index">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="sk-tag-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="fp-col">
            <div className="fp-section-label">Tech Stack</div>
            <div className="fp-detail-list">
              {STACK.map(s => (
                <div key={s.label} className="fp-detail-item">
                  <span className="fp-detail-label">{s.label}</span>
                  <span className="fp-detail-value sk-stack-value">{s.value}</span>
                </div>
              ))}
            </div>

            <div className="fp-section-label" style={{ marginTop: '28px' }}>Currently Learning</div>
            <div className="sk-equip-list">
              {['Docker', 'CI/CD Pipelines', 'Agentic AI', 'Claude Code'].map(e => (
                <div key={e} className="sk-equip-item">
                  <span className="sk-equip-dot">◈</span>
                  {e}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}