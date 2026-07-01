import type { Printable } from './printables';

export type PrintableId = Printable['id'];

export const HANDOUT_GUIDE: Record<
  PrintableId,
  { order: number; total: number; instruction: string }
> = {
  'suspect-bios': {
    order: 1,
    total: 6,
    instruction: 'After introducing the scenario. One pack per pair.',
  },
  'suspect-forensics': {
    order: 2,
    total: 6,
    instruction:
      'Straight after the suspect bios. Students match prints and treads onto their sheets.',
  },
  'task-ledger': {
    order: 3,
    total: 6,
    instruction: 'Before the first evidence release (sign-in ledger). iPad code: 5374.',
  },
  'task-fingerprint': {
    order: 4,
    total: 6,
    instruction:
      'After sign-in evidence, before the fingerprint release. iPad code: 7859.',
  },
  'task-footprint': {
    order: 5,
    total: 6,
    instruction:
      'After fingerprint evidence, before the footprint release. iPad code: 1991.',
  },
  'accusation-form': {
    order: 6,
    total: 6,
    instruction: 'At debrief. Collect completed jury declarations.',
  },
};

const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'] as const;

export function handoutOrdinal(order: number): string {
  return ORDINALS[order - 1] ?? `${order}th`;
}
