import React from 'react';
import {CalenderTab} from '../../assets/svgs';
import {useAppStore} from '../../data';
import {dateInfo, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import { spacing } from '../../theme/spacing';

export const DateRangeInfo = () => {
  const {dateRange} = useAppStore();

  return (
    <Box
      flexDirection="row"
      mt="m"
      borderRadius={spacing.borderRadius}
      paddingHorizontal="m"
      paddingVertical="m"
      backgroundColor="greenLight">
      <CalenderTab />
      <Box paddingHorizontal="n">
        <Text variant="semiBold" color="primary">
          {dateRange.includes('/') ? 'Custom Date' : dateRange}
        </Text>
        <Text
          pt="s"
          textAlign="left"
          color="primary"
          variant="regular"
          fontSize={moderateScale(14)}>
          {dateInfo(dateRange)}
        </Text>
      </Box>
    </Box>
  );
};
