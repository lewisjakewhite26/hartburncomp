import { COVER_META } from '../../data/printCopy';
import { JURY_DECLARATION } from '../../data/juryDeclaration';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import './print-shared.css';
import './print-tasks.css';
import './jury-declaration.css';

interface JuryDeclarationPageProps {
  bundle?: boolean;
}

export default function JuryDeclarationPage({ bundle = false }: JuryDeclarationPageProps) {
  return (
    <div className={`print-task-sheet jury-declaration${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="print-task-toolbar no-print">
        <span>Jury declaration — print one per pair (Ctrl+P). Hand in at debrief.</span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <section className="jury-declaration__page">
        <div className="print-task-cover__stamp">{COVER_META.classification}</div>
        <h1>{JURY_DECLARATION.title}</h1>
        <p className="print-task-cover__subtitle">{JURY_DECLARATION.subtitle}</p>
        <div className="print-task-cover__meta">
          CASE REF: {COVER_META.caseRef}
          <br />
          DOCUMENT: Final jury verdict
          <br />
          DATE: {COVER_META.date}
        </div>

        <p className="print-task-cover__intro">{JURY_DECLARATION.intro}</p>

        <div className="jury-declaration__meta-fields">
          <label className="jury-declaration__field jury-declaration__field--short">
            <span>{JURY_DECLARATION.fields.group}</span>
            <span className="jury-declaration__line" aria-hidden />
          </label>
        </div>

        <div className="jury-declaration__verdict">
          <p className="jury-declaration__verdict-text">
            {JURY_DECLARATION.verdictLead}{' '}
            <span className="jury-declaration__blank jury-declaration__blank--name" aria-hidden />{' '}
            {JURY_DECLARATION.verdictMiddle}
          </p>

          <p className="jury-declaration__reason-lead">{JURY_DECLARATION.verdictReasonLead}</p>
          <div className="jury-declaration__evidence">
            {Array.from({ length: JURY_DECLARATION.evidenceLines }, (_, index) => (
              <span
                key={index}
                className="jury-declaration__line jury-declaration__line--evidence"
                aria-hidden
              />
            ))}
          </div>
        </div>

        <div className="jury-declaration__signatures">
          <p className="jury-declaration__sign-off">{JURY_DECLARATION.signOff}</p>
          <div className="jury-declaration__signature-grid">
            <label className="jury-declaration__field">
              <span>{JURY_DECLARATION.fields.memberOne}</span>
              <span className="jury-declaration__line" aria-hidden />
            </label>
            <label className="jury-declaration__field">
              <span>{JURY_DECLARATION.fields.memberTwo}</span>
              <span className="jury-declaration__line" aria-hidden />
            </label>
          </div>
        </div>
      </section>

      <PrintTeacherFooter printableId="accusation-form" />
    </div>
  );
}
