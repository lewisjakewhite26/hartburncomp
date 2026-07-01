import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CSI_BAR_FILL_SECONDS,
  CSI_MATCH_INTRO,
  csiMatchRowsInOrder,
  scoreBarColor,
  scoreBarGradient,
  shuffleSuspectIds,
} from '../../data/csiMatch';
import { FINAL_FIVE_IDS } from '../../data/suspects';
import TypewriterBlock from './TypewriterBlock';
import { TYPEWRITER_BODY } from '../../hooks/useTypewriter';

export function isCsiMatchEvidence(evidenceId?: string) {
  return evidenceId === 'csi_ai_stack';
}

interface CsiMatchEvidenceBodyProps {
  content?: string;
  size: 'large' | 'broadcast' | 'cinematic';
  /** When true, bars animate one at a time after intro. */
  animateBars?: boolean;
  /** Suspect display order — shuffled so standouts are not always first. */
  rowOrder?: readonly string[];
  /** Skip straight to full bars (tap-to-skip in cinematic). */
  instantComplete?: boolean;
}

function barTrackClass(size: CsiMatchEvidenceBodyProps['size']) {
  if (size === 'cinematic') return 'h-5 md:h-6';
  if (size === 'broadcast') return 'h-4 lg:h-5';
  return 'h-3.5';
}

function nameClass(size: CsiMatchEvidenceBodyProps['size']) {
  if (size === 'cinematic') return 'text-xl md:text-2xl';
  if (size === 'broadcast') return 'text-lg lg:text-xl';
  return 'text-base lg:text-lg';
}

export default function CsiMatchEvidenceBody({
  content = CSI_MATCH_INTRO,
  size,
  animateBars = true,
  rowOrder,
  instantComplete = false,
}: CsiMatchEvidenceBodyProps) {
  const [introDone, setIntroDone] = useState(size !== 'broadcast');
  const [barsStarted, setBarsStarted] = useState(
    !animateBars || size === 'large' || size === 'cinematic',
  );
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(null);
  const [completedThrough, setCompletedThrough] = useState(-1);

  const resolvedOrder = useMemo(
    () => rowOrder ?? shuffleSuspectIds(FINAL_FIVE_IDS),
    [rowOrder],
  );
  const rows = useMemo(() => csiMatchRowsInOrder(resolvedOrder), [resolvedOrder]);

  useEffect(() => {
    setIntroDone(size !== 'broadcast');
    setBarsStarted(!animateBars || size === 'large' || size === 'cinematic');
    setActiveBarIndex(null);
    setCompletedThrough(-1);
  }, [content, size, animateBars, resolvedOrder.join(',')]);

  useEffect(() => {
    if (instantComplete) {
      setCompletedThrough(rows.length - 1);
      setActiveBarIndex(null);
      setBarsStarted(true);
      setIntroDone(true);
    }
  }, [instantComplete, rows.length]);

  useEffect(() => {
    if (!barsStarted || !animateBars || instantComplete) return;
    if (size === 'large') {
      setCompletedThrough(rows.length - 1);
      return;
    }
    setActiveBarIndex(0);
    setCompletedThrough(-1);
  }, [barsStarted, animateBars, instantComplete, size, rows.length]);

  const introClass =
    size === 'cinematic'
      ? 'text-xl md:text-2xl leading-relaxed text-zinc-200 whitespace-pre-wrap mb-8'
      : size === 'broadcast'
        ? 'text-xl lg:text-2xl leading-relaxed text-[var(--text-body)] whitespace-pre-wrap mb-8'
        : 'text-lg leading-relaxed text-[var(--text-body)] whitespace-pre-wrap mb-6';

  const startBars = () => {
    setIntroDone(true);
    setBarsStarted(true);
  };

  const handleBarComplete = (index: number) => {
    setCompletedThrough(index);
    if (index < rows.length - 1) {
      setActiveBarIndex(index + 1);
    } else {
      setActiveBarIndex(null);
    }
  };

  const barWidth = (index: number, score: number) => {
    if (instantComplete || size === 'large' || !animateBars) {
      return `${score}%`;
    }
    if (index <= completedThrough) {
      return `${score}%`;
    }
    if (index === activeBarIndex) {
      return `${score}%`;
    }
    return '0%';
  };

  const showScore = (index: number, score: number) => {
    if (instantComplete || size === 'large' || !animateBars) return `${score}%`;
    if (index <= completedThrough) return `${score}%`;
    if (index === activeBarIndex) return `${score}%`;
    return '—';
  };

  const shouldAnimateBar = (index: number) =>
    animateBars &&
    !instantComplete &&
    size !== 'large' &&
    index === activeBarIndex;

  return (
    <div className="csi-match-evidence w-full max-w-4xl">
      {size === 'broadcast' && !introDone ? (
        <TypewriterBlock
          text={content}
          active
          timing={TYPEWRITER_BODY}
          className={introClass}
          cursorBright
          onDone={startBars}
        />
      ) : (
        <p className={introClass}>{content}</p>
      )}

      {(introDone || size !== 'broadcast') && (
        <div className="csi-match-evidence__panel rounded-xl border border-[var(--violet-border)] bg-[rgb(8_8_16/0.6)] p-5 lg:p-7">
          <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-[var(--violet-border)]/40">
            <p className="font-mono-label text-xs uppercase tracking-[0.25em] text-[var(--magenta-accent)]">
              Ultra AI · evidence stack
            </p>
            <div className="flex items-center gap-2 font-mono-label text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              <span className="csi-match-evidence__swatch csi-match-evidence__swatch--low" />
              Low
              <span className="csi-match-evidence__swatch csi-match-evidence__swatch--mid" />
              Med
              <span className="csi-match-evidence__swatch csi-match-evidence__swatch--high" />
              High
            </div>
          </div>

          <ul className="space-y-5 lg:space-y-6">
            {rows.map((row, index) => (
              <li key={row.suspectId}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <div>
                    <span className={`font-semibold text-[var(--text-body)] ${nameClass(size)}`}>
                      {row.name}
                    </span>
                    <span className="ml-2 text-sm text-[var(--text-muted)]">{row.role}</span>
                  </div>
                  <span
                    className="font-mono-label text-sm tabular-nums"
                    style={{
                      color:
                        showScore(index, row.score) === '—'
                          ? 'var(--text-muted)'
                          : scoreBarColor(row.score),
                    }}
                  >
                    {showScore(index, row.score)}
                  </span>
                </div>
                <div
                  className={`csi-match-evidence__track w-full rounded-full overflow-hidden bg-[rgb(0_0_0/0.45)] ${barTrackClass(size)}`}
                  role="meter"
                  aria-label={`${row.name} evidence match`}
                  aria-valuenow={row.score}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <motion.div
                    className="csi-match-evidence__fill h-full rounded-full"
                    initial={false}
                    animate={{ width: barWidth(index, row.score) }}
                    transition={
                      shouldAnimateBar(index)
                        ? {
                            duration: CSI_BAR_FILL_SECONDS,
                            ease: [0.22, 1, 0.36, 1],
                          }
                        : { duration: 0 }
                    }
                    onAnimationComplete={() => {
                      if (shouldAnimateBar(index)) {
                        handleBarComplete(index);
                      }
                    }}
                    style={{ background: scoreBarGradient(row.score) }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
