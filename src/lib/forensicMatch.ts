import type { Suspect } from '../types/investigation';

/** CCTV figure height limit: strictly **under** 5'11" (71" exactly is excluded). */
export const CCTV_HEIGHT_LIMIT_INCHES = 71;

export const SCENE_FOOTPRINT_TREAD = 'wave' as const;
export const SCENE_FOOTPRINT_SHOE_SIZE = 6;

export function parseHeightInches(heightLabel: string): number {
  const match = heightLabel.match(/(\d+)'(\d+)"/);
  if (!match) return 0;
  return parseInt(match[1], 10) * 12 + parseInt(match[2], 10);
}

export function isStrictlyUnderCctvHeight(heightInches: number): boolean {
  return heightInches < CCTV_HEIGHT_LIMIT_INCHES;
}

export type FootprintMatchLevel = 'full' | 'partial' | 'none';

export function footprintMatchLevel(suspect: Suspect): FootprintMatchLevel {
  const treadOk = suspect.tread === SCENE_FOOTPRINT_TREAD;
  const sizeOk = suspect.shoeSize === SCENE_FOOTPRINT_SHOE_SIZE;
  if (treadOk && sizeOk) return 'full';
  if (treadOk || sizeOk) return 'partial';
  return 'none';
}

export function passesTreadWaveFilter(suspect: Suspect): boolean {
  return footprintMatchLevel(suspect) === 'full';
}
