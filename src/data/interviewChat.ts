export type InterviewTone = 'soft' | 'neutral' | 'accusatory';

export type InterviewSuspectId = 'grant' | 'patel';

export interface ToneVariants {
  soft: string;
  neutral: string;
  accusatory: string;
}

export interface InterviewChatTurn {
  id: string;
  topic: string;
  prompts: ToneVariants;
  answer: string;
}

export interface InterviewSuspectProfile {
  id: InterviewSuspectId;
  name: string;
  role: string;
  initials: string;
  onlineLabel: string;
  /** Shown in the opening system message. */
  characterNote: string;
  turns: InterviewChatTurn[];
}

export const INTERVIEW_SUSPECTS: InterviewSuspectProfile[] = [
  {
    id: 'grant',
    name: 'Mr Grant',
    role: 'PE Teacher',
    initials: 'MG',
    onlineLabel: 'Secure channel · subject online',
    characterNote: 'Arrogant, fast-talking, defensive. Treats this interview like a nuisance.',
    turns: [
      {
        id: 'alibi',
        topic: 'Alibi',
        prompts: {
          soft: 'Mr Grant, when you have a moment, could you tell us where you were between eleven and half past?',
          neutral:
            "Mr Grant, let's start with the basics. Where were you between 11:00 and 11:30 this morning?",
          accusatory:
            "Mr Grant. Eleven to eleven thirty. Account for every minute. Now.",
        },
        answer:
          "Look, it's Sports Day week, okay? It's complete chaos. I was in the sports hall from 8:30 straight through. Cones, hurdles, marking the pitch... it's non-stop. I needed some extra equipment around 11:15, so I popped into the staff room for a shortcut to the cupboard. In and out. That's it. Can I go now?",
      },
      {
        id: 'staffroom',
        topic: 'Staff room',
        prompts: {
          soft: 'You mentioned the staff room at about 11:15. Did you go anywhere near the coffee station?',
          neutral: 'You were in the staff room at 11:15. Did you go anywhere near the coffee station?',
          accusatory:
            "You were in the staff room at poison o'clock. Did you touch the coffee, the mugs, or the sugar bowl?",
        },
        answer:
          "I went to the cupboard. Is that a crime? I didn't stop for a brew, I didn't socialize, and I certainly didn't hang around the sugar jar. I don't even like the coffee here; it tastes like burnt rubber. I grabbed my gear and bolted. I was back on the field within two minutes.",
      },
      {
        id: 'cupboard',
        topic: 'The cupboard',
        prompts: {
          soft: 'We checked the PE store cupboards. They were locked all morning. Can you explain why you used the staff room cupboard instead?',
          neutral:
            'We checked the PE store cupboards. They were locked all morning. If you were getting cones, why were you in the staff room cupboard?',
          accusatory:
            'The PE store was locked. You broke into the staff room cupboard instead. Why?',
        },
        answer:
          "I... well, the PE store key was sticking. It wouldn't turn. So, I tried the staff room one. It wasn't locked. It was just... slightly ajar. I didn't think anyone would notice me in there. It's not like I stole anything!",
      },
      {
        id: 'witness',
        topic: 'Witness',
        prompts: {
          soft: 'Is there anyone who can confirm where you were during that half-hour?',
          neutral: 'Who can vouch for your location during that half-hour window?',
          accusatory:
            'Name one person who can prove you were not alone near the staff room corridor.',
        },
        answer:
          "Mr Okafor was out on the field with Year 5. He saw me hauling the hurdles across at 11:00. If you're so desperate for a witness, go ask him. He's right there. I'm sure he'll tell you I was busy enough without worrying about mugs.",
      },
      {
        id: 'forensics',
        topic: 'Forensics',
        prompts: {
          soft: 'We have a wave-tread print on a mat in the staff room, size six. How would you explain that?',
          neutral:
            'We have a wave-tread print on a mat in the staff room, size six. That matches your shoes. Explain.',
          accusatory:
            'Wave tread. Size six. Your shoes. The mat. Explain it before we end this interview.',
        },
        answer:
          "Seriously? My shoes are standard issue from the school supplier. Half the staff has these. And my prints are on file for the DBS check. Of course you're going to find 'matches' if you go looking for them. You're just trying to pin this on the PE guy because it's the easiest path, aren't you?",
      },
      {
        id: 'motive',
        topic: 'Motive',
        prompts: {
          soft: 'Was there anything between you and Mr White we should know about?',
          neutral: "Mr White got the Sports Day organizer role, didn't he? How did that make you feel?",
          accusatory:
            'You wanted Sports Day. White got it. That gives you a reason to hurt him.',
        },
        answer:
          "It's frustrating. I've got three years of seniority on him. But I'm a professional, alright? I don't settle my grievances by... what, poisoning the decaf? That's ridiculous.",
      },
    ],
  },
  {
    id: 'patel',
    name: 'Mrs Patel',
    role: 'Dinner Lady',
    initials: 'MP',
    onlineLabel: 'Secure channel · subject online',
    characterNote: 'Breathless, hardworking, juggling five things at once. Very matter-of-fact.',
    turns: [
      {
        id: 'alibi',
        topic: 'Alibi',
        prompts: {
          soft: 'Mrs Patel, could you walk us through where you were from eleven to half past?',
          neutral:
            'Mrs Patel, walk us through your morning. Where were you from 11:00 to 11:30?',
          accusatory:
            'Mrs Patel. Eleven to eleven thirty. Where were you. No gaps.',
        },
        answer:
          "Oh, love, don't ask! It's been hectic since half-past eight. Gravy, peeling potatoes, veg prep... Chef Dave has been breathing down my neck since the moment I clocked in. We didn't stop once. Ask him. He had me scrubbing the trays until the lunch bell rang.",
      },
      {
        id: 'staffroom',
        topic: 'Staff room',
        prompts: {
          soft: 'Did you go into the staff room at any point before lunch?',
          neutral: 'Did you enter the staff room at any point during that time?',
          accusatory:
            'The poisoned mug was in the staff room. Did you walk through there or touch anything on the counter?',
        },
        answer:
          "Not until 12:15, and that was just to grab a clean tray off the trolley! I walked in, saw the mess, grabbed my tray, and got out. I didn't touch the sugar bowl, I didn't touch the coffee machine, and I certainly didn't touch his mug. I had a lunch queue forming in ten minutes. I'm not spending my time loitering.",
      },
      {
        id: 'witness',
        topic: 'Witness',
        prompts: {
          soft: 'Who can confirm you were in the kitchen that morning?',
          neutral: 'Who saw you in the kitchen during that time?',
          accusatory:
            'If Chef Dave was not watching you every second, who else can prove you never left?',
        },
        answer:
          'Chef Dave, obviously. And Sarah, the kitchen volunteer. She was on duty too. Check the dinner order sheet; my name is on the prep list for every single item this morning. We were in there together the whole time.',
      },
      {
        id: 'forensics',
        topic: 'Forensics',
        prompts: {
          soft: 'We found a wave-tread print, size six, on the staff room mat. Can you help us understand that?',
          neutral:
            'We found a wave-tread print, size six, on the staff room mat. Your shoes match.',
          accusatory:
            'Wave tread. Size six. Your shoes. The mat. Explain it.',
        },
        answer:
          "Well, of course they do! I wear size six work shoes. The school buys them for the whole kitchen team. Every one of us has the same soles. If you find a 'wave' print on a mat in this school, you'll find it in every single corridor. That's not evidence. That's just housekeeping.",
      },
      {
        id: 'motive',
        topic: 'Motive',
        prompts: {
          soft: 'Did you and Mr White ever have any disagreements?',
          neutral: 'Did you and Mr White ever have any disagreements?',
          accusatory: 'Give us one reason you would not have wanted Mr White out of the way.',
        },
        answer:
          "Mr White? No, he was alright. Always said 'please' and 'thank you' at the hatch. He was a polite man. Why would I want to upset the one teacher who actually remembers his manners? I've got better things to do than start trouble.",
      },
    ],
  },
];

export const TONE_LABELS: Record<InterviewTone, string> = {
  soft: 'Ask gently',
  neutral: 'Ask plainly',
  accusatory: 'Press hard',
};

export function getInterviewSuspect(id: InterviewSuspectId): InterviewSuspectProfile {
  const profile = INTERVIEW_SUSPECTS.find((s) => s.id === id);
  if (!profile) {
    throw new Error(`Unknown interview suspect: ${id}`);
  }
  return profile;
}
