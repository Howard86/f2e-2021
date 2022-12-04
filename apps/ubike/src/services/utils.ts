export const parseCoordinate = (value: number, fixed: number) =>
  Number.parseFloat(value.toFixed(fixed));

export enum CyclingDifficulty {
  'UNKNOWN',
  'EASY',
  'MEDIUM',
  'HARD',
  'EXPERT',
}

export const getDifficulty = (meter?: number): CyclingDifficulty => {
  if (!meter) return CyclingDifficulty.UNKNOWN;

  if (meter < 3_000) return CyclingDifficulty.EASY;

  if (meter < 8_000) return CyclingDifficulty.MEDIUM;

  if (meter < 17_000) return CyclingDifficulty.HARD;

  return CyclingDifficulty.EXPERT;
};
