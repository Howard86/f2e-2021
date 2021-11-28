// eslint-disable-next-line import/prefer-default-export
export const getMiddleElement = <T>(array: T[]): T =>
  array[Math.floor(array.length / 2)];
