export const CyclingDifficulty = {
  EASY: 1,
  EXPERT: 4,
  HARD: 3,
  MEDIUM: 2,
  UNKNOWN: 0,
} as const;

export type CyclingDifficulty =
  (typeof CyclingDifficulty)[keyof typeof CyclingDifficulty];

export const getDifficulty = (meter?: number): CyclingDifficulty => {
  if (!meter) {
    return CyclingDifficulty.UNKNOWN;
  }

  if (meter < 3000) {
    return CyclingDifficulty.EASY;
  }

  if (meter < 8000) {
    return CyclingDifficulty.MEDIUM;
  }

  if (meter < 17_000) {
    return CyclingDifficulty.HARD;
  }

  return CyclingDifficulty.EXPERT;
};
