'use client';

import { useEffect, useRef } from 'react';

interface Props {
  /** ref to the root container so the canvas can match its size */
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ParticlesCanvas({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = containerRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext('2d')!;
    let bW = 0, bH = 0;
    let animId: number;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; decay: number;
      size: number; hue: number;
    }

    let particles: Particle[] = [];

    function resize() {
      bW = canvas!.width = root!.offsetWidth;
      bH = canvas!.height = root!.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, bW, bH);

      if (Math.random() < 0.12) {
        particles.push({
          x: Math.random() * bW,
          y: bH * (0.6 + Math.random() * 0.4),
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.2 + Math.random() * 0.4),
          life: 1,
          decay: 0.002 + Math.random() * 0.003,
          size: 0.6 + Math.random() * 1.0,
          hue: 20 + Math.random() * 20,
        });
      }

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.03) * 0.2;
        p.y += p.vy;
        p.life -= p.decay;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},70%,55%,${p.life * 0.4})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} className="ds-particles" />;
}