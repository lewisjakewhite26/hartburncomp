import ControlPage from './pages/ControlPage';
import CodeEntryPage from './pages/CodeEntryPage';
import SuspectBioSheetPage from './pages/print/SuspectBioSheetPage';
import SuspectForensicSheetPage from './pages/print/SuspectForensicSheetPage';
import SpagTaskPage from './pages/print/SpagTaskPage';
import MathsTaskPage from './pages/print/MathsTaskPage';
import VictimBioTaskPage from './pages/print/VictimBioTaskPage';
import JuryDeclarationPage from './pages/print/JuryDeclarationPage';
import AllPrintablesPage from './pages/print/AllPrintablesPage';
import InterviewChatPage from './pages/InterviewChatPage';

function route():
  | 'control'
  | 'code'
  | 'interview'
  | 'print-all'
  | 'print-suspects'
  | 'print-forensics'
  | 'print-task-spag'
  | 'print-task-maths'
  | 'print-task-victim'
  | 'print-jury' {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/code' || path.endsWith('/code')) return 'code';
  if (path === '/interview' || path.endsWith('/interview')) return 'interview';
  if (path === '/print/all' || path.endsWith('/print/all')) {
    return 'print-all';
  }
  if (path === '/print/suspects' || path.endsWith('/print/suspects')) {
    return 'print-suspects';
  }
  if (path === '/print/forensics' || path.endsWith('/print/forensics')) {
    return 'print-forensics';
  }
  if (path === '/print/task/spag' || path.endsWith('/print/task/spag')) {
    return 'print-task-spag';
  }
  if (path === '/print/task/maths' || path.endsWith('/print/task/maths')) {
    return 'print-task-maths';
  }
  if (path === '/print/task/victim' || path.endsWith('/print/task/victim')) {
    return 'print-task-victim';
  }
  if (path === '/print/jury' || path.endsWith('/print/jury')) {
    return 'print-jury';
  }
  return 'control';
}

export default function App() {
  if (route() === 'code') {
    return <CodeEntryPage />;
  }
  if (route() === 'interview') {
    return <InterviewChatPage />;
  }
  if (route() === 'print-all') {
    return <AllPrintablesPage />;
  }
  if (route() === 'print-suspects') {
    return <SuspectBioSheetPage />;
  }
  if (route() === 'print-forensics') {
    return <SuspectForensicSheetPage />;
  }
  if (route() === 'print-task-spag') {
    return <SpagTaskPage />;
  }
  if (route() === 'print-task-maths') {
    return <MathsTaskPage />;
  }
  if (route() === 'print-task-victim') {
    return <VictimBioTaskPage />;
  }
  if (route() === 'print-jury') {
    return <JuryDeclarationPage />;
  }
  return <ControlPage />;
}
