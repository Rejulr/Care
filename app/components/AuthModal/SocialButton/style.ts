import {ViewStyle} from 'react-native';
import {colors} from '../../../theme';
import {verticalScale} from '../../../utils';

export const $skottie: ViewStyle = {
  height: 50,
  width: 50,
};
export const $button: ViewStyle = {
  height: verticalScale(55),
  backgroundColor: colors.socialButton,
  justifyContent: 'center',
  alignItems: 'center',
};
