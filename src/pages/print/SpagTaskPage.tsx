import { COVER_META } from '../../data/printCopy';
import { SPAG_TASK, TASK_CODE_LENGTH } from '../../data/taskContent';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import './print-tasks.css';

const CODE_LABELS = ['1st digit', '2nd digit', '3rd digit', '4th digit'] as const;

interface SpagTaskPageProps {
  bundle?: boolean;
}

export default function SpagTaskPage({ bundle = false }: SpagTaskPageProps) {
  return (
    <div className={`print-task-sheet${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="print-task-toolbar no-print">
        <span>Task 1 — SPAG statement check. Print one per pair (Ctrl+P).</span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <section className="print-task-cover">
        <div className="print-task-cover__stamp">{COVER_META.classification}</div>
        <h1>{SPAG_TASK.title}</h1>
        <p className="print-task-cover__subtitle">{SPAG_TASK.subtitle}</p>
        <div className="print-task-cover__meta">
          CASE REF: {COVER_META.caseRef}
          <br />
          DOCUMENT: Written statement analysis
          <br />
          DATE: {COVER_META.date}
        </div>

        <p className="print-task-cover__intro">{SPAG_TASK.intro}</p>
        <ol className="print-task-cover__steps">
          <li>Read all four paragraphs of the suspect statement.</li>
          <li>Work through each count in order. Write one digit per box.</li>
          <li>Put the four digits together and enter the code on the class iPad.</li>
          <li>Tell your teacher when access is granted — then open the next envelope.</li>
        </ol>

        <div className="print-task-suspect">
          <p className="print-task-suspect__label">Suspect under review</p>
          <p className="print-task-suspect__name">{SPAG_TASK.suspectName}</p>
          <p className="print-task-suspect__role">{SPAG_TASK.suspectRole}</p>
        </div>

        <div className="print-task-statement">
          <p className="print-task-statement__label">Written statement (as filed)</p>
          {SPAG_TASK.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="print-task-statement__paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="print-task-counts">
          {SPAG_TASK.counts.map((item, index) => (
            <div key={item.label} className="print-task-count">
              <span className="print-task-count__number">{index + 1}</span>
              <p className="print-task-count__label">{item.label}</p>
              <p className="print-task-count__hint">{item.hint}</p>
              <div className="print-task-count__answer">
                Answer:
                <span className="print-task-count__box" aria-hidden />
              </div>
            </div>
          ))}
        </div>

        <div className="print-task-code">
          <h2>Your access code</h2>
          <p>
            Write your four answers in order — missed capitals, then misspellings, then
            adjectives, then pronouns.
          </p>
          <div className="print-task-code__digits">
            {Array.from({ length: TASK_CODE_LENGTH }, (_, index) => (
              <div key={CODE_LABELS[index]} className="print-task-code__digit">
                <span className="print-task-code__box" aria-hidden />
                {CODE_LABELS[index]}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrintTeacherFooter printableId="task-ledger" />
    </div>
  );
}
