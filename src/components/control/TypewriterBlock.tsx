import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, TYPEWRITER_BODY, type TypewriterTiming } from '../../hooks/useTypewriter';

export function TypewriterCursor({ bright = false }: { bright?: boolean }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0.12, 1] }}
      transition={{ repeat: Infinity, duration: 1.15, ease: 'easeInOut' }}
      className={`inline-block w-[3px] h-[0.85em] ml-1 align-middle ${
        bright
          ? 'bg-[var(--magenta-accent)] shadow-[0_0_10px_rgb(232_121_249/0.65)]'
          : 'bg-[var(--magenta-accent)] shadow-[0_0_8px_rgb(232_121_249/0.5)]'
      }`}
    />
  );
}

interface TypewriterBlockProps {
  text: string;
  active: boolean;
  timing?: TypewriterTiming;
  className?: string;
  cursorBright?: boolean;
  onDone?: () => void;
}

export default function TypewriterBlock({
  text,
  active,
  timing = TYPEWRITER_BODY,
  className = '',
  cursorBright = false,
  onDone,
}: TypewriterBlockProps) {
  const { output, done } = useTypewriter(text, active, timing);

  const firedDone = useRef(false);

  useEffect(() => {
    firedDone.current = false;
  }, [text, active]);

  useEffect(() => {
    if (done && active && onDone && !firedDone.current) {
      firedDone.current = true;
      onDone();
    }
  }, [done, active, onDone]);

  return (
    <div className={`whitespace-pre-wrap ${className}`}>
      {active && !done ? output : text}
      {active && !done && <TypewriterCursor bright={cursorBright} />}
    </div>
  );
}

export {
  useTypewriter,
  TYPEWRITER_BODY,
  TYPEWRITER_TITLE,
  TYPEWRITER_SUBTITLE,
} from '../../hooks/useTypewriter';
