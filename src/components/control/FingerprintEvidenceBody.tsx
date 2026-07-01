import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FingerprintScanReveal, { isFingerprintEvidence } from './FingerprintScanReveal';
import TypewriterBlock from './TypewriterBlock';
import { formatEvidenceContent } from './formatContent';
import { TYPEWRITER_BODY } from '../../hooks/useTypewriter';

const BROADCAST_SEEN_KEY = 'pc-fingerprint-scan-broadcast';

interface FingerprintEvidenceBodyProps {
  content: string;
  size: 'large' | 'broadcast';
  forceScan?: boolean;
}

export function FingerprintEvidenceBody({
  content,
  size,
  forceScan = false,
}: FingerprintEvidenceBodyProps) {
  const [scanDone, setScanDone] = useState(() => {
    if (forceScan || size === 'large') return false;
    try {
      return sessionStorage.getItem(BROADCAST_SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [textDone, setTextDone] = useState(false);

  const finishScan = () => {
    if (size === 'broadcast') {
      try {
        sessionStorage.setItem(BROADCAST_SEEN_KEY, '1');
      } catch {
        /* ignore */
      }
    }
    setScanDone(true);
  };

  useEffect(() => {
    setTextDone(false);
  }, [content, scanDone]);

  const bodyClass =
    size === 'large'
      ? 'text-2xl lg:text-3xl leading-relaxed text-[var(--text-body)]'
      : 'text-2xl md:text-3xl xl:text-4xl leading-relaxed text-[var(--text-body)]';

  return (
    <div className="flex flex-col items-center lg:items-start gap-8 lg:gap-10">
      {!scanDone && (
        <FingerprintScanReveal
          variant={size === 'broadcast' ? 'cinematic' : 'panel'}
          active
          onComplete={finishScan}
          className={size === 'broadcast' ? 'w-full' : ''}
        />
      )}

      <AnimatePresence>
        {scanDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {!textDone ? (
              <TypewriterBlock
                text={content}
                active
                timing={TYPEWRITER_BODY}
                className={bodyClass}
                cursorBright
                onDone={() => setTextDone(true)}
              />
            ) : (
              <ul className="list-none space-y-2">{formatEvidenceContent(content, size)}</ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { isFingerprintEvidence };
