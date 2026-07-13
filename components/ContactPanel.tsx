'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ParticlesCanvas from './ParticlesCanvas';
import { useSound } from '@/lib/useSound';

interface Props {
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPanel({ onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const playTick = useSound('/sounds/tic-sound.MP3', 0.4);

  const email = 'johnivanveluz@gmail.com';

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const isValid = await trigger();
    if (!isValid) e.preventDefault();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    { label: 'GitHub',   href: 'https://github.com/IvanVeluz18',            desc: 'Source of truth' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivanveluz/',     desc: 'Professional lore' },
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
          <h1 className="fp-title">Contact</h1>
          <p className="fp-subtitle">The road ahead is long. But ravens find their way.</p>
        </div>

        <div className="fp-body">
          {/* Left — email + form */}
          <div className="fp-col">
            <div className="fp-section-label">Direct Message</div>
            <div className="ct-email-block">
              <span className="ct-email">{email}</span>
              <button
                className="ct-copy-btn"
                onClick={handleCopy}
                onMouseEnter={playTick}
              >
                {copied ? 'Copied ✓' : 'Copy ↗'}
              </button>
            </div>

            <div className="fp-section-label" style={{ marginTop: '28px' }}>Leave a Message</div>
            <form
              className="ct-form"
              target="_blank"
              onSubmit={onSubmit}
              action="https://formsubmit.co/58d1e0d69a247c93a250a56912c00a91"
              method="POST"
            >
              {/* Disable formsubmit's captcha page */}
              <input type="hidden" name="_captcha" value="false" />

              <div className="ct-field">
                <label className="ct-label">Name</label>
                <input
                  type="text"
                  className="ct-input"
                  placeholder="Your name"
                  {...register('name', {
                    required: true,
                    maxLength: 100,
                  })}
                />
                {errors.name && (
                  <p className="ct-error">
                    {errors.name.type === 'required' && 'This field is required.'}
                    {errors.name.type === 'maxLength' && 'Max 100 characters.'}
                  </p>
                )}
              </div>

              <div className="ct-field">
                <label className="ct-label">Email</label>
                <input
                  type="email"
                  className="ct-input"
                  placeholder="your@email.com"
                  {...register('email', {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                />
                {errors.email && (
                  <p className="ct-error">
                    {errors.email.type === 'required' && 'This field is required.'}
                    {errors.email.type === 'pattern' && 'Invalid email address.'}
                  </p>
                )}
              </div>

              <div className="ct-field">
                <label className="ct-label">Message</label>
                <textarea
                  className="ct-input ct-textarea"
                  placeholder="What brings you to the bonfire?"
                  rows={4}
                  {...register('message', {
                    required: true,
                    maxLength: 2000,
                  })}
                />
                {errors.message && (
                  <p className="ct-error">
                    {errors.message.type === 'required' && 'This field is required.'}
                    {errors.message.type === 'maxLength' && 'Max 2000 characters.'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="proj-inspect-btn"
                onMouseEnter={playTick}
                style={{ marginTop: '4px' }}
              >
                Send Message ↗
              </button>
            </form>
          </div>

          {/* Right — links + availability */}
          <div className="fp-col">
            <div className="fp-section-label">Other Realms</div>
            <div className="ct-links">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ct-link-card"
                  onMouseEnter={playTick}
                >
                  <div className="ct-link-top">
                    <span className="ct-link-label">{l.label}</span>
                    <span className="ct-link-arrow">↗</span>
                  </div>
                  <p className="ct-link-desc">{l.desc}</p>
                </a>
              ))}
            </div>

            <div>
              <div className="fp-section-label" style={{ marginTop: '28px' }}>Availability</div>
              <div className="ct-avail" style={{ marginTop: '12px' }}>
                <span className="proj-status-dot" style={{ background: '#4a8a4a' }} />
                <span className="ct-avail-text">Open to new opportunities</span>
              </div>
              <p className="fp-text" style={{ marginTop: '10px', fontSize: '13px' }}>
                Currently available for freelance projects, full-time roles, and
                interesting collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}