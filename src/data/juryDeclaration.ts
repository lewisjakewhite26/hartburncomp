/** Printable jury verdict hand-in — debrief stage. */

export const JURY_DECLARATION = {
  title: 'Jury declaration',
  subtitle: 'Poisoned coffee investigation · St Oakwood Primary',
  intro:
    'Complete this form as a pair before the class debrief. You must name one suspect and give at least two reasons from the evidence you collected during the morning.',
  verdictLead: 'We, the Jury, have found',
  verdictMiddle: 'guilty of the crime of poisoning Mr White\'s coffee.',
  verdictReasonLead: 'We have reached this verdict because of this evidence:',
  evidenceLines: 5,
  signOff: 'Signed on behalf of the jury',
  fields: {
    group: 'Group number',
    accused: 'Name of accused',
    memberOne: 'Juror 1 (print name)',
    memberTwo: 'Juror 2 (print name)',
  },
} as const;
