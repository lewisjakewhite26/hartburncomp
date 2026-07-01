import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EvidenceItem, LessonStage } from '../../types/investigation';
import FingerprintScanReveal, { isFingerprintEvidence } from './FingerprintScanReveal';
import CsiMatchEvidenceBody, { isCsiMatchEvidence } from './CsiMatchEvidenceBody';
import InterviewPickerPanel from './InterviewPickerPanel';
import {
  TypewriterCursor,
  useTypewriter,
  TYPEWRITER_TITLE,
  TYPEWRITER_SUBTITLE,
  TYPEWRITER_BODY,
} from './TypewriterBlock';
import { REVEAL_PAUSE } from '../../hooks/useTypewriter';

type Phase =
  | 'dimming'
  | 'envelope'
  | 'typing-title'
  | 'typing-subtitle'
  | 'fingerprint-scan'
  | 'csi-bars'
  | 'interview-pick'
  | 'typing-body'
  | 'complete';

interface ReleaseCinematicProps {
  stage: LessonStage;
  evidence?: EvidenceItem;
  interviewPickIds?: string[];
  onToggleInterviewPick?: (suspectId: string) => void;
  csiDisplayOrder?: readonly string[];
  onComplete: () => void;
}

function EnvelopeIcon({ isTwist }: { isTwist?: boolean }) {
  const accent = isTwist ? 'var(--twist-alert)' : 'var(--magenta-accent)';
  return (
    <div className="release-cinematic__envelope-wrap">
      <div
        className="release-cinematic__envelope-glow"
        style={{
          background: isTwist
            ? 'radial-gradient(circle, rgb(245 158 11 / 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgb(232 121 249 / 0.28) 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <svg viewBox="0 0 120 88" className="relative w-32 h-24 md:w-44 md:h-32" aria-hidden>
        <rect
          x="4"
          y="20"
          width="112"
          height="64"
          rx="4"
          fill="rgb(18 16 28)"
          stroke={accent}
          strokeWidth="2"
        />
        <path
          d="M4 24 L60 52 L116 24"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4 84 L44 48 M116 84 L76 48"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

export default function ReleaseCinematic({
  stage,
  evidence,
  interviewPickIds = [],
  onToggleInterviewPick = () => {},
  csiDisplayOrder,
  onComplete,
}: ReleaseCinematicProps) {
  const isTwist = stage.isTwist;
  const title = evidence?.title ?? stage.title;
  const subtitle = evidence?.summary ?? '';
  const body = evidence?.content ?? stage.displayBody;
  const hasSubtitle = Boolean(subtitle.trim());

  const isFingerprint = isFingerprintEvidence(evidence?.id);
  const isCsiMatch = isCsiMatchEvidence(evidence?.id);
  const isInterviews = stage.id === 'interviews';

  const [phase, setPhase] = useState<Phase>('dimming');
  const [csiInstant, setCsiInstant] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const titleWriter = useTypewriter(title, phase === 'typing-title', TYPEWRITER_TITLE);
  const subtitleWriter = useTypewriter(subtitle, phase === 'typing-subtitle', TYPEWRITER_SUBTITLE);
  const bodyWriter = useTypewriter(body, phase === 'typing-body', TYPEWRITER_BODY);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [titleWriter.output, subtitleWriter.output, bodyWriter.output, phase]);

  useEffect(() => {
    if (phase !== 'dimming') return;
    const t = window.setTimeout(() => setPhase('envelope'), REVEAL_PAUSE.dimToEnvelope);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    setCsiInstant(false);
  }, [stage.id, evidence?.id]);

  const afterTitle = () => {
    if (hasSubtitle) return 'typing-subtitle' as Phase;
    if (isFingerprint) return 'fingerprint-scan';
    if (isCsiMatch) return 'csi-bars';
    if (isInterviews) return 'interview-pick';
    return 'typing-body';
  };

  const afterSubtitle = () => {
    if (isFingerprint) return 'fingerprint-scan';
    if (isCsiMatch) return 'csi-bars';
    if (isInterviews) return 'interview-pick';
    return 'typing-body';
  };

  useEffect(() => {
    if (phase === 'typing-title' && titleWriter.done) {
      const t = window.setTimeout(() => setPhase(afterTitle()), REVEAL_PAUSE.afterTitle);
      return () => clearTimeout(t);
    }
  }, [phase, titleWriter.done, hasSubtitle, isFingerprint, isCsiMatch, isInterviews]);

  useEffect(() => {
    if (phase === 'typing-subtitle' && subtitleWriter.done) {
      const t = window.setTimeout(() => setPhase(afterSubtitle()), REVEAL_PAUSE.afterSubtitle);
      return () => clearTimeout(t);
    }
  }, [phase, subtitleWriter.done, isFingerprint, isCsiMatch, isInterviews]);

  useEffect(() => {
    if (phase === 'typing-body' && bodyWriter.done) {
      const t = window.setTimeout(() => setPhase('complete'), REVEAL_PAUSE.afterBody);
      return () => clearTimeout(t);
    }
  }, [phase, bodyWriter.done]);

  const openEnvelope = () => setPhase('typing-title');

  const skipTyping = () => {
    if (phase === 'fingerprint-scan') {
      setPhase('typing-body');
      return;
    }
    if (phase === 'csi-bars') {
      setCsiInstant(true);
      return;
    }
    if (phase === 'interview-pick') {
      onComplete();
      return;
    }
    if (phase === 'typing-title') {
      titleWriter.skip();
      setPhase(afterTitle());
      return;
    }
    if (phase === 'typing-subtitle') {
      subtitleWriter.skip();
      setPhase(afterSubtitle());
      return;
    }
    if (phase === 'typing-body') {
      bodyWriter.skip();
      setPhase('complete');
    }
  };

  const accent = isTwist ? 'var(--twist-alert)' : 'var(--magenta-accent)';

  const showSubtitleStatic =
    hasSubtitle &&
    phase !== 'typing-title' &&
    phase !== 'typing-subtitle';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
      onClick={() => {
        if (
          phase === 'typing-title' ||
          phase === 'typing-subtitle' ||
          phase === 'typing-body' ||
          phase === 'fingerprint-scan' ||
          phase === 'interview-pick'
        ) {
          skipTyping();
        }
        if (phase === 'csi-bars') {
          setCsiInstant(true);
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-[var(--bg-deep)]"
      />
      <div
        className="absolute inset-0 pointer-events-none release-cinematic__ambient"
        style={{
          background: isTwist
            ? 'radial-gradient(circle at 50% 40%, rgb(245 158 11 / 0.12) 0%, transparent 55%)'
            : 'radial-gradient(circle at 50% 40%, rgb(124 58 237 / 0.15) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === 'envelope' && (
            <motion.button
              key="env"
              type="button"
              initial={{ opacity: 0, scale: 0.55, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.08, y: -24 }}
              transition={{ type: 'spring', stiffness: 140, damping: 22, duration: 1.2 }}
              onClick={openEnvelope}
              className="flex flex-col items-center gap-6 cursor-pointer group focus:outline-none"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <EnvelopeIcon isTwist={isTwist} />
              </motion.div>
              <div className="text-center">
                <p
                  className="font-mono-label text-sm md:text-base uppercase tracking-[0.45em] mb-3"
                  style={{ color: accent }}
                >
                  {isTwist ? '⚠ Priority intercept' : 'Incoming transmission'}
                </p>
                <p className="text-lg md:text-xl text-[var(--text-muted)] group-hover:text-[var(--text-body)] transition-colors">
                  Tap to open
                </p>
              </div>
            </motion.button>
          )}

          {(phase === 'typing-title' ||
            phase === 'typing-subtitle' ||
            phase === 'fingerprint-scan' ||
            phase === 'csi-bars' ||
            phase === 'interview-pick' ||
            phase === 'typing-body' ||
            phase === 'complete') && (
            <motion.div
              key="text"
              ref={scrollRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full text-center md:text-left max-h-[85vh] overflow-y-auto scrollbar-custom px-4 md:px-8 scroll-smooth"
              style={{ textShadow: '0 2px 12px rgb(0 0 0 / 0.9)' }}
            >
              <p
                className="font-mono-label text-sm uppercase tracking-[0.35em] mb-6"
                style={{ color: accent }}
              >
                {isTwist ? 'New evidence' : 'Live release'}
              </p>

              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 min-h-[1.2em] ${
                  isTwist ? '' : 'text-glow-violet'
                }`}
                style={{
                  color: isTwist ? 'var(--twist-alert)' : undefined,
                  textShadow: isTwist ? '0 0 40px rgb(245 158 11 / 0.35)' : undefined,
                }}
              >
                {phase === 'typing-title' ? titleWriter.output : title}
                {phase === 'typing-title' && !titleWriter.done && <TypewriterCursor bright />}
              </h1>

              {hasSubtitle && phase === 'typing-subtitle' && (
                <p className="text-xl md:text-2xl text-zinc-300 mb-8 min-h-[1.4em]">
                  {subtitleWriter.output}
                  {!subtitleWriter.done && <TypewriterCursor />}
                </p>
              )}

              {showSubtitleStatic && (
                <p className="text-xl md:text-2xl text-zinc-300 mb-8">{subtitle}</p>
              )}

              {phase === 'fingerprint-scan' && (
                <div className="mb-8 flex justify-center md:justify-start">
                  <FingerprintScanReveal
                    variant="cinematic"
                    active
                    onComplete={() => setPhase('typing-body')}
                  />
                </div>
              )}

              {phase === 'csi-bars' && (
                <div className="mb-8 text-left" onClick={(e) => e.stopPropagation()}>
                  <CsiMatchEvidenceBody
                    content={body}
                    size="cinematic"
                    animateBars
                    rowOrder={csiDisplayOrder}
                    instantComplete={csiInstant}
                  />
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onComplete();
                    }}
                    className="mt-10 font-mono-label text-sm uppercase tracking-widest px-10 py-4 rounded-lg border transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: accent,
                      color: accent,
                      background: 'rgb(124 58 237 / 0.12)',
                    }}
                  >
                    Continue
                  </motion.button>
                </div>
              )}

              {phase === 'interview-pick' && (
                <div className="mb-8 text-left" onClick={(e) => e.stopPropagation()}>
                  <InterviewPickerPanel
                    selectedIds={interviewPickIds}
                    onToggle={onToggleInterviewPick}
                    variant="cinematic"
                    rowOrder={csiDisplayOrder}
                  />
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onComplete();
                    }}
                    className="mt-10 font-mono-label text-sm uppercase tracking-widest px-10 py-4 rounded-lg border transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: accent,
                      color: accent,
                      background: 'rgb(124 58 237 / 0.12)',
                    }}
                  >
                    Continue
                  </motion.button>
                </div>
              )}

              {(phase === 'typing-body' || phase === 'complete') && body && !isCsiMatch && !isInterviews && (
                <div className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-zinc-100 font-light">
                  <div className="whitespace-pre-wrap">
                    {phase === 'typing-body' ? bodyWriter.output : body}
                    {phase === 'typing-body' && !bodyWriter.done && <TypewriterCursor bright />}
                  </div>
                </div>
              )}

              {phase === 'complete' && !isInterviews && !isCsiMatch && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: REVEAL_PAUSE.continueButton / 1000, duration: 0.8 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onComplete();
                  }}
                  className="mt-12 font-mono-label text-sm uppercase tracking-widest px-10 py-4 rounded-lg border transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: accent,
                    color: accent,
                    background: isTwist ? 'rgb(245 158 11 / 0.08)' : 'rgb(124 58 237 / 0.12)',
                  }}
                >
                  Continue
                </motion.button>
              )}

              {(phase === 'typing-title' ||
                phase === 'typing-subtitle' ||
                phase === 'typing-body' ||
                phase === 'fingerprint-scan' ||
                phase === 'interview-pick') && (
                <p className="mt-10 font-mono-label text-xs text-zinc-500 uppercase tracking-widest">
                  Tap to skip
                </p>
              )}
              {phase === 'csi-bars' && (
                <p className="mt-10 font-mono-label text-xs text-zinc-500 uppercase tracking-widest">
                  Tap to complete all bars
                </p>
              )}
              <div ref={bottomRef} className="h-px shrink-0" aria-hidden />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
