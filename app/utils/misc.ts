import {I18nManager, Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isRTL = I18nManager.isRTL ? true : false;
export const UUID = () => {
  return Math.floor(Math.random() * Date.now());
};
export type IScroll = {
  index: number;
  value: number;
};
export const SCROLL_DEFAULT: IScroll = {index: 0, value: 33.3};
