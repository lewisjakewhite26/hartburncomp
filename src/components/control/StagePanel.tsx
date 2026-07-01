import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { EvidenceItem, LessonStage } from '../../types/investigation';
import DebriefReveal from './DebriefReveal';
import InterviewStagePanel from './InterviewStagePanel';
import StandbyForensicHud from './StandbyForensicHud';
import { FingerprintEvidenceBody, isFingerprintEvidence } from './FingerprintEvidenceBody';
import CsiMatchEvidenceBody, { isCsiMatchEvidence } from './CsiMatchEvidenceBody';
import EvidenceTextReveal from './EvidenceTextReveal';
import TypewriterBlock from './TypewriterBlock';
import { TYPEWRITER_TITLE, TYPEWRITER_SUBTITLE } from '../../hooks/useTypewriter';

interface StagePanelProps {
  stage: LessonStage;
  evidence?: EvidenceItem;
  interviewPickIds?: string[];
  onToggleInterviewPick?: (suspectId: string) => void;
  interviewsStarted?: boolean;
  onStartInterviews?: () => void;
  csiDisplayOrder?: readonly string[];
}

type HeaderPhase = 'title' | 'subtitle' | 'done';

export default function StagePanel({
  stage,
  evidence,
  interviewPickIds = [],
  onToggleInterviewPick = () => {},
  interviewsStarted = false,
  onStartInterviews = () => {},
  csiDisplayOrder,
}: StagePanelProps) {
  const [headerPhase, setHeaderPhase] = useState<HeaderPhase>('title');
  const panelKey = `${stage.id}-${evidence?.id ?? 'stage'}`;

  useEffect(() => {
    setHeaderPhase('title');
  }, [panelKey]);

  if (stage.id === 'pending') {
    return <StandbyForensicHud />;
  }

  if (stage.id === 'debrief') {
    return <DebriefReveal />;
  }

  if (stage.id === 'interviews') {
    return (
      <InterviewStagePanel
        stage={stage}
        selectedIds={interviewPickIds}
        onToggle={onToggleInterviewPick}
        interviewsStarted={interviewsStarted}
        onStartInterviews={onStartInterviews}
        rowOrder={csiDisplayOrder}
      />
    );
  }

  const title = evidence?.title ?? stage.title;
  const summary = evidence?.summary ?? '';
  const bodyContent = evidence?.content ?? stage.displayBody;
  const hasSummary = Boolean(summary.trim());

  const titleDone = () => setHeaderPhase(hasSummary ? 'subtitle' : 'done');
  const subtitleDone = () => setHeaderPhase('done');

  return (
    <motion.div
      key={panelKey}
      initial={{ opacity: 0, scale: 0.97, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-h-0 hud-panel hud-panel-active flex flex-col overflow-hidden"
    >
      <div className="px-10 lg:px-14 pt-10 lg:pt-12 pb-6 border-b border-[var(--violet-border)]/50 shrink-0">
        <p className="font-mono-label text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">
          Live — class view
        </p>

        {headerPhase === 'title' ? (
          <TypewriterBlock
            text={title}
            active
            timing={TYPEWRITER_TITLE}
            className="text-4xl lg:text-6xl font-semibold text-glow-violet tracking-tight leading-tight"
            cursorBright
            onDone={titleDone}
          />
        ) : (
          <h1 className="text-4xl lg:text-6xl font-semibold text-glow-violet tracking-tight leading-tight">
            {title}
          </h1>
        )}

        {hasSummary && headerPhase === 'subtitle' && (
          <div className="mt-4 text-xl lg:text-2xl text-[var(--text-muted)] min-h-[1.4em]">
            <TypewriterBlock
              text={summary}
              active
              timing={TYPEWRITER_SUBTITLE}
              onDone={subtitleDone}
            />
          </div>
        )}

        {hasSummary && headerPhase === 'done' && (
          <p className="text-xl lg:text-2xl text-[var(--text-muted)] mt-4">{summary}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom px-10 lg:px-14 py-8 lg:py-10">
        {headerPhase === 'done' &&
          (evidence && isFingerprintEvidence(evidence.id) ? (
            <FingerprintEvidenceBody content={evidence.content} size="broadcast" />
          ) : evidence && isCsiMatchEvidence(evidence.id) ? (
            <CsiMatchEvidenceBody
              content={evidence.content}
              size="broadcast"
              rowOrder={csiDisplayOrder}
            />
          ) : (
            <EvidenceTextReveal content={bodyContent} size="broadcast" revealKey={panelKey} />
          ))}
      </div>
    </motion.div>
  );
}
