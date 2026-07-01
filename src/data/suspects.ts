import type { Suspect } from '../types/investigation';
import { parseHeightInches } from '../lib/forensicMatch';

function suspect(
  data: Omit<Suspect, 'heightInches'> & { heightInches?: number },
): Suspect {
  return {
    ...data,
    heightInches: data.heightInches ?? parseHeightInches(data.heightLabel),
  };
}

/** Poisoned coffee — 15 suspects. Guilty: Mr Grant. Final five marked `finalFive`; two `interviewStandout`. */
export const SUSPECTS: Suspect[] = [
  suspect({
    id: 'grant',
    name: 'Mr Grant',
    role: 'PE Teacher',
    heightBand: 'medium',
    heightLabel: "5'8\"",
    fingerprint: 'arch',
    shoeSize: 6,
    tread: 'wave',
    statement:
      'Sports hall all morning. Hurdles, cones, the lot. I nipped to the staff room once for spare cones from the cupboard. Two minutes, in and out. I did not touch White\'s mug. Year 5 saw me crossing the playground with a stack of cones around eleven.',
    isGuilty: true,
    motive: 'Wanted to run Sports Day. Mr White got it instead.',
    finalFive: true,
    interviewStandout: true,
    staffroomAccess: true,
  }),
  suspect({
    id: 'patel',
    name: 'Mrs Patel',
    role: 'Dinner Lady',
    heightBand: 'short',
    heightLabel: "5'1\"",
    fingerprint: 'arch',
    shoeSize: 6,
    tread: 'wave',
    statement:
      'Kitchen since half eight. Chef Dave was with me the whole time, prep for lunch. I went to reception once for a delivery. I did not go in the staff room. I do not drink coffee on shift.',
    finalFive: true,
    interviewStandout: true,
    staffroomAccess: true,
  }),
  suspect({
    id: 'sharpe',
    name: 'Mrs Sharpe',
    role: 'Deputy Head',
    heightBand: 'medium',
    heightLabel: "5'6\"",
    fingerprint: 'whorl',
    shoeSize: 7,
    tread: 'stripe',
    statement:
      'Governors in the head\'s office from nine. Mrs Adebayo took minutes. We did not leave except Mr Blake took a phone call in the corridor. I was not near Year 6 and I was not in the staff room.',
    staffroomAccess: true,
  }),
  suspect({
    id: 'frost',
    name: 'Miss Frost',
    role: 'Supply Teacher',
    heightBand: 'medium',
    heightLabel: "5'5\"",
    fingerprint: 'loop',
    shoeSize: 6,
    tread: 'stripe',
    statement:
      'Year 3, Room 8. Their teacher was off sick. Register at nine oh five, taught until break. I bring a flask. Nobody showed me where the staff room is.',
    finalFive: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'jamie',
    name: 'Jamie',
    role: 'Year 6 Work Experience Helper',
    heightBand: 'short',
    heightLabel: "4'10\"",
    fingerprint: 'loop',
    shoeSize: 4,
    tread: 'dot',
    statement:
      'Library all morning with Mrs Hughes. Shelving, scanning, boring but I stayed put. Visitor badge from reception. I did not go upstairs. I heard about Mr White after three when everyone was talking in the corridor.',
    staffroomAccess: false,
  }),
  suspect({
    id: 'thornton',
    name: 'Mr Thornton',
    role: 'Caretaker',
    heightBand: 'tall',
    heightLabel: "6'0\"",
    fingerprint: 'whorl',
    shoeSize: 10,
    tread: 'block',
    statement:
      'Found Mr White at 3:58 and rang 999. Before that, boiler room fixing a leak. Key fob says I went in at 9:12. I walked past the staff room door once for tools. Did not go in. I liked Mr White.',
    staffroomAccess: true,
  }),
  suspect({
    id: 'chen',
    name: 'Mrs Chen',
    role: 'Year 6 TA',
    heightBand: 'short',
    heightLabel: "5'2\"",
    fingerprint: 'loop',
    shoeSize: 5,
    tread: 'wave',
    statement:
      'Lower maths in 6B while Mr White taught next door. At break I saw him come back with his blue mug. He looked fine. I made tea at ten fifteen in the little kitchenette on our floor, not the staff room.',
    finalFive: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'okafor',
    name: 'Mr Okafor',
    role: 'Year 5 Teacher',
    heightBand: 'tall',
    heightLabel: "6'1\"",
    fingerprint: 'loop',
    shoeSize: 9,
    tread: 'stripe',
    statement:
      'Year 5 on the field till quarter to twelve. Cross-country for Sports Day. Thirty kids, two parents. I was outside. Grant grabbed cones from the storeroom while we were running. That is the only colleague I clocked.',
    staffroomAccess: false,
  }),
  suspect({
    id: 'blake',
    name: 'Mr Blake',
    role: 'Headteacher',
    heightBand: 'tall',
    heightLabel: "5'11\"",
    fingerprint: 'whorl',
    shoeSize: 8,
    tread: 'stripe',
    statement:
      'In my office with Mrs Sharpe and governors till lunch. Jane at reception logged the visitors. I stepped out once for a call, five minutes. No tea today because my PA was off sick.',
    staffroomAccess: true,
  }),
  suspect({
    id: 'morrison',
    name: 'Jane Morrison',
    role: 'Office Admin',
    heightBand: 'short',
    heightLabel: "5'0\"",
    fingerprint: 'loop',
    shoeSize: 4,
    tread: 'dot',
    statement:
      'Reception from 8:15. Late children, parcels, phones. I run the sign-in book the police copied. Photocopier at half ten. Staff room is down the hall but I only go at lunch.',
    finalFive: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'walsh',
    name: 'Mrs Walsh',
    role: 'Year 4 Teacher',
    heightBand: 'medium',
    heightLabel: "5'7\"",
    fingerprint: 'loop',
    shoeSize: 6,
    tread: 'wave',
    statement:
      'County training all morning. Register has my signature at nine and eleven at the training centre. I was not in the building. Tom Ellis emailed me slides at lunch because I missed briefing.',
    clearedBySignIn: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'khan',
    name: 'Mr Khan',
    role: 'Maths Teacher',
    heightBand: 'medium',
    heightLabel: "5'9\"",
    fingerprint: 'whorl',
    shoeSize: 8,
    tread: 'block',
    statement:
      'Numeracy course off site. Authority booked it months ago. Back at 1:20, badge scan proves it. Annoyed to miss Sports Day planning but I was not here when the coffee went on his desk.',
    clearedBySignIn: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'lane',
    name: 'Sophie Lane',
    role: 'Nursery TA',
    heightBand: 'short',
    heightLabel: "5'0\"",
    fingerprint: 'whorl',
    shoeSize: 5,
    tread: 'circle',
    statement:
      'Rang in sick at eight oh two. Chest infection. In bed. Partner will tell you. Pharmacy receipt at twenty to twelve in town if you want it. Not on site since Friday.',
    clearedBySignIn: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'okonkwo',
    name: 'Grace Okonkwo',
    role: 'Cleaner',
    heightBand: 'medium',
    heightLabel: "5'5\"",
    fingerprint: 'loop',
    shoeSize: 7,
    tread: 'block',
    statement:
      'Shift starts at three when the kids leave. Agency app shows 14:58 at the gate. I clean the staff room every evening so I know the layout, but I was at home at eleven having lunch.',
    clearedBySignIn: true,
    staffroomAccess: false,
  }),
  suspect({
    id: 'ellis',
    name: 'Tom Ellis',
    role: 'IT Technician',
    heightBand: 'medium',
    heightLabel: "5'8\"",
    fingerprint: 'loop',
    shoeSize: 9,
    tread: 'stripe',
    statement:
      'Server migration from home till noon. Logged in 9:03 from my house, IT have the IP. Badge in at 12:04. Teams call with Mr White at 8:50 about passwords. He sounded normal.',
    clearedBySignIn: true,
    staffroomAccess: false,
  }),
];

export const FINAL_FIVE_IDS = SUSPECTS.filter((s) => s.finalFive).map((s) => s.id);

export const INTERVIEW_STANDOUT_IDS = SUSPECTS.filter((s) => s.interviewStandout).map(
  (s) => s.id,
);

export function getSuspect(id: string): Suspect | undefined {
  return SUSPECTS.find((s) => s.id === id);
}
