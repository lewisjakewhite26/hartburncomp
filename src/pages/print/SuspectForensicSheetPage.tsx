import { SUSPECTS } from '../../data/suspects';
import {
  FINGERPRINT_LABELS,
  FingerprintIcon,
  TREAD_LABELS,
  TreadIcon,
} from '../../components/print/ForensicIcons';
import PrintTeacherFooter from '../../components/print/PrintTeacherFooter';
import './suspect-forensics.css';

interface SuspectForensicSheetPageProps {
  bundle?: boolean;
}

export default function SuspectForensicSheetPage({ bundle = false }: SuspectForensicSheetPageProps) {
  return (
    <div className={`suspect-forensic-sheet${bundle ? ' print-bundle-section' : ''}`}>
      {!bundle && (
      <div className="suspect-forensic-toolbar no-print">
        <span>
          Forensic reference cards — teacher handout. Match prints and treads to suspect bios.
        </span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>
      )}

      <header className="suspect-forensic-cover">
        <div className="suspect-forensic-cover__stamp">Teacher copy — match to suspect bios</div>
        <h1>Forensic reference cards</h1>
        <p>
          Each card shows one person&apos;s fingerprint pattern and sole tread. Hand these out
          separately from the suspect bio sheets. Students study the visuals, then circle the
          matching letter on their bio (A / L / W for prints; W / C / S / B / D for tread).
        </p>
      </header>

      <div className="suspect-forensic-grid">
        {SUSPECTS.map((suspect, index) => (
          <article key={suspect.id} className="suspect-forensic-card">
            <div className="suspect-forensic-card__header">
              <h2>{suspect.name}</h2>
              <span>Suspect {String(index + 1).padStart(2, '0')}</span>
            </div>
            <p className="suspect-forensic-card__role">{suspect.role}</p>

            <div className="suspect-forensic-card__sample">
              <span className="suspect-forensic-card__sample-label">Fingerprint</span>
              <FingerprintIcon type={suspect.fingerprint} />
              <span className="suspect-forensic-card__sample-name">
                {FINGERPRINT_LABELS[suspect.fingerprint]}
              </span>
            </div>

            <div className="suspect-forensic-card__sample">
              <span className="suspect-forensic-card__sample-label">Sole tread</span>
              <TreadIcon tread={suspect.tread} />
              <span className="suspect-forensic-card__sample-name">{TREAD_LABELS[suspect.tread]}</span>
            </div>
          </article>
        ))}
      </div>

      <PrintTeacherFooter printableId="suspect-forensics" />
    </div>
  );
}
