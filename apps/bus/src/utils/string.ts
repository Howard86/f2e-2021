// eslint-disable-next-line import/prefer-default-export
export const getTwoDigitString = (number: number): string =>
  number.toString().padStart(2, '0');
