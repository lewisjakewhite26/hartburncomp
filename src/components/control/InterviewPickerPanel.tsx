import { motion } from 'framer-motion';
import { csiMatchRowsInOrder, scoreBarColor, scoreBarGradient } from '../../data/csiMatch';
import { FINAL_FIVE_IDS } from '../../data/suspects';

const MAX_INTERVIEWS = 2;

interface InterviewPickerPanelProps {
  selectedIds: string[];
  onToggle: (suspectId: string) => void;
  variant?: 'broadcast' | 'cinematic';
  rowOrder?: readonly string[];
}

export default function InterviewPickerPanel({
  selectedIds,
  onToggle,
  variant = 'broadcast',
  rowOrder,
}: InterviewPickerPanelProps) {
  const rows = csiMatchRowsInOrder(rowOrder ?? FINAL_FIVE_IDS);
  const atLimit = selectedIds.length >= MAX_INTERVIEWS;

  const handleToggle = (suspectId: string) => {
    onToggle(suspectId);
  };

  const gridClass =
    variant === 'cinematic'
      ? 'interview-picker__grid interview-picker__grid--cinematic'
      : 'interview-picker__grid';

  return (
    <div className={`interview-picker interview-picker--${variant}`}>
      <div className="interview-picker__header">
        <p className="interview-picker__hint">
          Ultra AI evidence stack · tap two cards to interview
        </p>
        <p className="interview-picker__count">
          {selectedIds.length} / {MAX_INTERVIEWS} selected
        </p>
      </div>

      <ul className={gridClass}>
        {rows.map((row, index) => {
          const selected = selectedIds.includes(row.suspectId);
          const disabled = !selected && atLimit;

          return (
            <li key={row.suspectId}>
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.35 }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!disabled) handleToggle(row.suspectId);
                }}
                disabled={disabled}
                aria-pressed={selected}
                className={`interview-picker__card ${selected ? 'interview-picker__card--selected' : ''} ${disabled ? 'interview-picker__card--disabled' : ''}`}
              >
                {selected && (
                  <span className="interview-picker__badge">Interview</span>
                )}
                <span className="interview-picker__name">{row.name}</span>
                <span className="interview-picker__role">{row.role}</span>
                <div className="interview-picker__bar-row">
                  <div
                    className="interview-picker__track"
                    role="meter"
                    aria-label={`${row.name} evidence match`}
                    aria-valuenow={row.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <motion.div
                      className="interview-picker__fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${row.score}%` }}
                      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: scoreBarGradient(row.score) }}
                    />
                  </div>
                  <span
                    className="interview-picker__score"
                    style={{ color: scoreBarColor(row.score) }}
                  >
                    {row.score}%
                  </span>
                </div>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function toggleInterviewSelection(selectedIds: string[], suspectId: string): string[] {
  if (selectedIds.includes(suspectId)) {
    return selectedIds.filter((id) => id !== suspectId);
  }
  if (selectedIds.length >= MAX_INTERVIEWS) {
    return selectedIds;
  }
  return [...selectedIds, suspectId];
}
