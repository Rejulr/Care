import React from 'react';
import {Pressable} from 'react-native';
import {Calender, Dropdown as DropDownIcon} from '../../../assets/svgs';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$dropDown} from './styles';

type IDropdown = {
  label: string;
  onPress: () => void;
  value: string | undefined;
};
export const Dropdown = ({label, onPress, value}: IDropdown) => {
  return (
    <Box>
      <Text color="formLabel" variant="medium">
        {label}
      </Text>
      <Pressable onPress={onPress}>
        <Box
          style={$dropDown}
          flexDirection="row"
          justifyContent="space-between">
          <Text color="primary">{value}</Text>
          {label === 'Gender' ? <DropDownIcon /> : <Calender />}
        </Box>
      </Pressable>
    </Box>
  );
};
