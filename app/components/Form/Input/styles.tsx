import {TextStyle} from 'react-native';
import {colors} from '../../../theme';
import {fonts} from '../../../theme/typography';

export const $textInput: TextStyle = {
  marginTop: 10,
  borderRadius: 9,
  height: 45,
  borderWidth: 1,
  borderColor: colors.inputStroke,
  padding: 10,
  fontFamily: fonts.workSans.regular,
};
