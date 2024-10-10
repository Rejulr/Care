import React from 'react';
import {useAppStore} from '../../data';
import {colors} from '../../theme';
import {horizontalScale} from '../../utils';
import {Box} from '../Box';
import {ProgressBar} from '../ProgressBar';

export const VerificationHeader = () => {
  const {personalInformationStep, specialtyStep} = useAppStore();
  const DEFAULT_WIDTH = 33.33;
  const progress =
    personalInformationStep && specialtyStep
      ? DEFAULT_WIDTH * 3
      : personalInformationStep
      ? DEFAULT_WIDTH * 2
      : DEFAULT_WIDTH;

  return (
    <Box
      style={{marginHorizontal: horizontalScale(30)}}
      mt="m"
      mb="l"
      alignItems="center"
      justifyContent="center">
      <ProgressBar
        containerBackgroundColor={colors.secondary4}
        containerHeight={8}
        progressBackgroundColor={colors.secondary4Dark}
        widthSize={progress}
      />
    </Box>
  );
};
