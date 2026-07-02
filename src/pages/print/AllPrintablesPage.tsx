import SuspectBioSheetPage from './SuspectBioSheetPage';
import SuspectForensicSheetPage from './SuspectForensicSheetPage';
import SpagTaskPage from './SpagTaskPage';
import MathsTaskPage from './MathsTaskPage';
import VictimBioTaskPage from './VictimBioTaskPage';
import JuryDeclarationPage from './JuryDeclarationPage';
import './print-shared.css';
import './print-bundle.css';

export default function AllPrintablesPage() {
  return (
    <div className="print-bundle">
      <div className="print-bundle-toolbar no-print">
        <span>
          Full print pack — all six handouts in lesson order. Print or save as PDF (Ctrl+P).
        </span>
        <button type="button" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <SuspectBioSheetPage bundle />
      <SuspectForensicSheetPage bundle />
      <SpagTaskPage bundle />
      <MathsTaskPage bundle />
      <VictimBioTaskPage bundle />
      <JuryDeclarationPage bundle />
    </div>
  );
}
