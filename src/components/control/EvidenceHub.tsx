import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EvidenceItem } from '../../types/investigation';
import { FingerprintEvidenceBody, isFingerprintEvidence } from './FingerprintEvidenceBody';
import CsiMatchEvidenceBody, { isCsiMatchEvidence } from './CsiMatchEvidenceBody';
import EvidenceTextReveal from './EvidenceTextReveal';
import TypewriterBlock from './TypewriterBlock';
import { TYPEWRITER_TITLE, TYPEWRITER_SUBTITLE } from '../../hooks/useTypewriter';

interface EvidenceHubProps {
  items: EvidenceItem[];
}

type HeaderPhase = 'title' | 'subtitle' | 'done';

export default function EvidenceHub({ items }: EvidenceHubProps) {
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const [headerPhase, setHeaderPhase] = useState<HeaderPhase>('title');
  const selected = items.find((e) => e.id === selectedId) ?? items[0];

  useEffect(() => {
    if (items.length && !items.some((e) => e.id === selectedId)) {
      setSelectedId(items[0]?.id ?? null);
    }
  }, [items, selectedId]);

  useEffect(() => {
    setHeaderPhase('title');
  }, [selectedId]);

  if (items.length === 0) {
    return (
      <div className="h-full flex items-center justify-center hud-panel">
        <p className="text-xl text-[var(--text-muted)]">No evidence released yet.</p>
      </div>
    );
  }

  const hasSummary = Boolean(selected?.summary.trim());

  return (
    <div className="evidence-hub h-full min-h-0 flex flex-col md:flex-row gap-3 md:gap-4">
      <div className="w-full md:w-72 max-h-44 md:max-h-none shrink-0 hud-panel flex flex-col overflow-hidden">
        <div className="p-4 border-b border-[var(--violet-border)]/50 shrink-0">
          <h2 className="font-mono-label text-xs uppercase tracking-widest text-glow-violet">Released files</h2>
        </div>
        <ul className="flex-1 overflow-y-auto scrollbar-custom p-2 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left rounded-lg px-3 py-3 border transition-all ${
                  selected?.id === item.id
                    ? 'border-[rgb(232_121_249/0.5)] bg-[rgb(124_58_237/0.12)]'
                    : 'border-transparent hover:bg-[var(--bg-panel)]/50'
                }`}
              >
                <span className="text-sm font-medium text-[var(--text-body)] block leading-snug">
                  {item.title}
                </span>
                <span className="text-xs text-[var(--text-muted)] mt-1 block">{item.summary}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 min-w-0 hud-panel hud-panel-active flex flex-col overflow-hidden"
          >
            <div className="px-4 sm:px-8 lg:px-10 pt-6 sm:pt-10 pb-4 sm:pb-5 border-b border-[var(--violet-border)]/50 shrink-0">
              <p className="font-mono-label text-sm uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
                Evidence file
              </p>

              {headerPhase === 'title' ? (
                <TypewriterBlock
                  text={selected.title}
                  active
                  timing={TYPEWRITER_TITLE}
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-glow-violet leading-tight"
                  cursorBright
                  onDone={() => setHeaderPhase(hasSummary ? 'subtitle' : 'done')}
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-glow-violet leading-tight">
                  {selected.title}
                </h1>
              )}

              {hasSummary && headerPhase === 'subtitle' && (
                <div className="text-base sm:text-xl text-[var(--text-muted)] mt-2 sm:mt-3 min-h-[1.3em]">
                  <TypewriterBlock
                    text={selected.summary}
                    active
                    timing={TYPEWRITER_SUBTITLE}
                    onDone={() => setHeaderPhase('done')}
                  />
                </div>
              )}

              {hasSummary && headerPhase === 'done' && (
                <p className="text-base sm:text-xl text-[var(--text-muted)] mt-2 sm:mt-3">{selected.summary}</p>
              )}
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-custom px-4 sm:px-8 lg:px-10 py-5 sm:py-8">
              {headerPhase === 'done' &&
                (isFingerprintEvidence(selected.id) ? (
                  <FingerprintEvidenceBody content={selected.content} size="large" />
                ) : isCsiMatchEvidence(selected.id) ? (
                  <CsiMatchEvidenceBody content={selected.content} size="large" animateBars={false} />
                ) : (
                  <EvidenceTextReveal
                    content={selected.content}
                    size="large"
                    revealKey={selected.id}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
