import { motion } from 'framer-motion';
import type { LessonStage } from '../../types/investigation';
import { getSuspect } from '../../data/suspects';
import { interviewLiveUrl } from '../../lib/interviewSession';
import InterviewChatExperience from '../interview/InterviewChatExperience';
import InterviewPickerPanel from './InterviewPickerPanel';
import StartInterviewsButton from './StartInterviewsButton';
import TypewriterBlock from './TypewriterBlock';
import { TYPEWRITER_TITLE } from '../../hooks/useTypewriter';

interface InterviewStagePanelProps {
  stage: LessonStage;
  selectedIds: string[];
  onToggle: (suspectId: string) => void;
  interviewsStarted: boolean;
  onStartInterviews: () => void;
  rowOrder?: readonly string[];
}

function pickedNames(ids: string[]): string {
  return ids
    .map((id) => getSuspect(id)?.name ?? id)
    .join(' · ');
}

export default function InterviewStagePanel({
  stage,
  selectedIds,
  onToggle,
  interviewsStarted,
  onStartInterviews,
  rowOrder,
}: InterviewStagePanelProps) {
  const pairUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${interviewLiveUrl(selectedIds)}`
      : interviewLiveUrl(selectedIds);

  if (interviewsStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-full min-h-0 hud-panel hud-panel-active flex flex-col overflow-hidden"
      >
        <div className="px-6 lg:px-10 pt-6 lg:pt-8 pb-4 border-b border-[var(--violet-border)]/50 shrink-0">
          <p className="font-mono-label text-sm uppercase tracking-[0.3em] text-emerald-400/90 mb-2">
            Live — interviews in progress
          </p>
          <h1 className="text-3xl lg:text-5xl font-semibold text-glow-violet tracking-tight leading-tight">
            {pickedNames(selectedIds)}
          </h1>
          <p className="text-base lg:text-lg text-[var(--text-muted)] mt-3">
            Pair iPads:{' '}
            <a
              href={interviewLiveUrl(selectedIds)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 hover:underline break-all"
            >
              {pairUrl}
            </a>
          </p>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          <InterviewChatExperience
            allowedSuspectIds={selectedIds}
            requireSession={false}
            embedded
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-h-0 hud-panel hud-panel-active flex flex-col overflow-hidden"
    >
      <div className="px-10 lg:px-14 pt-10 lg:pt-12 pb-6 border-b border-[var(--violet-border)]/50 shrink-0">
        <p className="font-mono-label text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">
          Live — class view
        </p>
        <TypewriterBlock
          text={stage.title}
          active
          timing={TYPEWRITER_TITLE}
          className="text-4xl lg:text-6xl font-semibold text-glow-violet tracking-tight leading-tight"
          cursorBright
        />
        <p className="text-xl lg:text-2xl text-[var(--text-muted)] mt-4">
          Pick two suspects to interview
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom px-10 lg:px-14 py-8 lg:py-10">
        <InterviewPickerPanel
          selectedIds={selectedIds}
          onToggle={onToggle}
          variant="broadcast"
          rowOrder={rowOrder}
        />
        <StartInterviewsButton
          selectedCount={selectedIds.length}
          onStart={onStartInterviews}
          className="mt-8"
        />
      </div>
    </motion.div>
  );
}
