type ContentSize = 'large' | 'broadcast';

export function formatEvidenceContent(text: string, size: ContentSize = 'broadcast') {
  const bodyClass =
    size === 'large'
      ? 'text-2xl lg:text-3xl leading-relaxed text-[var(--text-body)] mb-3'
      : 'text-2xl md:text-3xl xl:text-4xl leading-relaxed text-[var(--text-body)] mb-4';
  const bulletClass =
    size === 'large'
      ? 'ml-6 text-2xl lg:text-3xl leading-relaxed text-[var(--text-body)]'
      : 'ml-6 text-2xl md:text-3xl xl:text-4xl leading-relaxed text-[var(--text-body)]';
  const labelClass =
    size === 'large'
      ? 'font-mono-label text-base uppercase tracking-widest text-glow-magenta mt-6 mb-3 first:mt-0'
      : 'font-mono-label text-lg uppercase tracking-widest text-glow-magenta mt-8 mb-4 first:mt-0';

  return text.split('\n').map((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={i} />;
    if (trimmed.startsWith('•')) {
      return (
        <li key={i} className={bulletClass}>
          {trimmed.slice(1).trim()}
        </li>
      );
    }
    if (trimmed.endsWith(':') || (trimmed === trimmed.toUpperCase() && trimmed.length < 40)) {
      return (
        <p key={i} className={labelClass}>
          {trimmed}
        </p>
      );
    }
    return (
      <p key={i} className={bodyClass}>
        {trimmed}
      </p>
    );
  });
}
