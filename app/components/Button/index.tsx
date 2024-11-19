import React, {ReactNode} from 'react';
import {
  Gesture,
  GestureDetector,
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Skottie} from 'react-native-skottie';
import {Loader} from '../../assets/lottie';
import {colors} from '../../theme';
import {spacing} from '../../theme/spacing';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $buttonContainer, $label, $skottie} from './styles';

type ButtonProps = RectButtonProps & {
  onPress?: () => void;
  label: string;
  leftIcon?: ReactNode;
  useSecondary?: boolean;

  isLoading?: boolean;
};
export const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Button = ({
  onPress,
  isLoading,
  leftIcon,
  useSecondary,
  label,
  ...props
}: ButtonProps) => {
  const scaleDown = useSharedValue<boolean>(false);

  const isButtonEnabled =
    props.enabled === undefined ? false : props.enabled ? false : true;
  const longPressGesture = Gesture.LongPress()
    .onBegin(() => {
      scaleDown.value = true;
    })
    .onFinalize(() => {
      scaleDown.value = false;
    });
  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleDown.value
            ? withTiming(0.9, {duration: 250})
            : withTiming(1, {duration: 250}),
        },
      ],
      opacity:
        scaleDown.value || isButtonEnabled
          ? withTiming(isButtonEnabled ? 0.2 : 0.9, {duration: 250})
          : withTiming(1, {duration: 250}),

      borderRadius: spacing.borderRadius,
    };
  });
  return (
    <Box flex={1} style={$buttonContainer} overflow="hidden">
      <GestureDetector gesture={longPressGesture}>
        <AnimatedButton
          {...props}
          style={[
            $button,
            buttonStyle,
            useSecondary && {backgroundColor: colors.blueDark},
          ]}
          onPress={onPress}>
          {isLoading ? (
            <Skottie
              style={$skottie}
              resizeMode="cover"
              source={Loader}
              autoPlay={true}
              loop={true}
            />
          ) : (
            <Box flexDirection="row" gap="n" alignItems="center">
              {leftIcon}

              <Text style={$label} variant="buttonLabel">
                {label}
              </Text>
            </Box>
          )}
        </AnimatedButton>
      </GestureDetector>
    </Box>
  );
};
