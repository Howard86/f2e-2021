export const parseCoordinate = (value: number, fixed: number) =>
  Number.parseFloat(value.toFixed(fixed));

export enum CyclingDificulty {
  'UNKNOWN',
  'EASY',
  'MEDIUM',
  'HARD',
  'EXPERT',
}

export const getDifficulty = (meter?: number): CyclingDificulty => {
  if (!meter) {
    return CyclingDificulty.UNKNOWN;
  }

  if (meter < 1_000) {
    return CyclingDificulty.EASY;
  }

  if (meter < 10_000) {
    return CyclingDificulty.MEDIUM;
  }

  if (meter < 30_000) {
    return CyclingDificulty.HARD;
  }

  return CyclingDificulty.EXPERT;
};
