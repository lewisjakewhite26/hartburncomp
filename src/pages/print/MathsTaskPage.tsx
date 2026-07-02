import { COVER_META } from '../../data/printCopy';
import {
  MATHS_TASK,
  MATHS_TASK_QUESTIONS_CODE,
  MATHS_TASK_QUESTIONS_DISPLAY,
  mathsTaskCodeOrderHint,
  TASK_CODE_LENGTH,
} from '../../data/taskContent';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import TaskShapeIcon, { taskShapeLabel } from '../../components/print/TaskShapeIcon';
import './print-shared.css';
import './print-tasks.css';

interface MathsTaskPageProps {
  bundle?: boolean;
}

export default function MathsTaskPage({ bundle = false }: MathsTaskPageProps) {
  const codeOrderHint = mathsTaskCodeOrderHint();

  return (
    <div className={`print-task-sheet${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="print-task-toolbar no-print">
        <span>Task 2 — Algebra. Print one per pair (Ctrl+P).</span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <section className="print-task-cover">
        <div className="print-task-cover__stamp">{COVER_META.classification}</div>
        <h1>{MATHS_TASK.title}</h1>
        <p className="print-task-cover__subtitle">{MATHS_TASK.subtitle}</p>
        <div className="print-task-cover__meta">
          CASE REF: {COVER_META.caseRef}
          <br />
          DOCUMENT: Fingerprint tally worksheet
          <br />
          DATE: {COVER_META.date}
        </div>

        <p className="print-task-cover__intro">{MATHS_TASK.intro}</p>
        <ol className="print-task-cover__steps">
          <li>Solve each equation. Show your working in the space provided.</li>
          <li>Each answer is a single digit (0–9). Write it in that question’s answer box.</li>
          <li>
            The questions are mixed up — do not read your answers top to bottom. Find each
            shape’s digit, then write them in the order shown at the bottom (
            {codeOrderHint}).
          </li>
          <li>Tell your teacher when access is granted — then open the next envelope.</li>
        </ol>

        <div className="print-task-questions">
          {MATHS_TASK_QUESTIONS_DISPLAY.map((question, index) => (
            <div key={question.equation} className="print-task-question">
              <div className="print-task-question__header">
                <div className="print-task-question__shape-tag">
                  <TaskShapeIcon shape={question.shape} size={32} />
                  <span>{taskShapeLabel(question.shape)}</span>
                </div>
                <span className="print-task-question__number">
                  Question {index + 1}
                </span>
              </div>
              <p className="print-task-question__equation">{question.equation}</p>
              <p className="print-task-question__prompt">{question.prompt}</p>
              <div className="print-task-question__working">
                <span>Working</span>
              </div>
              <div className="print-task-question__answer">
                Answer:
                <span className="print-task-count__box" aria-hidden />
              </div>
            </div>
          ))}
        </div>

        <div className="print-task-code">
          <h2>Your access code</h2>
          <p>
            Match each answer to its shape, then write the digits in this order —{' '}
            <strong>not</strong> the order of the questions above: {codeOrderHint}.
          </p>
          <div className="print-task-code__digits">
            {MATHS_TASK_QUESTIONS_CODE.slice(0, TASK_CODE_LENGTH).map((question) => (
              <div key={question.shape} className="print-task-code__digit">
                <span className="print-task-code__box" aria-hidden />
                <TaskShapeIcon shape={question.shape} size={22} />
                <span>{taskShapeLabel(question.shape)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PrintTeacherFooter printableId="task-fingerprint" />
    </div>
  );
}
