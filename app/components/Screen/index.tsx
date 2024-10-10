import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {Button} from '../Button';
import {$container, $default, $shadow} from './style';
type ScreenProps = RectButtonProps & {
  children: ReactNode;
  useAlignment?: boolean;
  styles?: StyleProp<ViewStyle>;
  buttonLabel?: string;
  useDefault?: boolean;
  isLoading?: boolean;
  buttonShadow?: boolean;
  buttonOnPress?: () => void;
};
export const Screen = ({
  buttonLabel,
  children,
  styles,
  useDefault = true,
  useAlignment,
  buttonShadow: addShadow = true,
  buttonOnPress,
  isLoading,
  ...props
}: ScreenProps) => {
  const insets = useSafeAreaInsets();
  const PADDING_TOP = isAndroid ? 16 : insets.top;
  const PADDING_BOTTOM = 34;
  return (
    <Box
      pointerEvents={isLoading ? 'none' : 'auto'}
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
            addShadow && $shadow,
            useDefault && $default,
            {paddingVertical: PADDING_BOTTOM - 20},
          ]}
          flex={0.12}>
          <Button
            isLoading={isLoading}
            {...props}
            onPress={buttonOnPress}
            label={buttonLabel!}
          />
        </Box>
      )}
    </Box>
  );
};
