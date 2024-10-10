import React from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$textArea, $textInput} from './styles';

type InputFieldProps = Omit<TextInputProps, 'ref'> & {
  label: string;
  isTextArea?: boolean;
  onChange: (...event: any[]) => void;
  value?: string;
};
export const InputField = ({
  label,
  onChange,
  isTextArea,
  value,
  ...props
}: InputFieldProps) => {
  return (
    <Box>
      <Text color="formLabel" variant="medium">
        {label}
      </Text>
      <TextInput
        {...props}
        style={[$textInput, isTextArea && $textArea]}
        keyboardType="default"
        onChangeText={onChange}
        value={value}
      />
    </Box>
  );
};
