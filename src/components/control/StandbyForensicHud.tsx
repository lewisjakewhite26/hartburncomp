import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function useHexStream(length: number, tickMs = 120) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), tickMs);
    return () => window.clearInterval(id);
  }, [tickMs]);

  return useMemo(() => {
    const hex = '0123456789ABCDEF';
    let seed = tick * 9973;
    return Array.from({ length }, () => {
      seed = (seed * 16807 + 7) % 2147483647;
      return hex[seed % 16]!;
    }).join('');
  }, [length, tick]);
}

function CornerBars({ flip }: { flip?: boolean }) {
  return (
    <div className={`standby-hud__bars ${flip ? 'standby-hud__bars--flip' : ''}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="standby-hud__bar"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </div>
  );
}

function TickRing({ reverse, duration }: { reverse?: boolean; duration: number }) {
  return (
    <div
      className={`standby-hud__spin ${reverse ? 'standby-hud__spin--rev' : ''}`}
      style={{ animationDuration: `${duration}s` }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="standby-hud__spin-svg">
        <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgb(34 211 238 / 0.15)" strokeWidth="0.5" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const inner = 46.5;
          const outer = i % 5 === 0 ? 49 : 48;
          return (
            <line
              key={i}
              x1={50 + Math.cos(a) * inner}
              y1={50 + Math.sin(a) * inner}
              x2={50 + Math.cos(a) * outer}
              y2={50 + Math.sin(a) * outer}
              stroke="rgb(34 211 238 / 0.55)"
              strokeWidth={i % 5 === 0 ? 1.2 : 0.6}
            />
          );
        })}
      </svg>
    </div>
  );
}

function DashRing({
  reverse,
  duration,
  dash,
  stroke,
  width,
  size,
}: {
  reverse?: boolean;
  duration: number;
  dash: string;
  stroke: string;
  width: number;
  size: string;
}) {
  return (
    <div
      className={`standby-hud__spin ${reverse ? 'standby-hud__spin--rev' : ''}`}
      style={{ width: size, height: size, animationDuration: `${duration}s` }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="standby-hud__spin-svg">
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke={stroke}
          strokeWidth={width}
          strokeDasharray={dash}
          strokeLinecap={width > 4 ? 'butt' : 'round'}
        />
      </svg>
    </div>
  );
}

function SubjectSilhouette() {
  return (
    <svg viewBox="0 0 120 150" className="standby-hud__silhouette" aria-hidden>
      <defs>
        <linearGradient id="standby-silhouette-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(148 152 168 / 0.55)" />
          <stop offset="100%" stopColor="rgb(98 102 118 / 0.65)" />
        </linearGradient>
      </defs>

      {/* Facebook-style filled silhouette */}
      <circle cx="60" cy="46" r="26" fill="url(#standby-silhouette-fill)" />
      <path
        d="M18 150 C18 108 36 88 60 88 C84 88 102 108 102 150 Z"
        fill="url(#standby-silhouette-fill)"
      />

      {/* Wireframe overlay */}
      <g fill="none" stroke="rgb(34 211 238 / 0.45)" strokeWidth="1.1" strokeLinecap="round">
        <ellipse cx="60" cy="46" rx="26" ry="27" />
        <path d="M18 150 C18 108 36 88 60 88 C84 88 102 108 102 150" />
        <path d="M44 38 Q60 28 76 38" opacity="0.6" />
        <line x1="60" y1="22" x2="60" y2="70" opacity="0.22" />
        <line x1="38" y1="46" x2="82" y2="46" opacity="0.22" />
        <path d="M48 58 Q60 64 72 58" opacity="0.35" />
      </g>

      {/* Shoulder anchor nodes */}
      <circle cx="36" cy="98" r="1.5" fill="rgb(34 211 238 / 0.5)" />
      <circle cx="84" cy="98" r="1.5" fill="rgb(34 211 238 / 0.5)" />
      <circle cx="60" cy="46" r="1.5" fill="rgb(196 181 253 / 0.6)" />
    </svg>
  );
}

export default function StandbyForensicHud() {
  const hexLeft = useHexStream(14, 140);
  const hexRight = useHexStream(14, 160);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="standby-hud hud-panel hud-panel-active h-full min-h-0 overflow-hidden relative"
    >
      <div className="standby-hud__vignette" aria-hidden />
      <div className="standby-hud__flare standby-hud__flare--left" aria-hidden />
      <div className="standby-hud__flare standby-hud__flare--right" aria-hidden />

      <svg className="standby-hud__circuit" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="standby-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M48 0 L48 48 M0 48 L48 48"
              fill="none"
              stroke="rgb(34 211 238 / 0.06)"
              strokeWidth="0.5"
            />
            <circle cx="48" cy="48" r="1.5" fill="rgb(124 58 237 / 0.2)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#standby-grid)" />
        {[
          [120, 80, 280, 80],
          [280, 80, 280, 200],
          [720, 520, 880, 520],
          [880, 520, 880, 360],
          [160, 480, 360, 480],
          [640, 120, 820, 120],
          [820, 120, 820, 240],
        ].map(([x1, y1, x2, y2], i) => (
          <g key={i}>
            <motion.line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgb(34 211 238 / 0.12)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.12, 0.4, 0.12] }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                delay: i * 0.35,
              }}
            />
            <circle cx={x2} cy={y2} r="2.5" fill="rgb(34 211 238 / 0.35)" />
          </g>
        ))}
      </svg>

      <div className="standby-hud__chrome">
        <div className="standby-hud__corner standby-hud__corner--tl">
          <CornerBars />
          <span className="standby-hud__hex">{hexLeft}</span>
        </div>
        <div className="standby-hud__corner standby-hud__corner--tr">
          <span className="font-mono-label standby-hud__tag">SUBJ.ID</span>
          <CornerBars flip />
        </div>
        <div className="standby-hud__corner standby-hud__corner--bl">
          <span className="standby-hud__hex">{hexRight}</span>
        </div>
        <div className="standby-hud__corner standby-hud__corner--br">
          <span className="font-mono-label standby-hud__tag">LINK · IDLE</span>
        </div>
      </div>

      <div className="standby-hud__stage">
        <div className="standby-hud__scanner" aria-hidden>
          <div className="standby-hud__core-glow" />

          <TickRing duration={26} />
          <DashRing
            size="88%"
            duration={17}
            reverse
            dash="28 18 8 18 42 18"
            stroke="rgb(196 181 253 / 0.85)"
            width={5}
          />
          <DashRing
            size="74%"
            duration={11}
            dash="6 14"
            stroke="rgb(34 211 238 / 0.55)"
            width={1.5}
          />
          <DashRing
            size="60%"
            duration={7}
            reverse
            dash="36 590"
            stroke="rgb(34 211 238 / 0.75)"
            width={2}
          />

          <div className="standby-hud__portrait">
            <div className="standby-hud__portrait-brackets" aria-hidden />
            <SubjectSilhouette />
            <div className="standby-hud__scan-line" />
          </div>
        </div>
      </div>

      <p className="font-mono-label standby-hud__live-tag">Live — class view</p>
    </motion.div>
  );
}
