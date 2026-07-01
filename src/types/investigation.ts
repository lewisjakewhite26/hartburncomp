export type FingerprintType = 'arch' | 'loop' | 'whorl';
export type HeightBand = 'short' | 'medium' | 'tall';
export type TreadPattern = 'wave' | 'circle' | 'stripe' | 'block' | 'dot';

export type CaseStageId =
  | 'pending'
  | 'briefing'
  | 'evidence_signin'
  | 'evidence_fingerprint'
  | 'evidence_footprint'
  | 'evidence_csi'
  | 'interviews'
  | 'twist_sugar'
  | 'debrief';

export interface Suspect {
  id: string;
  name: string;
  role: string;
  heightBand: HeightBand;
  heightLabel: string;
  heightInches: number;
  fingerprint: FingerprintType;
  shoeSize: number;
  tread: TreadPattern;
  statement: string;
  isGuilty?: boolean;
  motive?: string;
  clearedBySignIn?: boolean;
  finalFive?: boolean;
  /** Primary interview targets when evidence points to two names. */
  interviewStandout?: boolean;
  staffroomAccess?: boolean;
}

export interface EvidenceItem {
  id: string;
  title: string;
  summary: string;
  /** Matches paper task answer — used by iPad code app only (theatre). */
  unlockCode: string;
  releaseStage: CaseStageId;
  content: string;
}

export interface LessonStage {
  id: CaseStageId;
  title: string;
  teacherCue: string;
  displayBody: string;
  isTwist?: boolean;
}

/** Content-only — for printed interview scripts (no UI yet). */
export interface InterviewQuestion {
  id: string;
  defaultPrompt: string;
  isRedHerring?: boolean;
}

export interface InterviewAnswer {
  questionId: string;
  promptShown: string;
  answer: string;
  unlockFollowUps?: string[];
}

export interface SuspectInterviewScript {
  suspectId: string;
  promptOverrides: Record<string, string>;
  answers: Record<string, InterviewAnswer>;
  followUps?: Record<string, InterviewAnswer>;
}
