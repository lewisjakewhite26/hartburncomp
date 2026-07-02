import { useState } from 'react';
import { motion } from 'framer-motion';
import { getSuspect } from '../../data/suspects';
import TypewriterBlock from './TypewriterBlock';
import { TYPEWRITER_TITLE, TYPEWRITER_BODY } from '../../hooks/useTypewriter';

export default function DebriefReveal() {
  const grant = getSuspect('grant');
  const [titleDone, setTitleDone] = useState(false);
  const [trailIndex, setTrailIndex] = useState(0);

  const trail = [
    'Sign-in book: five cleared — not on site before noon',
    'Mug print: whorl ruled out; arch or loop still possible',
    'Mat print: wave tread, size 6, under 5\'11" — Grant and Patel both fit',
    'Ultra AI stack: Grant and Patel scored highest on the evidence bars',
    'Interviews: Patel had kitchen alibi before 11:30; Grant was in the staff room for cones',
    'Sugar bowl: poison in shared sugar — staff room access matters',
    'Grant: PE cupboard should have been locked; he went in before break',
    'Motive: Grant wanted Sports Day — Mr White got it instead',
  ];

  const roleLine = `${grant?.role ?? 'PE Teacher'} — guilty`;
  const motive = grant?.motive ?? '';
  const statement = grant?.statement ?? '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-full min-h-0 hud-panel hud-panel-active flex flex-col overflow-hidden"
    >
      <div className="px-4 sm:px-8 lg:px-14 pt-6 sm:pt-10 lg:pt-12 pb-4 sm:pb-6 border-b border-[var(--violet-border)]/50 shrink-0">
        <p className="font-mono-label text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[var(--text-muted)] mb-2 sm:mb-3">
          Case closed
        </p>
        {!titleDone ? (
          <TypewriterBlock
            text={grant?.name ?? 'Mr Grant'}
            active
            timing={TYPEWRITER_TITLE}
            className="text-2xl sm:text-4xl lg:text-6xl font-semibold text-glow-magenta tracking-tight"
            cursorBright
            onDone={() => setTitleDone(true)}
          />
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-semibold text-glow-magenta tracking-tight">
              {grant?.name ?? 'Mr Grant'}
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mt-3"
            >
              <TypewriterBlock
                text={roleLine}
                active
                timing={TYPEWRITER_BODY}
                className="text-base sm:text-xl lg:text-2xl text-[var(--text-muted)]"
              />
            </motion.div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-custom px-4 sm:px-8 lg:px-14 py-5 sm:py-8 grid lg:grid-cols-2 gap-6 sm:gap-10">
        <div>
          <h2 className="font-mono-label text-sm uppercase tracking-widest text-glow-violet mb-5">
            Evidence trail
          </h2>
          <ul className="space-y-4">
            {trail.slice(0, titleDone ? trailIndex + 1 : 0).map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3 sm:gap-4 text-base sm:text-xl lg:text-2xl text-[var(--text-body)]"
              >
                <span className="font-mono-label text-[var(--magenta-accent)] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i === trailIndex && titleDone && trailIndex < trail.length ? (
                  <TypewriterBlock
                    text={item}
                    active
                    timing={TYPEWRITER_BODY}
                    onDone={() => setTrailIndex((n) => n + 1)}
                  />
                ) : (
                  item
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {titleDone && trailIndex >= trail.length && (
          <DebriefAside grantMotive={motive} grantStatement={statement} />
        )}
      </div>
    </motion.div>
  );
}

function DebriefAside({
  grantMotive,
  grantStatement,
}: {
  grantMotive: string;
  grantStatement: string;
}) {
  const [showStatement, setShowStatement] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="hud-panel p-6 border-[var(--violet-border)]"
    >
      <h2 className="font-mono-label text-xs uppercase tracking-widest text-glow-violet mb-3">
        Motive
      </h2>
      <TypewriterBlock
        text={grantMotive}
        active
        timing={TYPEWRITER_BODY}
        className="text-xl leading-relaxed text-[var(--text-body)] mb-6"
        onDone={() => setShowStatement(true)}
      />
      {showStatement && (
        <>
          <h2 className="font-mono-label text-xs uppercase tracking-widest text-glow-violet mb-3">
            Statement (excerpt)
          </h2>
          <TypewriterBlock
            text={`"${grantStatement}"`}
            active
            timing={TYPEWRITER_BODY}
            className="text-lg italic text-[var(--text-muted)] leading-relaxed"
          />
        </>
      )}
    </motion.div>
  );
}
