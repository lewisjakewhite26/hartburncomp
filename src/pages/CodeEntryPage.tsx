import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  isValidTaskCode,
  WRONG_ATTEMPT_LIMIT,
  LOCKOUT_SECONDS,
  CODE_LENGTH,
} from '../data/codes';

type Result = 'idle' | 'correct' | 'wrong';

const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back'] as const;

function CodeDisplay({ digits, locked }: { digits: string; locked: boolean }) {
  const slots = Array.from({ length: CODE_LENGTH }, (_, i) => digits[i] ?? '');

  return (
    <div
      className={`keypad-display ${locked ? 'keypad-display--locked' : ''}`}
      aria-label={`Code entry: ${digits.length} of ${CODE_LENGTH} digits`}
    >
      {slots.map((digit, i) => (
        <div
          key={i}
          className={`keypad-display__slot ${digit ? 'keypad-display__slot--filled' : ''} ${
            i === digits.length && !locked ? 'keypad-display__slot--active' : ''
          }`}
        >
          {digit ? (
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="keypad-display__digit"
            >
              {digit}
            </motion.span>
          ) : (
            <span className="keypad-display__placeholder" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
}

function KeypadButton({
  label,
  onClick,
  disabled,
  variant = 'digit',
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  variant?: 'digit' | 'action';
}) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      className={`keypad-btn ${variant === 'action' ? 'keypad-btn--action' : ''}`}
    >
      {label === 'back' ? (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
        </svg>
      ) : label === 'clear' ? (
        'CLR'
      ) : (
        label
      )}
    </motion.button>
  );
}

export default function CodeEntryPage() {
  const [group, setGroup] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState<Result>('idle');
  const [wrongCount, setWrongCount] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [lockRemaining, setLockRemaining] = useState(0);

  useEffect(() => {
    if (!lockUntil) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((lockUntil - Date.now()) / 1000));
      setLockRemaining(left);
      if (left <= 0) {
        setLockUntil(null);
        setWrongCount(0);
      }
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [lockUntil]);

  const locked = lockUntil !== null && lockRemaining > 0;
  const inputDisabled = locked || group === null;

  const submitCode = useCallback(
    (value: string) => {
      if (group === null || locked || value.length !== CODE_LENGTH) return;

      if (isValidTaskCode(value)) {
        setResult('correct');
        setWrongCount(0);
      } else {
        setResult('wrong');
        const next = wrongCount + 1;
        setWrongCount(next);
        if (next >= WRONG_ATTEMPT_LIMIT) {
          setLockUntil(Date.now() + LOCKOUT_SECONDS * 1000);
        }
      }
      setCode('');
    },
    [group, locked, wrongCount],
  );

  const appendDigit = (digit: string) => {
    if (inputDisabled) return;
    setCode((prev) => {
      if (prev.length >= CODE_LENGTH) return prev;
      const next = prev + digit;
      if (next.length === CODE_LENGTH) {
        setTimeout(() => submitCode(next), 120);
      }
      return next;
    });
  };

  const backspace = () => {
    if (inputDisabled) return;
    setCode((prev) => prev.slice(0, -1));
  };

  const clearCode = () => {
    if (inputDisabled) return;
    setCode('');
  };

  const handleKey = (key: (typeof KEYPAD)[number]) => {
    if (key === 'back') backspace();
    else if (key === 'clear') clearCode();
    else appendDigit(key);
  };

  const reset = () => {
    setResult('idle');
    setCode('');
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center p-3 sm:p-6"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div className="w-full max-w-lg hud-panel p-4 sm:p-6 md:p-8">
        <h1 className="font-mono-label text-center text-sm uppercase tracking-[0.3em] text-glow-violet mb-1">
          Access terminal
        </h1>
        <p className="text-center text-sm text-[var(--text-muted)] mb-6">
          Select your group, then enter the code from your task sheet
        </p>

        <AnimatePresence mode="wait">
          {result === 'idle' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Group cards */}
              <div>
                <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 text-center">
                  Group
                </p>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={locked}
                      onClick={() => setGroup(n)}
                      className={`group-card ${group === n ? 'group-card--selected' : ''}`}
                    >
                      <span className="group-card__number">{n}</span>
                      <span className="group-card__label">Grp</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code display + keypad */}
              <div className={group === null ? 'opacity-40 pointer-events-none' : ''}>
                <p className="font-mono-label text-xs uppercase tracking-widest text-[var(--text-muted)] mb-3 text-center">
                  Code
                </p>

                <CodeDisplay digits={code} locked={locked} />

                {group === null && (
                  <p className="text-center text-xs text-[var(--text-muted)] mt-2">
                    Pick a group above to unlock the keypad
                  </p>
                )}

                <div className="keypad-grid mt-5">
                  {KEYPAD.map((key) => (
                    <KeypadButton
                      key={key}
                      label={key}
                      variant={key === 'back' || key === 'clear' ? 'action' : 'digit'}
                      disabled={inputDisabled}
                      onClick={() => handleKey(key)}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => submitCode(code)}
                  disabled={inputDisabled || code.length !== CODE_LENGTH}
                  className="w-full mt-4 btn-release font-mono-label uppercase tracking-widest py-3 rounded-lg disabled:opacity-30"
                >
                  Authorise
                </button>
              </div>

              {locked && (
                <p className="text-center font-mono-label text-sm text-[var(--twist-alert)]">
                  Terminal locked — retry in {lockRemaining}s
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              {result === 'correct' ? (
                <>
                  <div className="text-5xl sm:text-6xl mb-4 text-emerald-400">✓</div>
                  <p className="text-xl sm:text-2xl font-semibold text-emerald-400 mb-2">Access granted</p>
                  <p className="text-[var(--text-muted)]">Group {group}. Tell your teacher.</p>
                </>
              ) : (
                <>
                  <div className="text-5xl sm:text-6xl mb-4 text-red-400">✗</div>
                  <p className="text-xl sm:text-2xl font-semibold text-red-400 mb-2">Access denied</p>
                  <p className="text-[var(--text-muted)] mb-6">Check the paper and try again</p>
                </>
              )}
              <button
                type="button"
                onClick={reset}
                disabled={locked}
                className="font-mono-label text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--magenta-accent)] disabled:opacity-40"
              >
                Enter another code
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
