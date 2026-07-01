import { FINAL_FIVE_IDS, getSuspect } from './suspects';

/** 0–100 probabilistic stack scores for the final five (Ultra AI report). */
export const CSI_MATCH_SCORES: Record<string, number> = {
  grant: 94,
  patel: 89,
  chen: 47,
  frost: 31,
  morrison: 14,
};

export const CSI_MATCH_INTRO =
  'CSI have run a brand-new Ultra AI tool across every clue so far — sign-in, mug print, mat print, CCTV height, and shoe data.\n\nIt does not name a guilty party. It scores how well each remaining subject fits the evidence stack.\n\nRed = weak match · Green = strong match\n\nUse this with your paper files. The AI can be wrong — but it shows who is worth interviewing.';

export function csiMatchRows() {
  return FINAL_FIVE_IDS.map((id) => {
    const suspect = getSuspect(id);
    return {
      suspectId: id,
      name: suspect?.name ?? id,
      role: suspect?.role ?? '',
      score: CSI_MATCH_SCORES[id] ?? 0,
    };
  });
}

export type CsiMatchRow = ReturnType<typeof csiMatchRows>[number];

export function shuffleSuspectIds(ids: readonly string[]): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function csiMatchRowsInOrder(order: readonly string[]): CsiMatchRow[] {
  const byId = new Map(csiMatchRows().map((row) => [row.suspectId, row]));
  return order.map((id) => byId.get(id)).filter((row): row is CsiMatchRow => row !== undefined);
}

/** Seconds for each bar fill in the dramatic sequential reveal. */
export const CSI_BAR_FILL_SECONDS = 2.2;

export function scoreBarColor(score: number): string {
  if (score >= 75) return '#22c55e';
  if (score >= 50) return '#eab308';
  if (score >= 30) return '#f97316';
  return '#ef4444';
}

export function scoreBarGradient(score: number): string {
  const end = scoreBarColor(score);
  return `linear-gradient(90deg, #ef4444 0%, #f97316 35%, #eab308 65%, ${end} 100%)`;
}
