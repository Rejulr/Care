import {I18nManager, Platform} from 'react-native';
import {FadeInDown} from 'react-native-reanimated';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isRTL = I18nManager.isRTL ? true : false;
export const UUID = () => {
  return Math.floor(Math.random() * Date.now());
};
export const FADE_IN = (delay: number) =>
  FadeInDown.springify()
    .damping(30)
    .mass(5)
    .stiffness(10)
    .delay(delay)
    .duration(3000);

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const formatDate = (dob: Date) => {
  if (!dob || (dob instanceof Date && isNaN(dob.getTime()))) {
    return ' ';
  }
  const dateObj = new Date(dob);

  return `${
    MONTH_NAMES[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
export const formatDay = (dob: Date) => {
  if (!dob || (dob instanceof Date && isNaN(dob.getTime()))) {
    return ' ';
  }
  const dateObj = new Date(dob);

  return `${
    MONTH_NAMES[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function isEmpty(str: string) {
  return !str || str.length === 0;
}

export const today = () => {
  const date: Date = new Date();
  const month = date.getMonth();
  const day = date.getUTCDay();
  const year = date.getUTCFullYear();
  return {month, day, year};
};
export type IScroll = {
  index: number;
  value: number;
};
export const SCROLL_DEFAULT: IScroll = {index: 0, value: 33.3};
