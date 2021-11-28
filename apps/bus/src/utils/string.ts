export const getTwoDigitString = (number: number): string =>
  number.toString().padStart(2, '0');

export const getMinute = (number: number): number => Math.floor(number / 60);
