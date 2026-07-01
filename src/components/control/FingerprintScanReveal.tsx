import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FINGERPRINT_SRC = '/assets/fingerprint-arch.svg';
/** Scan line travel — main “live analysis” beat */
const SCAN_MS = 12_000;
/** Full print + ARCH held on screen before fade */
const HOLD_MS = 2_500;
/** Scanner panel fade-out before report text */
const FADE_MS = 900;

const STATUS_LINES = [
  'Acquiring partial print…',
  'Cleaning ridge noise…',
  'Enhancing detail…',
  'Cross-matching records…',
  'Ruled out: WHORL pattern',
];

type ScanPhase = 'scanning' | 'hold' | 'fading' | 'finished';

interface FingerprintScanRevealProps {
  variant?: 'cinematic' | 'panel';
  active?: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function FingerprintScanReveal({
  variant = 'cinematic',
  active = true,
  onComplete,
  className = '',
}: FingerprintScanRevealProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [phase, setPhase] = useState<ScanPhase>('scanning');
  const [visible, setVisible] = useState(true);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const timersRef = useRef<number[]>([]);
  const frameRef = useRef(0);
  const scanEndedRef = useRef(false);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const finish = () => {
    setPhase('finished');
    setVisible(false);
    onCompleteRef.current?.();
  };

  const startFade = () => {
    setPhase('fading');
    timersRef.current.push(
      window.setTimeout(() => {
        finish();
      }, FADE_MS),
    );
  };

  const enterHold = () => {
    if (scanEndedRef.current) return;
    scanEndedRef.current = true;
    cancelAnimationFrame(frameRef.current);
    setProgress(1);
    setStatusIndex(STATUS_LINES.length - 1);
    setPhase('hold');
    timersRef.current.push(window.setTimeout(startFade, HOLD_MS));
  };

  useEffect(() => {
    if (!active) {
      clearTimers();
      cancelAnimationFrame(frameRef.current);
      scanEndedRef.current = false;
      setProgress(0);
      setStatusIndex(0);
      setPhase('scanning');
      setVisible(true);
      return;
    }

    clearTimers();
    cancelAnimationFrame(frameRef.current);
    scanEndedRef.current = false;
    setProgress(0);
    setStatusIndex(0);
    setPhase('scanning');
    setVisible(true);

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(1, elapsed / SCAN_MS);
      setProgress(p);
      setStatusIndex(
        Math.min(STATUS_LINES.length - 1, Math.floor(p * STATUS_LINES.length)),
      );

      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      enterHold();
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimers();
    };
  }, [active]);

  const skip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (phase === 'finished' || phase === 'fading') return;
    cancelAnimationFrame(frameRef.current);
    clearTimers();
    if (phase === 'scanning') {
      enterHold();
      return;
    }
    if (phase === 'hold') {
      startFade();
    }
  };

  const scanY = `${progress * 100}%`;
  const revealClip = `inset(0 0 ${(1 - progress) * 100}% 0)`;
  const isCinematic = variant === 'cinematic';
  const scanComplete = phase !== 'scanning';

  if (!visible && phase === 'finished') {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scanner"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'fading' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
          className={`relative select-none ${className}`}
          onClick={skip}
          role="presentation"
        >
          <div
            className={`relative mx-auto overflow-hidden rounded-xl border ${
              isCinematic ? 'max-w-md md:max-w-lg' : 'max-w-sm'
            }`}
            style={{
              borderColor: 'rgb(52 211 153 / 0.35)',
              background: 'linear-gradient(180deg, rgb(8 20 18 / 0.95), rgb(4 12 10 / 0.98))',
              boxShadow: '0 0 40px rgb(16 185 129 / 0.12), inset 0 0 60px rgb(0 0 0 / 0.5)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgb(52 211 153 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(52 211 153 / 0.15) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative px-6 pt-5 pb-2 flex items-center justify-between gap-3">
              <p className="font-mono-label text-[10px] md:text-xs uppercase tracking-[0.25em] text-emerald-400/90">
                Live scan
              </p>
              <motion.span
                className="font-mono-label text-[10px] md:text-xs text-emerald-300/70 tabular-nums"
                animate={{ opacity: phase === 'scanning' ? [0.5, 1, 0.5] : 1 }}
                transition={{
                  repeat: phase === 'scanning' ? Infinity : 0,
                  duration: 1.2,
                }}
              >
                {phase === 'scanning' ? Math.round(progress * 100) : 100}%
              </motion.span>
            </div>

            <div
              className={`relative mx-auto ${isCinematic ? 'w-48 h-60 md:w-56 md:h-72' : 'w-40 h-52'}`}
            >
              <img
                src={FINGERPRINT_SRC}
                alt=""
                className="absolute inset-0 w-full h-full object-contain opacity-[0.12] blur-[0.5px]"
                draggable={false}
              />

              <motion.div
                className="absolute inset-0 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgb(255 255 255 / 0.03) 2px, rgb(255 255 255 / 0.03 4px)',
                }}
                animate={{ opacity: progress < 0.12 ? 0.6 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div
                className="absolute inset-0"
                style={{ clipPath: revealClip, WebkitClipPath: revealClip }}
              >
                <img
                  src={FINGERPRINT_SRC}
                  alt="Arch fingerprint partial print"
                  className="w-full h-full object-contain drop-shadow-[0_0_12px_rgb(52_211_153/0.45)]"
                  draggable={false}
                />
              </div>

              {phase === 'scanning' && (
                <motion.div
                  className="absolute left-0 right-0 h-[3px] pointer-events-none z-10"
                  style={{
                    top: scanY,
                    background: 'linear-gradient(90deg, transparent, rgb(110 231 183), transparent)',
                    boxShadow:
                      '0 0 16px rgb(52 211 153 / 0.9), 0 0 32px rgb(16 185 129 / 0.6), 0 -8px 24px rgb(52 211 153 / 0.25)',
                  }}
                />
              )}

              {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
                <span
                  key={corner}
                  className="absolute w-5 h-5 border-emerald-400/50 pointer-events-none"
                  style={{
                    top: corner.startsWith('t') ? 8 : undefined,
                    bottom: corner.startsWith('b') ? 8 : undefined,
                    left: corner.endsWith('l') ? 8 : undefined,
                    right: corner.endsWith('r') ? 8 : undefined,
                    borderTopWidth: corner.startsWith('t') ? 2 : 0,
                    borderBottomWidth: corner.startsWith('b') ? 2 : 0,
                    borderLeftWidth: corner.endsWith('l') ? 2 : 0,
                    borderRightWidth: corner.endsWith('r') ? 2 : 0,
                  }}
                />
              ))}
            </div>

            <div className="px-6 py-4 min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-mono-label text-xs md:text-sm uppercase tracking-widest text-center"
                  style={{
                    color: scanComplete ? 'rgb(110 231 183)' : 'rgb(167 243 208 / 0.85)',
                  }}
                >
                  {STATUS_LINES[statusIndex]}
                </motion.p>
              </AnimatePresence>

              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-3 text-center"
                >
                  <p className="font-mono-label text-lg md:text-xl tracking-[0.2em] text-emerald-300">
                    NOT WHORL
                  </p>
                  <p className="mt-1 font-mono-label text-xs md:text-sm tracking-widest text-emerald-300/70">
                    Arch or loop — inconclusive
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {phase === 'scanning' && isCinematic && (
            <p className="mt-4 font-mono-label text-xs text-zinc-500 uppercase tracking-widest text-center">
              Tap to skip scan
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function isFingerprintEvidence(evidenceId?: string) {
  return evidenceId === 'fingerprint_report';
}

export const FINGERPRINT_SCAN_MS = SCAN_MS;
export const FINGERPRINT_HOLD_MS = HOLD_MS;
export const FINGERPRINT_FADE_MS = FADE_MS;
