export const addToLocalStorage = (key: string, value: string): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getFromLocalStorage = <T extends string>(
  key: string,
): T | null => {
  if (typeof window === 'undefined') return null;

  try {
    return window.localStorage.getItem(key) as T;
  } catch (error) {
    console.error(error);
    return null;
  }
};
