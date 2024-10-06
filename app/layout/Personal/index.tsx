import React from 'react';
import {TextInput} from 'react-native';
import {Box, Text} from '../../components';
import {InputField} from '../../components/Form';
import {Header} from '../../components/Verification';
import {colors} from '../../theme';
import {fonts} from '../../theme/typography';

export const PersonalInformation = () => (
  <>
    <Header title={'Personal\nInformation'} />
    <Box marginTop="ll" gap="m" marginHorizontal="l">
      <InputField label="Full Name" />
      <Box>
        <Text color="formLabel" variant="medium">
          Gender
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            borderRadius: 9,
            height: 45,
            borderWidth: 1,
            borderColor: colors.inputStroke,
            padding: 10,
            fontFamily: fonts.workSans.regular,
          }}
          value="Yusuf Smith"
          keyboardType="default"
        />
      </Box>
      <Box>
        <Text color="formLabel" variant="medium">
          Date of Birth
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            borderRadius: 9,
            height: 45,
            borderWidth: 1,
            borderColor: colors.inputStroke,
            padding: 10,
            fontFamily: fonts.workSans.regular,
          }}
          value="20 October 1990"
          keyboardType="default"
        />
      </Box>

      <InputField label="Email" />
    </Box>
  </>
);
