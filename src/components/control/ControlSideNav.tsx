import { useState } from 'react';
import { motion } from 'framer-motion';
import { LESSON_STAGES } from '../../data/lessonContent';
import PrintablesMenu, { SettingsGearButton } from './PrintablesMenu';

export type ControlView = 'live' | 'evidence' | 'archive';

interface ControlSideNavProps {
  activeView: ControlView;
  onViewChange: (view: ControlView) => void;
  releasedIndex: number;
  teacherCue: string;
  onReleaseNext: () => void;
  canRelease: boolean;
  archivedCount: number;
  evidenceCount: number;
}

const NAV: { id: ControlView; label: string; hint: string }[] = [
  { id: 'live', label: 'Live release', hint: 'On screen now' },
  { id: 'evidence', label: 'Evidence hub', hint: 'Released documents' },
  { id: 'archive', label: 'Suspect archive', hint: 'Strike off after discussion' },
];

export default function ControlSideNav({
  activeView,
  onViewChange,
  releasedIndex,
  teacherCue,
  onReleaseNext,
  canRelease,
  archivedCount,
  evidenceCount,
}: ControlSideNavProps) {
  const [printablesOpen, setPrintablesOpen] = useState(false);
  const nextStage = LESSON_STAGES[releasedIndex + 1];

  return (
    <>
    <aside
      className="control-sidenav w-full md:w-56 lg:w-64 shrink-0 flex flex-col md:h-full border-b md:border-b-0 border-r-0 md:border-r border-[var(--violet-border)]/80"
      style={{ background: 'rgb(12 10 20 / 0.95)' }}
    >
      <div className="control-sidenav__header p-3 sm:p-5 border-b border-[var(--violet-border)]/50">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono-label text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)]">
              Mission control
            </p>
            <h1 className="text-lg font-semibold text-glow-magenta leading-tight mt-1">Poisoned coffee</h1>
          </div>
          <SettingsGearButton onClick={() => setPrintablesOpen(true)} />
        </div>
      </div>

      <nav className="control-sidenav__nav flex md:flex-1 p-2 md:p-3 flex-row md:flex-col gap-1 min-h-0 overflow-x-auto md:overflow-x-visible md:overflow-y-auto scrollbar-custom">
        {NAV.map((item) => {
          const active = activeView === item.id;
          const badge =
            item.id === 'archive'
              ? archivedCount
              : item.id === 'evidence'
                ? evidenceCount
                : null;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id)}
              className={`control-sidenav__nav-btn shrink-0 md:shrink md:w-full text-left rounded-lg px-3 py-2.5 md:py-3 transition-all border ${
                active
                  ? 'border-[rgb(232_121_249/0.5)] bg-[rgb(124_58_237/0.15)] shadow-[0_0_20px_rgb(124_58_237/0.12)]'
                  : 'border-transparent hover:border-[var(--violet-border)] hover:bg-[var(--bg-panel)]/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-sm font-medium ${active ? 'text-[var(--magenta-accent)]' : 'text-[var(--text-body)]'}`}
                >
                  {item.label}
                </span>
                {badge !== null && badge > 0 && (
                  <span className="font-mono-label text-[10px] px-1.5 py-0.5 rounded bg-[var(--violet-border)]/60 text-[var(--text-muted)]">
                    {badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[var(--text-muted)] mt-0.5 hidden md:block leading-snug">
                {item.hint}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="control-sidenav__footer p-3 md:p-4 border-t border-[var(--violet-border)]/50 space-y-2 md:space-y-3 shrink-0">
        <div className="flex items-center justify-between gap-2 md:block">
          <span className="font-mono-label text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            Stage {releasedIndex + 1} of {LESSON_STAGES.length}
          </span>
          <motion.button
            type="button"
            disabled={!canRelease}
            onClick={onReleaseNext}
            whileHover={canRelease ? { scale: 1.02 } : undefined}
            whileTap={canRelease ? { scale: 0.98 } : undefined}
            className="md:hidden shrink-0 btn-release font-mono-label text-[10px] uppercase tracking-wider py-2 px-3.5 rounded-lg disabled:opacity-35 disabled:cursor-not-allowed"
          >
            {canRelease ? 'Release ▶' : 'Done'}
          </motion.button>
        </div>

        {canRelease && nextStage ? (
          <div className="hidden sm:block rounded-lg border border-[var(--violet-border)]/40 px-3 py-2.5 bg-[var(--bg-deep)]/60">
            <p className="font-mono-label text-[9px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
              Up next
            </p>
            <p className="text-sm font-medium text-[var(--text-body)] leading-snug">{nextStage.title}</p>
          </div>
        ) : null}

        <motion.button
          type="button"
          disabled={!canRelease}
          onClick={onReleaseNext}
          whileHover={canRelease ? { scale: 1.02 } : undefined}
          whileTap={canRelease ? { scale: 0.98 } : undefined}
          className="hidden md:block w-full btn-release font-mono-label text-xs uppercase tracking-wider py-3 rounded-lg disabled:opacity-35 disabled:cursor-not-allowed"
        >
          {canRelease ? 'Release ▶' : 'All stages released'}
        </motion.button>

        {teacherCue.trim() ? (
          <div className="hidden lg:block rounded-lg border border-[var(--violet-border)]/40 px-3 py-2 bg-[var(--bg-deep)]/60">
            <p className="font-mono-label text-[9px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
              Teacher cue
            </p>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug line-clamp-4">{teacherCue}</p>
          </div>
        ) : null}
      </div>
    </aside>
    <PrintablesMenu open={printablesOpen} onClose={() => setPrintablesOpen(false)} />
    </>
  );
}
