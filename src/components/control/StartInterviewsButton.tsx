import { motion } from 'framer-motion';

const REQUIRED_PICKS = 2;

interface StartInterviewsButtonProps {
  selectedCount: number;
  onStart: () => void;
  variant?: 'broadcast' | 'cinematic';
  className?: string;
}

export default function StartInterviewsButton({
  selectedCount,
  onStart,
  variant = 'broadcast',
  className = '',
}: StartInterviewsButtonProps) {
  const ready = selectedCount >= REQUIRED_PICKS;

  if (variant === 'cinematic') {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ready ? 1 : 0.45, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        disabled={!ready}
        onClick={(event) => {
          event.stopPropagation();
          if (ready) onStart();
        }}
        className={`mt-10 font-mono-label text-sm uppercase tracking-widest px-10 py-4 rounded-lg border transition-all ${
          ready ? 'hover:scale-[1.02]' : 'cursor-not-allowed'
        } ${className}`}
        style={{
          borderColor: ready ? 'var(--magenta-accent)' : 'rgb(113 113 122 / 0.5)',
          color: ready ? 'var(--magenta-accent)' : 'rgb(161 161 170)',
          background: ready ? 'rgb(124 58 237 / 0.12)' : 'rgb(24 24 27 / 0.5)',
        }}
      >
        {ready ? 'Start interviews ▶' : `Pick ${REQUIRED_PICKS - selectedCount} more to start`}
      </motion.button>
    );
  }

  return (
    <div className={`rounded-xl border px-5 py-4 ${className}`}
      style={{
        borderColor: ready ? 'rgb(16 185 129 / 0.45)' : 'rgb(113 113 122 / 0.35)',
        background: ready ? 'rgb(6 78 59 / 0.25)' : 'rgb(24 24 27 / 0.35)',
      }}
    >
      <p className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-emerald-300/90 mb-2">
        {ready ? 'Ready to go' : 'Select two suspects first'}
      </p>
      <p className="text-base text-[var(--text-muted)] leading-relaxed mb-4">
        {ready
          ? 'Opens the secure interview channel on this screen. Pair iPads can use the link shown after you start.'
          : `${selectedCount} / ${REQUIRED_PICKS} selected — tap two cards above.`}
      </p>
      <button
        type="button"
        disabled={!ready}
        onClick={onStart}
        className={`inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-mono-label text-sm transition-colors ${
          ready
            ? 'border-emerald-600/60 bg-emerald-900/35 text-emerald-100 hover:bg-emerald-900/50'
            : 'border-zinc-700/50 bg-zinc-900/30 text-zinc-500 cursor-not-allowed'
        }`}
      >
        Start interviews ▶
      </button>
    </div>
  );
}
