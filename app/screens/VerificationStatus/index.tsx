import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Box, Screen, Text} from '../../components';
import {moderateScale} from '../../utils';

export const VerificationStatus = () => {
  return (
    <LinearGradient colors={['#D5FFEE', '#FCEFE9']} style={{flex: 1}}>
      <Screen useDefault={false} useAlignment buttonLabel="Got it">
        <Box flex={1} justifyContent="center" alignItems="center" gap="n">
          <Text color="primary" variant="mBold" fontSize={moderateScale(42)}>
            Verification Underway
          </Text>
          <Text color="formLabel" variant="regular" textAlign="center">
            Your documents and profile are currently being reviewed. We will
            notify you once the verification process is complete.
          </Text>
        </Box>
      </Screen>
    </LinearGradient>
  );
};
