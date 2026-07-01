import { useState, useEffect, useCallback } from 'react';

export interface TypewriterTiming {
  baseMs: number;
  newlineMultiplier: number;
  sentenceEndMultiplier: number;
  commaMultiplier: number;
  colonMultiplier: number;
  initialDelayMs: number;
}

/** Slow, front-of-class pacing */
export const TYPEWRITER_TITLE: TypewriterTiming = {
  baseMs: 62,
  newlineMultiplier: 18,
  sentenceEndMultiplier: 16,
  commaMultiplier: 6,
  colonMultiplier: 10,
  initialDelayMs: 650,
};

export const TYPEWRITER_BODY: TypewriterTiming = {
  baseMs: 54,
  newlineMultiplier: 16,
  sentenceEndMultiplier: 14,
  commaMultiplier: 5,
  colonMultiplier: 9,
  initialDelayMs: 500,
};

export const TYPEWRITER_SUBTITLE: TypewriterTiming = {
  baseMs: 48,
  newlineMultiplier: 14,
  sentenceEndMultiplier: 12,
  commaMultiplier: 5,
  colonMultiplier: 8,
  initialDelayMs: 400,
};

function delayForChar(ch: string, timing: TypewriterTiming): number {
  if (ch === '\n') return timing.baseMs * timing.newlineMultiplier;
  if (ch === '.' || ch === '!' || ch === '?') return timing.baseMs * timing.sentenceEndMultiplier;
  if (ch === ',') return timing.baseMs * timing.commaMultiplier;
  if (ch === ':' || ch === ';') return timing.baseMs * timing.colonMultiplier;
  if (ch === ' ') return timing.baseMs * 1.35;
  return timing.baseMs;
}

export function useTypewriter(
  text: string,
  active: boolean,
  timing: TypewriterTiming = TYPEWRITER_BODY,
) {
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setOutput('');
      setDone(false);
      return;
    }

    setOutput('');
    setDone(false);

    if (!text) {
      setDone(true);
      return;
    }

    let i = 0;
    let timer = 0;

    const tick = () => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        setDone(true);
        return;
      }
      const ch = text[i - 1];
      timer = window.setTimeout(tick, delayForChar(ch, timing));
    };

    timer = window.setTimeout(tick, timing.initialDelayMs);
    return () => clearTimeout(timer);
  }, [text, active, timing]);

  const skip = useCallback(() => {
    setOutput(text);
    setDone(true);
  }, [text]);

  return { output, done, skip };
}

/** Pause between cinematic beats (ms) */
export const REVEAL_PAUSE = {
  dimToEnvelope: 1800,
  afterTitle: 1400,
  afterSubtitle: 1200,
  afterBody: 1100,
  continueButton: 900,
} as const;
