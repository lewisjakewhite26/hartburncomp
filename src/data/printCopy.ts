/** Printable classroom copy — plain prose, no filler. */

export const CASE_OPEN_TITLE = 'Case file opened';

export const CASE_OPEN_NARRATIVE: string[] = [
  'Monday 17 March · St Oakwood Primary · PC-2026-03',
  'Started like any other Monday. Year 6 in, Sports Day kit stacked in the hall, staff room kettle on since eight.',
  'At 3:58pm Mr Thornton found Mr White slumped at his desk in the Year 6 corridor. Mr White had missed afternoon registration. Thornton rang 999. Doctors say someone poisoned him. He is in hospital and he is going to recover, but he was unconscious for hours.',
  'Police think it was the coffee. Mr White filled his blue mug in the staff room at about 11:10, walked back to class, took two sips, and left the mug on the left corner of his desk. He never picked it up again.',
  'Hot drinks get made in the staff room. Shared sugar bowl on the counter. Fridge, kettle, tray of mugs. Forensics photographed everything. Your class gets the paper files first; some photos arrive later in envelopes.',
  'Reception logs who comes in. HR has heights from medicals, fingerprint types from safeguarding training, shoe sizes from the Sports Day order form. Fifteen names on the list. Everyone below gave a statement.',
  'You work in pairs. Your teacher releases clues through the morning, in envelopes or on the board. Cross names off your own copy if you like. After each round the class board is the record that matters.',
  'When a new clue lands, check it against height, fingerprint type, shoe size, and tread on each card. People sound sure of themselves and still get it wrong. Before lunch you will interview a few names and write down who you think did it.',
  'Fifteen people on this list. One of them put something in that mug.',
];

export const PACK_INSTRUCTIONS = {
  heading: 'Using this pack',
  intro:
    'Keep the pages together. Write on your copy, not the whiteboard. When you and your partner agree someone is out, tick Ruled out and scribble why.',
  items: [
    'Read all fifteen before the first clue drops. Note who might have been in the staff room.',
    'New envelope or board clue? Stop. Run it against everyone you have left.',
    'Talk in your pair, then with the class. Your teacher strikes names off the shared board.',
    'Two suspects with the same shoe size? Keep both until something splits them.',
    'You can only interview a few people later. Pick the ones you actually need.',
    'Final accusation: one name, at least two reasons from the evidence. Not just a guess.',
  ],
};

export const FORENSIC_KEY = {
  heading: 'What the boxes on each card mean',
  intro:
    'Your teacher will hand out separate fingerprint and tread cards. Study each one, then circle the matching letter on this sheet.',
  items: [
    {
      label: 'Height',
      detail:
        'From the last school medical. CCTV is useless for faces here but the door frame has markers. If height comes up in a clue, compare the numbers.',
    },
    {
      label: 'Fingerprint',
      detail:
        'Circle one letter: A (arch — ridge goes up and over), L (loop — ridge curls round), or W (whorl — spiral). Your teacher has a separate card showing each person\'s print pattern.',
    },
    {
      label: 'Shoe size',
      detail: 'UK size from the Sports Day kit form. A wet footprint can show size even when you do not know who made it.',
    },
    {
      label: 'Sole tread',
      detail:
        'Circle one letter: W (wave), C (circles), S (stripes), B (blocks), or D (dots). Your teacher has a separate card showing each person\'s sole pattern.',
    },
    {
      label: 'Statement',
      detail:
        'What they told police first time round. Check it against the sign-in book, timetables, and anything else you get later.',
    },
  ],
};

export const COVER_META = {
  caseRef: 'PC-2026-03',
  document: 'Suspect profiles (15)',
  date: 'Monday 17 March, morning of incident',
  classification: 'Class use only — do not take home',
};
