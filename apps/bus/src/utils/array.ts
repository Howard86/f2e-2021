export const getMiddleElement = <T>(array: T[]): T =>
  array[Math.floor(array.length / 2)];

export const getLastElement = <T>(array: T[]): T => array[array.length - 1];
