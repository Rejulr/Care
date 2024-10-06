import React from 'react';
import {Upload} from '../../assets/svgs';
import {Box, Text} from '../../components';
import {Header} from '../../components/Verification';
import {spacing} from '../../theme/spacing';
import {moderateScale} from '../../utils';

export const Document = () => {
  return (
    <>
      <Header title={'Identity\nVerification'} />
      <Box mt="xl" gap="ll" marginHorizontal="l">
        <Box
          borderRadius={spacing.borderRadius}
          borderWidth={1.3}
          borderStyle="dashed"
          justifyContent="space-between"
          borderColor="secondary1Lighter"
          alignItems="center"
          p="m"
          backgroundColor="secondary1Light"
          style={{height: 180, width: '100%'}}>
          <Box alignItems="center">
            <Text
              variant="semiBold"
              fontSize={moderateScale(17)}
              color="primary">
              Identification Selfie
            </Text>
            <Text
              textAlign="center"
              variant="regular"
              lineHeight={19}
              pt="s"
              fontSize={moderateScale(12)}>
              A recent photo of yourself used for identification and
              verification purposes.
            </Text>
          </Box>

          <Box
            borderRadius={100}
            backgroundColor="secondary1Lighter"
            justifyContent="center"
            alignItems="center"
            height={52}
            width={52}>
            <Upload />
          </Box>
        </Box>
        <Box
          borderRadius={spacing.borderRadius}
          borderWidth={1.3}
          borderStyle="dashed"
          justifyContent="space-between"
          borderColor="secondary2Lighter"
          alignItems="center"
          p="m"
          backgroundColor="secondary2Light"
          style={{height: 180, width: '100%'}}>
          <Box alignItems="center">
            <Text
              variant="semiBold"
              fontSize={moderateScale(17)}
              color="primary">
              Proof of Qualification(s)
            </Text>
            <Text
              textAlign="center"
              variant="regular"
              lineHeight={19}
              pt="s"
              fontSize={moderateScale(12)}>
              Any official document that verifies your professional
              qualifications and expertise.
            </Text>
          </Box>

          <Box
            borderRadius={100}
            backgroundColor="secondary2Lighter"
            justifyContent="center"
            alignItems="center"
            height={52}
            width={52}>
            <Upload />
          </Box>
        </Box>
      </Box>
    </>
  );
};
