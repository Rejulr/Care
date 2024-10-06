import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {Button} from '../Button';
import {$container, $default} from './style';
type ScreenProps = {
  children: ReactNode;
  useAlignment?: boolean;
  styles?: StyleProp<ViewStyle>;
  buttonLabel?: string;
  useDefault?: boolean;
  buttonOnPress?: () => void;
};
export const Screen = ({
  buttonLabel,
  children,
  styles,
  useDefault = true,
  useAlignment,
  buttonOnPress,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const PADDING_TOP = isAndroid ? 16 : insets.top;
  const PADDING_BOTTOM = isAndroid ? 16 : insets.bottom;
  return (
    <Box
      flex={1}
      style={[
        styles,
        {
          paddingTop: PADDING_TOP,
        },
      ]}>
      <Box
        style={[useDefault && $default, useAlignment && $container]}
        flex={1}>
        {children}
      </Box>
      {buttonLabel && (
        <Box
          style={[
            $container,
            useDefault && $default,
            {paddingVertical: PADDING_BOTTOM - 20},
          ]}
          flex={0.12}>
          <Button onPress={buttonOnPress} label={buttonLabel!} />
        </Box>
      )}
    </Box>
  );
};
