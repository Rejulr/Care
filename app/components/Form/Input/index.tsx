import React from 'react';
import {TextInput} from 'react-native';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$textInput} from './styles';

type InputFieldProps = {
  label: string;
};
export const InputField = ({label}: InputFieldProps) => {
  return (
    <Box>
      <Text color="formLabel" variant="medium">
        {label}
      </Text>
      <TextInput style={$textInput} value="Male" keyboardType="default" />
    </Box>
  );
};
