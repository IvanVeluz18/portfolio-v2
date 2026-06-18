'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

import BonfireCanvas from './BonfireCanvas';
import ParticlesCanvas from './ParticlesCanvas';
import LoadingScreen from './LoadingScreen';
import MainMenu from './MainMenu';
import SoulCounter from './SoulCounter';
import HudBars from './HudBars';
import PanelOverlay from './PanelOverlay';
import YouDiedScreen from './YouDiedScreen';
import Toast from './Toast';
import { useSound } from '@/lib/useSound';

export default function DarkSoulsPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);

  // ── UI state ───────────────────────────────────────────────────────────────
  const [loading, setLoading]               = useState(true);
  const [loadingFadeOut, setLoadingFadeOut] = useState(false);
  const [activeMenu, setActiveMenu]         = useState('about');
  const [panel, setPanel]                   = useState<string | null>(null);
  const [panelVisible, setPanelVisible]     = useState(false);

  // ── YOU DIED state ─────────────────────────────────────────────────────────
  const [youDied, setYouDied]         = useState(false);
  const [youDiedText, setYouDiedText] = useState(false);
  const [youDiedSub, setYouDiedSub]   = useState(false);
  // Incrementing this key forces YouDiedScreen to fully remount on each trigger,
  // so CSS transitions reset cleanly even when triggered multiple times.
  const [youDiedKey, setYouDiedKey]   = useState(0);

  // ── HUD state ──────────────────────────────────────────────────────────────
  const [souls, setSouls]         = useState(12800);
  const [soulGlow, setSoulGlow]   = useState(false);
  const [hp, setHp]               = useState(82);
  const [fp, setFp]               = useState(60);
  const [st, setSt]               = useState(95);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const [toast, setToast]             = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const playEaster  = useSound('/sounds/easter-sound.mp3', 0.5);
  const playBonfire = useSound('/sounds/bonfire-sound.mp3', 0.5);

  // ── Loading screen: fade out after 2.4s, unmount after 3.4s ───────────────
  useEffect(() => {
    const t1 = setTimeout(() => setLoadingFadeOut(true), 2400);
    const t2 = setTimeout(() => setLoading(false), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── Konami code: ↑ ↑ ↓ ↓ ─────────────────────────────────────────────────
  useEffect(() => {
    const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === SEQ[idx]) {
        idx++;
        if (idx === SEQ.length) { idx = 0; triggerYouDied(); }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  }, []);

  const addSouls = useCallback((n: number) => {
    setSouls((s) => s + n);
    setSoulGlow(true);
    setTimeout(() => setSoulGlow(false), 600);
  }, []);

  const handleBonfire = useCallback(() => {
    playBonfire();
    showToast('Bonfire Lit');
    addSouls(500);
    setHp(100); setFp(100); setSt(100);
    setTimeout(() => { setHp(82); setFp(60); setSt(95); }, 2000);
  }, [showToast, addSouls, playBonfire]);

  const triggerYouDied = useCallback(() => {
    playEaster();
    setSouls(0);
    setYouDied(false);
    setYouDiedText(false);
    setYouDiedSub(false);
    setYouDiedKey((k) => k + 1);
    setTimeout(() => {
      setYouDied(true);
      setTimeout(() => setYouDiedText(true), 200);
      setTimeout(() => setYouDiedSub(true), 600);
    }, 50);
  }, [playEaster]);

  const dismissDied = useCallback(() => {
    setYouDied(false);
    handleBonfire();
    setSouls(0);
    setTimeout(() => addSouls(12800), 100);
  }, [handleBonfire, addSouls]);

  // ── Bonfire: 5-tap easter egg ──────────────────────────────────────────────
  const bonfireTaps  = useRef(0);
  const bonfireTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBonfireClick = useCallback(() => {
    bonfireTaps.current++;
    if (bonfireTimer.current) clearTimeout(bonfireTimer.current);
    bonfireTimer.current = setTimeout(() => { bonfireTaps.current = 0; }, 1500);

    if (bonfireTaps.current >= 5) {
      bonfireTaps.current = 0;
      triggerYouDied();
    } else {
      handleBonfire();
    }
  }, [handleBonfire, triggerYouDied]);

  // ── Panel ──────────────────────────────────────────────────────────────────
  const openPanel  = (section: string) => { setPanel(section); setPanelVisible(true); };
  const closePanel = () => setPanelVisible(false);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="ds-root" ref={rootRef}>

      {loading && <LoadingScreen fadeOut={loadingFadeOut} />}

      <ParticlesCanvas containerRef={rootRef} />
      <div className="ds-vignette" />

        <div className="ds-konami-hint">
          <span className="ds-konami-desktop">Try: ↑ ↑ ↓ ↓</span>
          <span className="ds-konami-mobile">Try: Bonfire ×5</span>
        </div>

      <SoulCounter souls={souls} glow={soulGlow} />

      <MainMenu
        activeMenu={activeMenu}
        onHover={setActiveMenu}
        onSelect={openPanel}
      />

      {/* Bottom-left: HUD bars */}
      <HudBars hp={hp} fp={fp} st={st} />

      {/* Bottom-right: bonfire */}
      <div className="ds-bonfire-area" onClick={handleBonfireClick}>
        <BonfireCanvas displayWidth={110} displayHeight={140} width={160} height={200} />
        <div className="ds-bonfire-label">Rest</div>
      </div>

      {/* Section panel */}
      <PanelOverlay section={panel} visible={panelVisible} onClose={closePanel} />

      {/* Toast notification */}
      <Toast message={toast} visible={toastVisible} />

      {/* YOU DIED easter egg */}
      <YouDiedScreen
        key={youDiedKey}
        show={youDied}
        textVisible={youDiedText}
        subVisible={youDiedSub}
        onDismiss={dismissDied}
      />
    </div>
  );
}