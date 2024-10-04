import {TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme';
import {moderateScale, verticalScale} from '../../utils';

export const $buttonContainer: ViewStyle = {
  borderRadius: moderateScale(10),
};
export const $button: ViewStyle = {
  height: verticalScale(55),
  backgroundColor: colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
};
export const $label: TextStyle = {
  fontSize: moderateScale(17),
  letterSpacing: 1,
};
