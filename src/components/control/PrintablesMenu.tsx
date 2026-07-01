import { motion, AnimatePresence } from 'framer-motion';
import { PRINTABLES, FULL_PRINT_PACK_PATH, openPrintable } from '../../data/printables';

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PrintablesMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsGearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-lg border border-[var(--violet-border)]/60 text-[var(--text-muted)] hover:text-[var(--magenta-accent)] hover:border-[rgb(232_121_249/0.4)] hover:bg-[var(--bg-panel)]/50 transition-colors"
      title="Printables & settings"
      aria-label="Open printables menu"
    >
      <GearIcon />
    </button>
  );
}

export default function PrintablesMenu({ open, onClose }: PrintablesMenuProps) {
  const readyCount = PRINTABLES.filter((p) => p.available).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close printables menu"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="printables-title"
            className="fixed z-50 top-4 right-4 left-4 sm:left-auto sm:w-[min(28rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] flex flex-col hud-panel shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-start justify-between gap-3 p-4 border-b border-[var(--violet-border)]/50 shrink-0">
              <div>
                <p className="font-mono-label text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  Settings
                </p>
                <h2 id="printables-title" className="text-base font-semibold text-glow-magenta mt-0.5">
                  Printables
                </h2>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">
                  {readyCount} ready, {PRINTABLES.length - readyCount} not built yet
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 px-2 py-1 rounded text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--bg-panel)]/60 text-sm"
              >
                ✕
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
              {PRINTABLES.map((item) => (
                <li key={item.id}>
                  {item.available && item.path ? (
                    <button
                      type="button"
                      onClick={() => {
                        openPrintable(item.path!);
                        onClose();
                      }}
                      className="w-full text-left rounded-lg px-3 py-3 border border-[rgb(124_58_237/0.35)] bg-[rgb(124_58_237/0.12)] hover:bg-[rgb(124_58_237/0.2)] transition-colors"
                    >
                      <PrintableRow item={item} />
                      <span className="mt-2 inline-block font-mono-label text-[10px] uppercase tracking-wider text-[var(--magenta-accent)]">
                        Open & print →
                      </span>
                    </button>
                  ) : (
                    <div className="w-full rounded-lg px-3 py-3 border border-[var(--violet-border)]/30 bg-[var(--bg-deep)]/40 opacity-70">
                      <PrintableRow item={item} />
                      <span className="mt-2 inline-block font-mono-label text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                        Not built yet
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="p-3 border-t border-[var(--violet-border)]/50 shrink-0 space-y-2">
              <button
                type="button"
                onClick={() => {
                  openPrintable(FULL_PRINT_PACK_PATH);
                  onClose();
                }}
                className="w-full text-left rounded-lg px-3 py-3 border border-emerald-700/50 bg-emerald-900/25 hover:bg-emerald-900/40 transition-colors"
              >
                <span className="text-sm font-medium text-emerald-200">Full print pack (all handouts)</span>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">
                  One PDF-ready document in lesson order — suspect bios through jury declaration.
                </p>
                <span className="mt-2 inline-block font-mono-label text-[10px] uppercase tracking-wider text-emerald-300/90">
                  Open & print →
                </span>
              </button>
              <p className="text-[10px] text-[var(--text-muted)] leading-snug">
                iPad code app:{' '}
                <a
                  href="/code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--magenta-accent)] hover:underline"
                >
                  /code
                </a>
                {' · '}
                Pair interviews:{' '}
                <a
                  href="/interview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--magenta-accent)] hover:underline"
                >
                  /interview
                </a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PrintableRow({ item }: { item: (typeof PRINTABLES)[number] }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[var(--text-body)]">{item.title}</span>
        {item.available && (
          <span className="font-mono-label text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300/90 border border-emerald-700/40">
            Ready
          </span>
        )}
      </div>
      <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-snug">{item.description}</p>
      <p className="font-mono-label text-[9px] uppercase tracking-wider text-[var(--text-muted)]/80 mt-1.5">
        {item.handoutWhen}
      </p>
    </>
  );
}
