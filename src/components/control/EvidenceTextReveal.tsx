import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TypewriterBlock from './TypewriterBlock';
import { formatEvidenceContent } from './formatContent';
import { TYPEWRITER_BODY } from '../../hooks/useTypewriter';

interface EvidenceTextRevealProps {
  content: string;
  size: 'large' | 'broadcast';
  /** Change to restart the reveal (e.g. stage or evidence id) */
  revealKey: string;
}

export default function EvidenceTextReveal({
  content,
  size,
  revealKey,
}: EvidenceTextRevealProps) {
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    setTyped(false);
  }, [revealKey, content]);

  const bodyClass =
    size === 'large'
      ? 'text-2xl lg:text-3xl leading-relaxed text-[var(--text-body)]'
      : 'text-2xl md:text-3xl xl:text-4xl leading-relaxed text-[var(--text-body)]';

  if (!content.trim()) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      {!typed ? (
        <TypewriterBlock
          text={content}
          active
          timing={TYPEWRITER_BODY}
          className={bodyClass}
          cursorBright={size === 'broadcast'}
          onDone={() => setTyped(true)}
        />
      ) : (
        <ul className="list-none space-y-2">{formatEvidenceContent(content, size)}</ul>
      )}
    </motion.div>
  );
}
