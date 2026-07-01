import { motion } from 'framer-motion';
import { SUSPECTS } from '../../data/suspects';

interface ArchiveBoardProps {
  archivedIds: string[];
  onToggle: (id: string) => void;
}

export default function ArchiveBoard({ archivedIds, onToggle }: ArchiveBoardProps) {
  return (
    <div className="h-full min-h-0 hud-panel flex flex-col overflow-hidden">
      <div className="px-8 pt-8 pb-4 border-b border-[var(--violet-border)]/50 shrink-0 flex justify-between items-end">
        <div>
          <p className="font-mono-label text-sm uppercase tracking-[0.25em] text-[var(--text-muted)] mb-2">
            Suspect archive
          </p>
          <h2 className="text-3xl font-semibold text-glow-violet">Tap to archive after discussion</h2>
        </div>
        <p className="font-mono-label text-lg text-[var(--magenta-accent)]">
          {archivedIds.length} / {SUSPECTS.length}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {SUSPECTS.map((s, i) => {
            const archived = archivedIds.includes(s.id);
            return (
              <motion.button
                key={s.id}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                onClick={() => onToggle(s.id)}
                className={`relative rounded-xl px-4 py-5 text-left transition-all duration-300 border min-h-[100px] ${
                  archived
                    ? 'border-[var(--violet-border)]/30 bg-[var(--bg-deep)]/80 opacity-45'
                    : 'border-[var(--violet-border)] bg-[var(--bg-panel)]/60 hover:border-[rgb(232_121_249/0.45)] hover:shadow-[0_0_24px_rgb(124_58_237/0.15)]'
                }`}
              >
                <span
                  className={`block text-lg lg:text-xl font-semibold leading-tight ${
                    archived ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-body)]'
                  }`}
                >
                  {s.name}
                </span>
                <span className="block text-sm text-[var(--text-muted)] mt-2">{s.role}</span>
                {s.finalFive && !archived && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[var(--violet-glow)] shadow-[0_0_8px_rgb(124_58_237/0.5)]" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
