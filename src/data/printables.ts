export const PRINTABLES = [
  {
    id: 'suspect-bios',
    title: 'Suspect bio sheet',
    description: 'Fifteen profiles: height, shoe size, statements. Circle A/L/W and tread letters.',
    handoutWhen: 'After briefing (release 1)',
    path: '/print/suspects',
    available: true,
  },
  {
    id: 'suspect-forensics',
    title: 'Forensic reference cards',
    description: 'Fingerprint and tread visuals for all fifteen — hand out separately.',
    handoutWhen: 'With suspect bios (teacher distributes)',
    path: '/print/forensics',
    available: true,
  },
  {
    id: 'task-ledger',
    title: 'Task 1 — statement check (SPAG)',
    description:
      'English. Count missed capitals, misspellings, adjectives, and pronouns in Mr Grant\'s statement. Code: 5374.',
    handoutWhen: 'Before release 2',
    path: '/print/task/spag',
    available: true,
  },
  {
    id: 'task-fingerprint',
    title: 'Task 2 — fingerprint counts (algebra)',
    description: 'Maths. Four Y5/6 equations — match digits to shapes for code 7859.',
    handoutWhen: 'Before release 3',
    path: '/print/task/maths',
    available: true,
  },
  {
    id: 'task-footprint',
    title: 'Task 3 — victim profile (Mr White)',
    description:
      'Read the victim bio. Find his age, work out the year he was born (case dated 17 March 2026, birthday 26 July). Code: 1991.',
    handoutWhen: 'Before release 4',
    path: '/print/task/victim',
    available: true,
  },
  {
    id: 'accusation-form',
    title: 'Jury declaration',
    description:
      'Final verdict hand-in: name the guilty party and list the evidence that supports your decision.',
    handoutWhen: 'Release 7 — debrief',
    path: '/print/jury',
    available: true,
  },
] as const;

export const FULL_PRINT_PACK_PATH = '/print/all';

export type Printable = (typeof PRINTABLES)[number];

export function openPrintable(path: string) {
  const url = `${window.location.origin}${path}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
