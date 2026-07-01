import { SUSPECTS } from '../../data/suspects';
import {
  CASE_OPEN_NARRATIVE,
  CASE_OPEN_TITLE,
  COVER_META,
  FORENSIC_KEY,
  PACK_INSTRUCTIONS,
} from '../../data/printCopy';
import {
  CircleChoice,
  FINGERPRINT_CHOICES,
  TREAD_CHOICES,
} from '../../components/print/ForensicIcons';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import './suspect-bios.css';

interface SuspectBioSheetPageProps {
  bundle?: boolean;
}

export default function SuspectBioSheetPage({ bundle = false }: SuspectBioSheetPageProps) {
  return (
    <div className={`suspect-bio-sheet${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="suspect-bio-toolbar no-print">
        <span>
          Suspect bios — print from here (Ctrl+P). One pack per pair.
        </span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <section className="suspect-bio-cover">
        <div className="suspect-bio-cover__stamp">{COVER_META.classification}</div>
        <h1>Poisoned Coffee Investigation</h1>
        <p className="suspect-bio-cover__subtitle">St Oakwood Primary, staff room incident</p>
        <div className="suspect-bio-cover__meta">
          CASE REF: {COVER_META.caseRef}
          <br />
          DOCUMENT: {COVER_META.document}
          <br />
          DATE: {COVER_META.date}
        </div>

        <div className="suspect-bio-cover__case-open">
          <h2>{CASE_OPEN_TITLE}</h2>
          {CASE_OPEN_NARRATIVE.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 24)}
              className={
                index === 0
                  ? 'suspect-bio-cover__narrative-lead'
                  : index === CASE_OPEN_NARRATIVE.length - 1
                    ? 'suspect-bio-cover__narrative-close'
                    : undefined
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="suspect-bio-cover__instructions">
          <h2>{PACK_INSTRUCTIONS.heading}</h2>
          <p>{PACK_INSTRUCTIONS.intro}</p>
          <ul>
            {PACK_INSTRUCTIONS.items.map((item) => (
              <li key={item.slice(0, 32)}>{item}</li>
            ))}
          </ul>

          <h2>{FORENSIC_KEY.heading}</h2>
          <p>{FORENSIC_KEY.intro}</p>
          <dl className="suspect-bio-cover__forensic-list">
            {FORENSIC_KEY.items.map((item) => (
              <div key={item.label} className="suspect-bio-cover__forensic-item">
                <dt>{item.label}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="suspect-bio-grid">
        {SUSPECTS.map((suspect, index) => (
          <article key={suspect.id} className="suspect-bio-card">
            <div className="suspect-bio-card__header">
              <h2 className="suspect-bio-card__name">{suspect.name}</h2>
              <span className="suspect-bio-card__number">
                SUSPECT {String(index + 1).padStart(2, '0')} / 15
              </span>
            </div>
            <p className="suspect-bio-card__role">{suspect.role}</p>

            <div className="suspect-bio-card__facts">
              <div className="suspect-bio-fact">
                <span className="suspect-bio-fact__label">Height</span>
                <span className="suspect-bio-fact__value">{suspect.heightLabel}</span>
              </div>
              <div className="suspect-bio-fact">
                <span className="suspect-bio-fact__label">Shoe size</span>
                <span className="suspect-bio-fact__value">UK {suspect.shoeSize}</span>
              </div>
              <div className="suspect-bio-fact suspect-bio-fact--wide">
                <span className="suspect-bio-fact__label">Fingerprint</span>
                <span className="suspect-bio-fact__value">
                  <CircleChoice choices={FINGERPRINT_CHOICES} />
                </span>
              </div>
              <div className="suspect-bio-fact suspect-bio-fact--wide">
                <span className="suspect-bio-fact__label">Sole tread</span>
                <span className="suspect-bio-fact__value">
                  <CircleChoice choices={TREAD_CHOICES} />
                </span>
              </div>
            </div>

            <p className="suspect-bio-card__statement-label">Statement to police</p>
            <blockquote className="suspect-bio-card__statement">{suspect.statement}</blockquote>

            <div className="suspect-bio-card__notes">
              <span>Investigation notes:</span>
              <span className="suspect-bio-card__notes-line suspect-bio-card__notes-line--tall" />
              <label className="suspect-bio-card__ruled-out">
                <span className="suspect-bio-card__ruled-out-box" aria-hidden />
                Ruled out
              </label>
            </div>
          </article>
        ))}
      </div>

      <PrintTeacherFooter printableId="suspect-bios" />
    </div>
  );
}
