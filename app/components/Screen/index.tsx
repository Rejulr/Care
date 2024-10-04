import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {$container, $default} from './style';
type ScreenProps = {
  children: ReactNode;
  useAlignment?: boolean;
  styles?: StyleProp<ViewStyle>;
};
export const Screen = ({children, styles, useAlignment}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const PADDING_TOP = isAndroid ? 16 : insets.top;
  const PADDING_BOTTOM = isAndroid ? 16 : insets.bottom;
  return (
    <Box
      flex={1}
      style={[
        styles,
        $default,
        useAlignment && $container,
        {
          paddingTop: PADDING_TOP,
          paddingBottom: PADDING_BOTTOM,
        },
      ]}>
      {children}
    </Box>
  );
};
