/** Printable task worksheets — answers form 4-digit iPad codes. */

export const TASK_CODE_LENGTH = 4;

export const SPAG_TASK = {
  id: 'task-ledger',
  title: 'Task 1 — Statement check',
  subtitle: 'English · SPAG analysis',
  suspectName: 'Mr Grant',
  suspectRole: 'PE Teacher',
  unlockCode: '5374',
  intro:
    'Detectives noticed errors in Mr Grant\'s written statement. Read all four paragraphs carefully. Count each category below — your four answers make the access code (one digit each, in order).',
  counts: [
    {
      label: 'Missed capital letters',
      hint: 'How many words should start with a capital letter but do not?',
      digitIndex: 0,
      answer: 5,
    },
    {
      label: 'Misspelled words',
      hint: 'How many words are spelled incorrectly?',
      digitIndex: 1,
      answer: 3,
    },
    {
      label: 'Adjectives',
      hint: 'How many adjectives appear in the whole statement?',
      digitIndex: 2,
      answer: 7,
    },
    {
      label: 'Pronouns',
      hint: 'How many pronouns appear in the whole statement? (e.g. I, me, we, he, she, they, it)',
      digitIndex: 3,
      answer: 4,
    },
  ],
  paragraphs: [
    'i was in the sports hall all monday morning with year five. we set up hurdles and bright orange cones becuase sports day was soon.',
    'at about eleven i nipped to the staff room for spare cones. The visit was a quick trip. chef dave saw me carring a stack from storage.',
    'The statement to police: never touched Mr White\'s blue mug. The gym stayed full all morning.',
    'Sports day organisation went to Mr White, not the PE department. Staff did not put somthing in the hot coffee.',
  ],
} as const;

export const MATHS_TASK = {
  id: 'task-fingerprint',
  title: 'Task 2 — Fingerprint counts',
  subtitle: 'Maths · Algebra',
  unlockCode: '7859',
  intro:
    'Each question is tagged with a shape sticker. The questions are in a mixed order — the code at the bottom uses a different shape order. Solve every equation, then match each digit to its shape to build the iPad access code.',
  questions: [
    {
      shape: 'circle' as const,
      equation: 'a + 8 = 15',
      prompt: 'Find a.',
      answer: 7,
    },
    {
      shape: 'triangle' as const,
      equation: '4b = 32',
      prompt: 'Find b.',
      answer: 8,
    },
    {
      shape: 'square' as const,
      equation: '5c − 3 = 22',
      prompt: 'Find c.',
      answer: 5,
    },
    {
      shape: 'star' as const,
      equation: '18 ÷ d = 2',
      prompt: 'Find d.',
      answer: 9,
    },
  ],
} as const;

/** iPad code digit order (circle → 7, triangle → 8, square → 5, star → 9 → 7859). */
export const MATHS_TASK_CODE_ORDER = ['circle', 'triangle', 'square', 'star'] as const;

export type MathsTaskShape = (typeof MATHS_TASK_CODE_ORDER)[number];

/** Question order on the worksheet — scrambled (not reverse of code order). */
export const MATHS_TASK_DISPLAY_ORDER = ['square', 'star', 'triangle', 'circle'] as const;

type MathsQuestion = (typeof MATHS_TASK.questions)[number];

function mathsQuestionsInOrder(order: readonly MathsTaskShape[]): MathsQuestion[] {
  const byShape = new Map(MATHS_TASK.questions.map((q) => [q.shape, q]));
  return order.map((shape) => byShape.get(shape)!);
}

export const MATHS_TASK_QUESTIONS_DISPLAY = mathsQuestionsInOrder(MATHS_TASK_DISPLAY_ORDER);
export const MATHS_TASK_QUESTIONS_CODE = mathsQuestionsInOrder(MATHS_TASK_CODE_ORDER);

const MATHS_SHAPE_LABELS: Record<MathsTaskShape, string> = {
  circle: 'circle',
  triangle: 'triangle',
  square: 'square',
  star: 'star',
};

export function mathsTaskCodeOrderHint() {
  return MATHS_TASK_CODE_ORDER.map((shape) => MATHS_SHAPE_LABELS[shape]).join(' → ');
}

/** Case date for age → birth year (34 on 17 Mar 2026, birthday 26 Jul → born 1991). */
export const CASE_YEAR = 2026;

export const VICTIM_BIO_TASK = {
  id: 'task-footprint',
  title: 'Task 3 — Victim profile',
  subtitle: 'Case file · Mr White',
  unlockCode: '1991',
  intro:
    'Before the next evidence release, read the victim profile below. HR pulled this from staff records after Monday\'s incident. Look carefully — one detail unlocks the iPad code.',
  codePrompt:
    'The access code is the year Mr White was born. Find his age in the profile. The case file is dated 17 March 2026. His birthday is 26 July — think about whether he has already had his birthday this year.',
  ageOnFile: 34,
  birthday: '26 July',
  facts: [
    { label: 'Name', value: 'Mr James White' },
    { label: 'Role', value: 'Year 6 class teacher' },
    { label: 'Height', value: '5\'11"' },
    { label: 'Birthday', value: '26 July' },
    { label: 'Known for', value: 'Football club, strong coffee, blue desk mug' },
  ],
  paragraphs: [
    'Colleagues say Mr White is hard to miss on a Monday morning — football boots in one hand, blue coffee mug in the other. He runs the Year 6 football club on Tuesdays and still plays five-a-side with other staff on Fridays. At five foot eleven he is tall enough to reach the top shelf in the staff room cupboard without standing on a chair.',
    'He loves coffee. Proper coffee, strong — and he takes sugar every single time, no exceptions. He always has two sugars from the staff room sugar bowl. After school he relaxes on his Xbox with his nephew — usually a football game or something they can play together on the sofa.',
    'Mr White has taught at St Oakwood since 2019. The school nurse\'s last medical report lists his height as five foot eleven, his birthday as 26 July, and his age as 34. Year 6 made him a card at the summer fair when he turned thirty-four.',
    'On Monday 17 March he filled his mug in the staff room at about 11:10, walked back to the Year 6 corridor, and left the mug on the left corner of his desk. That was the last normal moment before he collapsed later that afternoon.',
  ],
} as const;
