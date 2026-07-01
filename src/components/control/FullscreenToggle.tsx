interface FullscreenToggleProps {
  active: boolean;
  onToggle: () => void;
}

export default function FullscreenToggle({ active, onToggle }: FullscreenToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fullscreen-toggle"
      title={active ? 'Exit fullscreen (Esc)' : 'Fullscreen class view'}
      aria-label={active ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {active ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L5 5m0 0v4m0-4h4M15 9l4-4m0 0v4m0-4h-4M9 15l-4 4m0 0v-4m0 4h4m6-4l4 4m0 0v-4m0 4h-4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
        </svg>
      )}
    </button>
  );
}
