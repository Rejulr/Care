import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import {Pressable} from 'react-native';
import {ArrowBackAndroid, ArrowBackiOS} from '../../assets/svgs';
import {colors} from '../../theme';
import {isAndroid} from '../../utils';
import {Box} from '../Box';
import {ProgressBar} from '../ProgressBar';

export const Header = (_: HeaderBackButtonProps) => {
  const canGoBack = () => {};
  return (
    <Box flex={1} flexDirection="row" alignItems="center">
      <Pressable onPress={canGoBack} style={{flexGrow: 1}}>
        {isAndroid ? <ArrowBackAndroid /> : <ArrowBackiOS />}
      </Pressable>
      <Box flexGrow={1}>
        <ProgressBar
          containerBackgroundColor={colors.secondary4}
          containerHeight={8}
          progressBackgroundColor={colors.secondary4Dark}
          widthSize={33.33}
        />
      </Box>
      <Box flex={1} />
    </Box>
  );
};
