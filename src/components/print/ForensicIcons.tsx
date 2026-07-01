import type { ReactNode } from 'react';
import type { FingerprintType, TreadPattern } from '../../types/investigation';

export const TREAD_LABELS: Record<TreadPattern, string> = {
  wave: 'Wave',
  circle: 'Circles',
  stripe: 'Stripes',
  block: 'Blocks',
  dot: 'Dots',
};

export const TREAD_INITIALS: Record<TreadPattern, string> = {
  wave: 'W',
  circle: 'C',
  stripe: 'S',
  block: 'B',
  dot: 'D',
};

export const FINGERPRINT_LABELS: Record<FingerprintType, string> = {
  arch: 'Arch',
  loop: 'Loop',
  whorl: 'Whorl',
};

export const FINGERPRINT_INITIALS: Record<FingerprintType, string> = {
  arch: 'A',
  loop: 'L',
  whorl: 'W',
};

export const FINGERPRINT_CHOICES = [
  { letter: 'A', label: 'Arch' },
  { letter: 'L', label: 'Loop' },
  { letter: 'W', label: 'Whorl' },
] as const;

export const TREAD_CHOICES = [
  { letter: 'W', label: 'Wave' },
  { letter: 'C', label: 'Circles' },
  { letter: 'S', label: 'Stripes' },
  { letter: 'B', label: 'Blocks' },
  { letter: 'D', label: 'Dots' },
] as const;

export function FingerprintIcon({ type }: { type: FingerprintType }) {
  if (type === 'arch') {
    return (
      <svg className="forensic-icon" width="28" height="18" viewBox="0 0 28 18" aria-hidden>
        <path
          d="M2 16 Q14 2 26 16"
          fill="none"
          stroke="#111"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (type === 'loop') {
    return (
      <svg className="forensic-icon" width="28" height="18" viewBox="0 0 28 18" aria-hidden>
        <path
          d="M8 14 C8 4 20 4 20 10 C20 14 14 16 10 14"
          fill="none"
          stroke="#111"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg className="forensic-icon" width="28" height="18" viewBox="0 0 28 18" aria-hidden>
      <circle cx="14" cy="9" r="3" fill="none" stroke="#111" strokeWidth="1.5" />
      <path
        d="M14 6 C10 6 8 9 8 12 C8 14 10 15 12 14"
        fill="none"
        stroke="#111"
        strokeWidth="1.25"
      />
      <path
        d="M14 6 C18 6 20 9 20 12 C20 14 18 15 16 14"
        fill="none"
        stroke="#111"
        strokeWidth="1.25"
      />
    </svg>
  );
}

export function TreadIcon({ tread }: { tread: TreadPattern }) {
  const id = `tread-${tread}`;
  const patterns: Record<TreadPattern, ReactNode> = {
    wave: (
      <path d="M0 8 Q4 4 8 8 T16 8 T24 8 T32 8" fill="none" stroke="#111" strokeWidth="1.5" />
    ),
    circle: (
      <>
        <circle cx="6" cy="8" r="2.5" fill="none" stroke="#111" strokeWidth="1.25" />
        <circle cx="16" cy="8" r="2.5" fill="none" stroke="#111" strokeWidth="1.25" />
        <circle cx="26" cy="8" r="2.5" fill="none" stroke="#111" strokeWidth="1.25" />
      </>
    ),
    stripe: (
      <>
        <line x1="4" y1="2" x2="4" y2="14" stroke="#111" strokeWidth="2" />
        <line x1="12" y1="2" x2="12" y2="14" stroke="#111" strokeWidth="2" />
        <line x1="20" y1="2" x2="20" y2="14" stroke="#111" strokeWidth="2" />
        <line x1="28" y1="2" x2="28" y2="14" stroke="#111" strokeWidth="2" />
      </>
    ),
    block: (
      <>
        <rect x="2" y="3" width="8" height="10" fill="none" stroke="#111" strokeWidth="1.5" />
        <rect x="12" y="3" width="8" height="10" fill="none" stroke="#111" strokeWidth="1.5" />
        <rect x="22" y="3" width="8" height="10" fill="none" stroke="#111" strokeWidth="1.5" />
      </>
    ),
    dot: (
      <>
        <circle cx="5" cy="8" r="1.5" fill="#111" />
        <circle cx="12" cy="5" r="1.5" fill="#111" />
        <circle cx="19" cy="10" r="1.5" fill="#111" />
        <circle cx="26" cy="7" r="1.5" fill="#111" />
      </>
    ),
  };

  return (
    <svg className="forensic-icon forensic-icon--tread" width="32" height="16" viewBox="0 0 32 16" aria-hidden>
      <defs>
        <clipPath id={id}>
          <rect width="32" height="16" rx="1" />
        </clipPath>
      </defs>
      <rect width="32" height="16" fill="#f0f0f0" stroke="#999" strokeWidth="0.75" rx="1" />
      <g clipPath={`url(#${id})`}>{patterns[tread]}</g>
    </svg>
  );
}

interface CircleChoiceProps {
  choices: readonly { letter: string; label: string }[];
}

export function CircleChoice({ choices }: CircleChoiceProps) {
  return (
    <span className="forensic-circle-choice">
      {choices.map(({ letter, label }) => (
        <span key={letter} className="forensic-circle-choice__option" title={label}>
          <span className="forensic-circle-choice__ring" aria-hidden />
          <span className="forensic-circle-choice__letter">{letter}</span>
        </span>
      ))}
    </span>
  );
}
