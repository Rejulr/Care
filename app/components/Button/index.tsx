import React from 'react';
import {
  Gesture,
  GestureDetector,
  RectButton,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Box} from '../Box';
import {Text} from '../Text';
import {$button, $buttonContainer, $label} from './styles';

type ButtonProps = {
  onPress?: () => void;
  label: string;
};
export const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Button = ({onPress, label}: ButtonProps) => {
  const scaleDown = useSharedValue<boolean>(false);

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
      opacity: scaleDown.value
        ? withTiming(0.9, {duration: 250})
        : withTiming(1, {duration: 250}),

      borderRadius: 10,
    };
  });
  return (
    <Box style={$buttonContainer} overflow="hidden">
      <GestureDetector gesture={longPressGesture}>
        <AnimatedButton style={[$button, buttonStyle]} onPress={onPress}>
          <Text style={$label} variant="buttonLabel">
            {label}
          </Text>
        </AnimatedButton>
      </GestureDetector>
    </Box>
  );
};
