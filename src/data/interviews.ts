import type { InterviewQuestion, SuspectInterviewScript } from '../types/investigation';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'whereabouts',
    defaultPrompt: 'Where were you between 11am and 1pm?',
  },
  {
    id: 'staffroom',
    defaultPrompt: 'Did you go near the staff room this morning?',
  },
  {
    id: 'witness',
    defaultPrompt: 'Who can confirm your whereabouts?',
  },
  {
    id: 'evasive_sports',
    defaultPrompt: 'Do you know anything about the sports cupboard keys?',
    isRedHerring: true,
  },
];

/** Grant-only follow-up after staffroom/cones answer */
export const GRANT_FOLLOWUP_ID = 'grant_cupboard';

export const INTERVIEW_SCRIPTS: SuspectInterviewScript[] = [
  {
    suspectId: 'grant',
    promptOverrides: {
      whereabouts: 'Can you walk us through your morning — especially before lunch?',
      staffroom: 'You mentioned cones — did you enter the staff room?',
      witness: 'Who saw you in the sports hall?',
      evasive_sports: 'Isn\'t it true you wanted to run Sports Day this year?',
    },
    answers: {
      whereabouts: {
        questionId: 'whereabouts',
        promptShown: 'Can you walk us through your morning — especially before lunch?',
        answer:
          'Sports hall setup all morning. I grabbed cones from the staff room cupboard around 11:15 — quick trip.',
        unlockFollowUps: [GRANT_FOLLOWUP_ID],
      },
      staffroom: {
        questionId: 'staffroom',
        promptShown: 'You mentioned cones — did you enter the staff room?',
        answer:
          'Yes — in and out for cones. Two minutes, maybe. Sugar jar is on the counter there; I didn\'t touch it.',
        unlockFollowUps: [GRANT_FOLLOWUP_ID],
      },
      witness: {
        questionId: 'witness',
        promptShown: 'Who saw you in the sports hall?',
        answer:
          'Year 5 were on the field with Mr Okafor. No one in the hall until 1pm club setup.',
      },
      evasive_sports: {
        questionId: 'evasive_sports',
        promptShown: 'Isn\'t it true you wanted to run Sports Day this year?',
        answer:
          'Look, Mr White got Sports Day. I was not happy. That does not mean I poisoned anyone.',
      },
    },
    followUps: {
      [GRANT_FOLLOWUP_ID]: {
        questionId: GRANT_FOLLOWUP_ID,
        promptShown: 'The PE cupboard was locked until break — but the staff room cupboard was open all morning, wasn\'t it?',
        answer:
          'It should have been locked. I went in before break for cones. I did not think anyone would notice.',
      },
    },
  },
  {
    suspectId: 'patel',
    promptOverrides: {
      whereabouts: 'Where were you in the hour before lunch?',
      staffroom: 'Did you carry anything through the staff room?',
      witness: 'Who can vouch for you in the kitchen?',
    },
    answers: {
      whereabouts: {
        questionId: 'whereabouts',
        promptShown: 'Where were you in the hour before lunch?',
        answer: 'Kitchen prep — veg, gravy, the lot. Chef Dave was with me.',
      },
      staffroom: {
        questionId: 'staffroom',
        promptShown: 'Did you carry anything through the staff room?',
        answer:
          'Cup collection at twelve fifteen — I walked past the counter. I did not touch the sugar bowl. Chef Dave had me back in the kitchen by eleven thirty.',
      },
      witness: {
        questionId: 'witness',
        promptShown: 'Who can vouch for you in the kitchen?',
        answer: 'Chef Dave and the kitchen volunteer parent.',
      },
      evasive_sports: {
        questionId: 'evasive_sports',
        promptShown: 'Do you know anything about the sports cupboard keys?',
        answer:
          'No idea. I was on prep in the kitchen when Mr White had his coffee. Ask Chef Dave.',
      },
    },
  },
  {
    suspectId: 'sharpe',
    promptOverrides: {
      whereabouts: 'Can you confirm your movements before 12:30?',
      staffroom: 'Did your governor meeting take you past the staff room?',
      witness: 'Who attended the meeting with you?',
    },
    answers: {
      whereabouts: {
        questionId: 'whereabouts',
        promptShown: 'Can you confirm your movements before 12:30?',
        answer: 'Head\'s office with governors. Mrs Adebayo took minutes.',
      },
      staffroom: {
        questionId: 'staffroom',
        promptShown: 'Did your governor meeting take you past the staff room?',
        answer: 'We walked past the corridor once for refreshments — I didn\'t enter.',
      },
      witness: {
        questionId: 'witness',
        promptShown: 'Who attended the meeting with you?',
        answer: 'Mrs Adebayo and two governors. Ask them.',
      },
      evasive_sports: {
        questionId: 'evasive_sports',
        promptShown: 'Do you know anything about the sports cupboard keys?',
        answer: 'That\'s a matter for the PE department.',
      },
    },
  },
  {
    suspectId: 'frost',
    promptOverrides: {
      whereabouts: 'Where were you teaching this morning?',
      staffroom: 'Did you use the staff room kettle?',
      witness: 'Which class can confirm you were in Room 8?',
    },
    answers: {
      whereabouts: {
        questionId: 'whereabouts',
        promptShown: 'Where were you teaching this morning?',
        answer: 'Year 3, Room 8. Register and work on the board proves it.',
      },
      staffroom: {
        questionId: 'staffroom',
        promptShown: 'Did you use the staff room kettle?',
        answer: 'No — I bring a flask as supply staff.',
      },
      witness: {
        questionId: 'witness',
        promptShown: 'Which class can confirm you were in Room 8?',
        answer: 'All of Year 3. Talk to any of them.',
      },
      evasive_sports: {
        questionId: 'evasive_sports',
        promptShown: 'Do you know anything about the sports cupboard keys?',
        answer: 'Sorry, I genuinely don\'t remember.',
      },
    },
  },
  {
    suspectId: 'jamie',
    promptOverrides: {
      whereabouts: 'What were you doing before lunch on work experience?',
      staffroom: 'Did you go upstairs at all?',
      witness: 'Who supervised you in the library?',
    },
    answers: {
      whereabouts: {
        questionId: 'whereabouts',
        promptShown: 'What were you doing before lunch on work experience?',
        answer: 'Shelving books in the library. Mrs Hughes signed me in.',
      },
      staffroom: {
        questionId: 'staffroom',
        promptShown: 'Did you go upstairs at all?',
        answer: 'No — library is ground floor all morning.',
      },
      witness: {
        questionId: 'witness',
        promptShown: 'Who supervised you in the library?',
        answer: 'Mrs Hughes, the librarian.',
      },
      evasive_sports: {
        questionId: 'evasive_sports',
        promptShown: 'Do you know anything about the sports cupboard keys?',
        answer: 'I don\'t… I wasn\'t near PE.',
      },
    },
  },
];

export function scriptForSuspect(suspectId: string): SuspectInterviewScript | undefined {
  return INTERVIEW_SCRIPTS.find((s) => s.suspectId === suspectId);
}
