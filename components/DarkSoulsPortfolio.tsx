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

// ── Drain map — fixed amounts per section, always the same ───────────────────
const DRAIN: Record<string, { hp: number; fp: number; st: number }> = {
  about:    { hp: 25, fp: 0,  st: 0  },
  projects: { hp: 25, fp: 20,  st: 55 },
  skills:   { hp: 25, fp: 50, st: 0  },
  contact:  { hp: 25, fp: 30, st: 45 },
};

const INITIAL = { hp: 100, fp: 100, st: 100 };

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
  const [youDiedKey, setYouDiedKey]   = useState(0);

  // ── HUD state ──────────────────────────────────────────────────────────────
  const [souls, setSouls]       = useState(12800);
  const [soulGlow, setSoulGlow] = useState(false);
  const [hp, setHp]             = useState(INITIAL.hp);
  const [fp, setFp]             = useState(INITIAL.fp);
  const [st, setSt]             = useState(INITIAL.st);

  // Keep latest bar values in refs so callbacks always read fresh state
  // without needing to be in their dependency arrays
  const hpRef = useRef(INITIAL.hp);
  const fpRef = useRef(INITIAL.fp);
  const stRef = useRef(INITIAL.st);
  useEffect(() => { hpRef.current = hp; }, [hp]);
  useEffect(() => { fpRef.current = fp; }, [fp]);
  useEffect(() => { stRef.current = st; }, [st]);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const [toast, setToast]             = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // ── Sounds ────────────────────────────────────────────────────────────────
  const playTick    = useSound('/sounds/tic-sound.MP3', 0.4);
  const playOpen    = useSound('/sounds/open-sound.MP3', 0.5);
  const playBack    = useSound('/sounds/back-sound.MP3', 0.5);
  const playEaster  = useSound('/sounds/easter-sound.MP3', 0.6);
  const playBonfire = useSound('/sounds/bonfire-sound.MP3', 0.5);

  // ── Loading screen ─────────────────────────────────────────────────────────
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
      } else { idx = 0; }
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
    setSouls(s => s + n);
    setSoulGlow(true);
    setTimeout(() => setSoulGlow(false), 600);
  }, []);

  const triggerYouDied = useCallback(() => {
    playEaster();
    setSouls(0);
    setYouDied(false);
    setYouDiedText(false);
    setYouDiedSub(false);
    setYouDiedKey(k => k + 1);
    setTimeout(() => {
      setYouDied(true);
      setTimeout(() => setYouDiedText(true), 200);
      setTimeout(() => setYouDiedSub(true),  600);
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restoreStats = useCallback(() => {
    setHp(INITIAL.hp);
    setFp(INITIAL.fp);
    setSt(INITIAL.st);
  }, []);

  const handleBonfire = useCallback(() => {
    playBonfire();
    showToast('Bonfire Lit');
    addSouls(500);
    restoreStats();
  }, [playBonfire, showToast, addSouls, restoreStats]);

  const dismissDied = useCallback(() => {
    setYouDied(false);
    restoreStats();
    showToast('Bonfire Lit');
    setSouls(0);
    setTimeout(() => addSouls(12800), 100);
  }, [restoreStats, showToast, addSouls]);

  // ── Drain logic ────────────────────────────────────────────────────────────
  const drainStats = useCallback((section: string) => {
    const d = DRAIN[section];
    if (!d) return;

    const newHp = Math.max(0, hpRef.current - d.hp);
    const newFp = Math.max(0, fpRef.current - d.fp);
    const newSt = Math.max(0, stRef.current - d.st);

    setHp(newHp);
    setFp(newFp);
    setSt(newSt);

    // Trigger You Died 1.5s after drain — gives user time to see bars hit zero
    if (newHp === 0 && newFp === 0 && newSt === 0) {
      setTimeout(() => triggerYouDied(), 1500);
    }
  }, [triggerYouDied]);

  // ── Panel ──────────────────────────────────────────────────────────────────
  const openPanel = useCallback((section: string) => {
    playOpen();
    drainStats(section);
    setPanel(section);
    setPanelVisible(true);
  }, [playOpen, drainStats]);

  const closePanel = useCallback(() => {
    playBack();
    setPanelVisible(false);
  }, [playBack]);

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

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="ds-root" ref={rootRef}>

      {loading && <LoadingScreen fadeOut={loadingFadeOut} />}

      <ParticlesCanvas containerRef={rootRef} />
      <div className="ds-vignette" />

      {/* <div className="ds-konami-hint">
        <span className="ds-konami-desktop">Try: ↑ ↑ ↓ ↓</span>
        <span className="ds-konami-mobile">Try tapping the bonfire 5 times</span>
      </div> */}

      <SoulCounter souls={souls} glow={soulGlow} />

      <MainMenu
        activeMenu={activeMenu}
        onHover={(key) => { setActiveMenu(key); playTick(); }}
        onSelect={openPanel}
      />

      <HudBars hp={hp} fp={fp} st={st} />

      <div className="ds-bonfire-area" onClick={handleBonfireClick}>
        <BonfireCanvas displayWidth={110} displayHeight={140} width={160} height={200} />
        <div className="ds-bonfire-label">Rest</div>
      </div>

      <PanelOverlay section={panel} visible={panelVisible} onClose={closePanel} />

      <Toast message={toast} visible={toastVisible} />

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