import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const logError = (err: any) => {
  if (process.env.NEXT_ENV === 'development') {
    console.log(err);
  }
};

export const removeExtraSymbols = (input: string) => {
  // Remove all characters that are not letters, numbers, or spaces
  return input?.replace(/[^a-zA-Z0-9 ]/g, ' ');
};

export const setLocalStorageItem = (key: string, value: any): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}"`, error);
  }
};

export const getLocalStorageItem = (key: string): any => {
  if (typeof window === 'undefined') return null;

  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
};

export const removeFromLocalStorage = (key: string): any => {
  if (typeof window === 'undefined') {
    return null;
  }

  localStorage.removeItem(key);
};

export const getDeviceToken = (): string => {
  let deviceToken = getLocalStorageItem('deviceToken');

  if (!deviceToken) {
    deviceToken = crypto.randomUUID(); // Generates a unique device token
    setLocalStorageItem('deviceToken', deviceToken);
  }

  return deviceToken;
};

export const getDeviceTokenSignup = (): string => {
  const deviceToken = crypto.randomUUID(); // Generates a unique device token
  setLocalStorageItem('deviceToken', deviceToken);

  return deviceToken;
};

export const checkEmail = (email: string): boolean => {
  let storedEmail = getLocalStorageItem('email');

  if (storedEmail !== email) {
    setLocalStorageItem('email', email);
    return false;
  } else {
    return true;
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Smooth scrolling
  });
};
