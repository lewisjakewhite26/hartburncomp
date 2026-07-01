import { HANDOUT_GUIDE, handoutOrdinal, type PrintableId } from '../../data/printHandoutGuide';
import './print-teacher-footer.css';

interface PrintTeacherFooterProps {
  printableId: PrintableId;
}

export default function PrintTeacherFooter({ printableId }: PrintTeacherFooterProps) {
  const guide = HANDOUT_GUIDE[printableId];
  const ordinal = handoutOrdinal(guide.order);

  return (
    <footer className="print-teacher-footer" aria-label="Teacher handout guide">
      <div className="print-teacher-footer__inner">
        <span className="print-teacher-footer__badge">
          Teacher · Handout {guide.order} of {guide.total}
        </span>
        <p className="print-teacher-footer__instruction">
          <strong>Hand out {ordinal}.</strong> {guide.instruction}
        </p>
      </div>
    </footer>
  );
}
