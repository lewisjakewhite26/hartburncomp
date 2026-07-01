import type { EvidenceItem, LessonStage } from '../types/investigation';

export const LESSON_STAGES: LessonStage[] = [
  {
    id: 'pending',
    title: 'Stand by',
    teacherCue: '',
    displayBody:
      'Waiting to start.\n\nEight groups on paper. Clues come from this board as the morning goes on.',
  },
  {
    id: 'briefing',
    title: 'Briefing — poisoned coffee',
    teacherCue: 'Read aloud. Check everyone has the paper suspect list.',
    displayBody:
      'CASE OPEN\n\nMonday 17 March · St Oakwood Primary\n\nIt started like any other Monday. Year 6 were in, Sports Day kit was stacked in the hall, and the staff room kettle had been on since eight.\n\nMr White filled his blue mug in the staff room at about 11:10. He walked back to the Year 6 corridor, took two sips at his desk, and left the mug on the left corner. He never picked it up again.\n\nBy afternoon something was wrong. He missed registration. His class waited. At 3:58pm Mr Thornton found him slumped over his books and called the police.\n\nDoctors say someone poisoned the coffee. Mr White is in hospital. He will recover, but he was unconscious for hours.\n\nPolice sealed the staff room. Forensics photographed the kettle, the mugs, and the shared sugar bowl on the counter. Hot drinks get made in there every day. Anyone with access could have reached that mug.\n\nReception logs who comes in. HR has heights from medicals, fingerprint types from safeguarding training, and shoe sizes from the Sports Day order form.\n\nFifteen staff were in or around the building this morning. You have their paper files. One of them put something in that mug.\n\nWork in pairs. Rule people out as the clues arrive. Cross names off your copy. Talk it through with the class. Before lunch you will interview a few names and decide who you think did it.',
  },
  {
    id: 'evidence_signin',
    title: 'Evidence — sign-in ledger',
    teacherCue: 'SPAG task → iPad code 5374 → ledger envelope. Who was NOT on site? Archive ~5.',
    displayBody: '',
  },
  {
    id: 'evidence_fingerprint',
    title: 'Evidence — fingerprint report',
    teacherCue: 'Algebra task → code 7859 → next envelope. NOT whorl only — archive ~3. Do not narrow to arch yet.',
    displayBody: '',
  },
  {
    id: 'evidence_footprint',
    title: 'Evidence — footprint and tread',
    teacherCue: 'Victim profile task → code 1991 → footprint evidence. Class stacks all clues on remaining names — archive to final five. Do not name who to interview.',
    displayBody: '',
  },
  {
    id: 'evidence_csi',
    title: 'Evidence — Ultra AI stack report',
    teacherCue: 'Release CSI AI bars for the final five. Two near green — class picks two to interview. No code needed.',
    displayBody: '',
  },
  {
    id: 'interviews',
    title: 'Interviews — pick two',
    teacherCue: 'Class picks two on the board. Run those interviews your way.',
    displayBody: '',
  },
  {
    id: 'twist_sugar',
    title: 'New evidence',
    teacherCue: 'Play the alert. Sugar-bowl envelope. Archived names stay archived.',
    displayBody: '',
    isTwist: true,
  },
  {
    id: 'debrief',
    title: 'Debrief and reveal',
    teacherCue: 'Collect accusations. Reveal Grant and the evidence trail. Case summary handout.',
    displayBody: '',
  },
];

export const EVIDENCE: EvidenceItem[] = [
  {
    id: 'signin_ledger',
    title: 'Reception sign-in ledger (extract)',
    summary: 'Who entered before 12:00.',
    unlockCode: '5374',
    releaseStage: 'evidence_signin',
    content:
      'NOT ON SITE before 12:00:\n• Mrs Walsh — county training\n• Mr Khan — external course\n• Sophie Lane — sick call, 8am\n• Grace Okonkwo — shift starts 15:00\n• Tom Ellis — working remote until 12:00 (badge scan 12:04)\n\nEveryone else on the list signed in before 9:30.',
  },
  {
    id: 'fingerprint_report',
    title: 'Fingerprint analysis — coffee mug',
    summary: 'Partial print on the handle.',
    unlockCode: '7859',
    releaseStage: 'evidence_fingerprint',
    content:
      'Partial print on the mug handle.\n\nRidge detail is smudged. Analysts ruled OUT a whorl — no spiral centre visible.\n\nCould still be arch or loop. Not enough to pick between them yet.\n\nCross off anyone with a clear WHORL on your files.',
  },
  {
    id: 'footprint_scene',
    title: 'Footprint — staff room mat',
    summary: 'Wet print, photographed 11:20am.',
    unlockCode: '1991',
    releaseStage: 'evidence_footprint',
    content:
      'Staff room mat, 11:20am:\n• Sole tread: WAVE\n• Shoe size: smudged — forensic team read it as UK 6 (might be wrong)\n• CCTV still 11:18am: figure under 5\'11" (5\'11" exactly does not count)\n\nStack this against your files. For each name still on the board, check:\n\n1. Were they on site before noon?\n2. Mug print — not a whorl?\n3. Mat print — wave tread?\n4. Shoe size — UK 6?\n5. Height — under 5\'11"?\n\nCross off anyone who fails a clue. Who is left when all five checks pass?',
  },
  {
    id: 'csi_ai_stack',
    title: 'CSI — Ultra AI evidence stack',
    summary: 'Probabilistic match scores for the final five subjects.',
    unlockCode: 'AUTO',
    releaseStage: 'evidence_csi',
    content:
      'CSI have run a brand-new Ultra AI tool across every clue so far — sign-in, mug print, mat print, CCTV height, and shoe data.\n\nIt does not name a guilty party. It scores how well each remaining subject fits the evidence stack.\n\nRed = weak match · Green = strong match\n\nUse this with your paper files. The AI can be wrong — but it shows who is worth interviewing.',
  },
  {
    id: 'sugar_bowl_photo',
    title: 'Sugar bowl residue',
    summary: 'Green residue on the staff room spoon.',
    unlockCode: 'SUGAR-BOWL',
    releaseStage: 'twist_sugar',
    content:
      'Teaspoon in the staff room sugar bowl: bright green crystals. Same stuff as in Mr White\'s mug.\n\nPoison probably went in the shared sugar, not the milk.\n\nWho had staff room access this morning?',
  },
];

export function evidenceForStage(stageId: string): EvidenceItem | undefined {
  return EVIDENCE.find((e) => e.releaseStage === stageId);
}

export function stageByIndex(index: number): LessonStage | undefined {
  return LESSON_STAGES[index];
}

export function releasedEvidence(upToReleasedIndex: number): EvidenceItem[] {
  const releasedStageIds = new Set(
    LESSON_STAGES.slice(0, upToReleasedIndex + 1).map((s) => s.id),
  );
  return EVIDENCE.filter((e) => releasedStageIds.has(e.releaseStage));
}
