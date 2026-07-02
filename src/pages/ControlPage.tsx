import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LESSON_STAGES, evidenceForStage, releasedEvidence } from '../data/lessonContent';
import ControlSideNav, { type ControlView } from '../components/control/ControlSideNav';
import ArchiveBoard from '../components/control/ArchiveBoard';
import EvidenceHub from '../components/control/EvidenceHub';
import StagePanel from '../components/control/StagePanel';
import ReleaseCinematic from '../components/control/ReleaseCinematic';
import FullscreenToggle from '../components/control/FullscreenToggle';
import { toggleInterviewSelection } from '../components/control/InterviewPickerPanel';
import { useFullscreen } from '../hooks/useFullscreen';
import { FINAL_FIVE_IDS } from '../data/suspects';
import { shuffleSuspectIds } from '../data/csiMatch';
import {
  getInterviewSession,
  startInterviewSession,
} from '../lib/interviewSession';

export default function ControlPage() {
  const [releasedIndex, setReleasedIndex] = useState(0);
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<ControlView>('live');
  /** Pending stage index shown in cinematic before commit */
  const [pendingRelease, setPendingRelease] = useState<number | null>(null);
  const [interviewPickIds, setInterviewPickIds] = useState<string[]>(
    () => getInterviewSession()?.pickedIds ?? [],
  );
  const [interviewsStarted, setInterviewsStarted] = useState(
    () => getInterviewSession()?.started ?? false,
  );
  const [csiDisplayOrder, setCsiDisplayOrder] = useState<string[] | null>(null);
  const { ref: presentRef, active: isFullscreen, toggle: toggleFullscreen } = useFullscreen();

  const stage = LESSON_STAGES[releasedIndex] ?? LESSON_STAGES[0];
  const evidence = evidenceForStage(stage.id);
  const canRelease = releasedIndex < LESSON_STAGES.length - 1;
  const hubItems = releasedEvidence(releasedIndex);

  const pendingStage = pendingRelease !== null ? LESSON_STAGES[pendingRelease] : null;
  const pendingEvidence =
    pendingStage ? evidenceForStage(pendingStage.id) : undefined;

  const toggleArchive = useCallback((id: string) => {
    setArchivedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const toggleInterviewPick = useCallback((id: string) => {
    setInterviewPickIds((prev) => toggleInterviewSelection(prev, id));
  }, []);

  const startInterviews = useCallback(() => {
    if (interviewPickIds.length !== 2) return;
    startInterviewSession(interviewPickIds);
    setInterviewsStarted(true);
  }, [interviewPickIds]);

  const releaseNext = () => {
    if (!canRelease || pendingRelease !== null) return;
    const nextIndex = releasedIndex + 1;
    const nextStage = LESSON_STAGES[nextIndex];
    if (nextStage?.id === 'evidence_csi') {
      setCsiDisplayOrder(shuffleSuspectIds(FINAL_FIVE_IDS));
    }
    setPendingRelease(nextIndex);
    setActiveView('live');
  };

  const commitRelease = () => {
    if (pendingRelease === null) return;
    setReleasedIndex(pendingRelease);
    setPendingRelease(null);
  };

  return (
    <div
      ref={presentRef}
      className="control-shell h-[100dvh] w-screen flex flex-col md:flex-row overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      <ControlSideNav
        activeView={activeView}
        onViewChange={setActiveView}
        releasedIndex={releasedIndex}
        teacherCue={pendingStage?.teacherCue ?? stage.teacherCue}
        onReleaseNext={releaseNext}
        canRelease={canRelease && pendingRelease === null}
        archivedCount={archivedIds.length}
        evidenceCount={hubItems.length}
      />

      <div
        className="control-present flex-1 min-w-0 min-h-0 flex flex-col relative"
        style={{ background: 'var(--bg-deep)' }}
      >
        {activeView === 'live' && (
          <div className="control-present__toolbar">
            <FullscreenToggle active={isFullscreen} onToggle={toggleFullscreen} />
          </div>
        )}

        <main className="flex-1 min-w-0 min-h-0 overflow-y-auto p-2 sm:p-4 lg:p-6">
          {activeView === 'live' && (
            <AnimatePresence mode="wait">
              <StagePanel
                key={stage.id}
                stage={stage}
                evidence={evidence}
                interviewPickIds={interviewPickIds}
                onToggleInterviewPick={toggleInterviewPick}
                interviewsStarted={interviewsStarted}
                onStartInterviews={startInterviews}
                csiDisplayOrder={csiDisplayOrder ?? undefined}
              />
            </AnimatePresence>
          )}
          {activeView === 'evidence' && <EvidenceHub items={hubItems} />}
          {activeView === 'archive' && (
            <ArchiveBoard archivedIds={archivedIds} onToggle={toggleArchive} />
          )}
        </main>

        <AnimatePresence>
          {pendingStage && pendingRelease !== null && (
            <ReleaseCinematic
              key={pendingRelease}
              stage={pendingStage}
              evidence={pendingEvidence}
              interviewPickIds={interviewPickIds}
              onToggleInterviewPick={toggleInterviewPick}
              onStartInterviews={startInterviews}
              csiDisplayOrder={csiDisplayOrder ?? undefined}
              onComplete={commitRelease}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
