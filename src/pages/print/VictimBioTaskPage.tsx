import { COVER_META } from '../../data/printCopy';
import { CASE_YEAR, TASK_CODE_LENGTH, VICTIM_BIO_TASK } from '../../data/taskContent';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import './print-tasks.css';

interface VictimBioTaskPageProps {
  bundle?: boolean;
}

export default function VictimBioTaskPage({ bundle = false }: VictimBioTaskPageProps) {
  return (
    <div className={`print-task-sheet${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="print-task-toolbar no-print">
        <span>Task 3 — Mr White victim profile. Print one per pair (Ctrl+P).</span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <section className="print-task-cover">
        <div className="print-task-cover__stamp">{COVER_META.classification}</div>
        <h1>{VICTIM_BIO_TASK.title}</h1>
        <p className="print-task-cover__subtitle">{VICTIM_BIO_TASK.subtitle}</p>
        <div className="print-task-cover__meta">
          CASE REF: {COVER_META.caseRef}
          <br />
          DOCUMENT: Victim staff profile (extract)
          <br />
          DATE: {COVER_META.date}
        </div>

        <p className="print-task-cover__intro">{VICTIM_BIO_TASK.intro}</p>

        <div className="print-task-victim">
          <p className="print-task-victim__label">Staff record — victim</p>
          <dl className="print-task-victim__facts">
            {VICTIM_BIO_TASK.facts.map((fact) => (
              <div key={fact.label} className="print-task-victim__fact">
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="print-task-victim__bio">
            {VICTIM_BIO_TASK.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="print-task-statement__paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="print-task-birthyear">
          <h2>Find the code</h2>
          <p>{VICTIM_BIO_TASK.codePrompt}</p>
          <div className="print-task-birthyear__working">
            <div className="print-task-birthyear__row">
              <span>Mr White&apos;s age:</span>
              <span className="print-task-birthyear__box" aria-hidden />
            </div>
            <div className="print-task-birthyear__row">
              <span>Case file year:</span>
              <span className="print-task-birthyear__value">{CASE_YEAR}</span>
            </div>
            <div className="print-task-birthyear__row">
              <span>Year born:</span>
              <span className="print-task-birthyear__boxes" aria-hidden>
                {Array.from({ length: TASK_CODE_LENGTH }, (_, index) => (
                  <span key={index} className="print-task-code__box" />
                ))}
              </span>
            </div>
          </div>
        </div>

        <div className="print-task-code print-task-code--emphasis">
          <h2>Your access code</h2>
          <p>
            Enter the four-digit year Mr White was born on the class iPad, then tell your
            teacher.
          </p>
          <div className="print-task-code__digits">
            {Array.from({ length: TASK_CODE_LENGTH }, (_, index) => (
              <div key={index} className="print-task-code__digit">
                <span className="print-task-code__box" aria-hidden />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrintTeacherFooter printableId="task-footprint" />
    </div>
  );
}
