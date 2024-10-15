import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {Dropdown, Radio, RadioActive} from '../../assets/svgs';
import {useAppStore} from '../../data';
import {Box} from '../Box';
import {Text} from '../Text';

type RadioButtonsProps = {
  title: string[];
  onCustomPress: () => void;
};
export const RadioButtons = ({title, onCustomPress}: RadioButtonsProps) => {
  const {addDateRange, addCustomRange, dateRange} = useAppStore();

  const isCustomDate = dateRange.includes('/');
  const [active, setActive] = useState<string>();
  const customIndex = 3;
  console.log(dateRange, active, isCustomDate);
  const onPress = (radioTitle: string) => {
    if (radioTitle.includes('Custom')) {
      onCustomPress();
    } else {
      addDateRange(radioTitle);
      addCustomRange(false);
      setActive(radioTitle);
    }
  };
  useEffect(() => {
    if (dateRange) {
      setActive(isCustomDate ? 'Custom Range' : dateRange);
    }
  }, [dateRange, isCustomDate]);
  return (
    <Box mt="l" gap="l">
      {title.map((label, index) => (
        <Pressable key={index} onPress={() => onPress(label)}>
          <Box flexDirection="row" gap="n" alignItems="center">
            {label.includes('Custom') && isCustomDate && active === label ? (
              <RadioActive />
            ) : !label.includes('Custom') &&
              !isCustomDate &&
              active === label ? (
              <RadioActive />
            ) : (
              <Radio />
            )}
            <Text color="primary">{label}</Text>
            {customIndex === index && isCustomDate && (
              <Pressable onPress={onCustomPress}>
                <Box
                  backgroundColor="secondary2"
                  gap="s"
                  p="s"
                  justifyContent="center"
                  borderRadius={9}
                  flexDirection="row"
                  alignItems="center">
                  <Text color="primary" variant="medium">
                    {/* 24 Mar - 19 Apr 2022 */}
                    {dateRange}
                  </Text>
                  <Dropdown />
                </Box>
              </Pressable>
            )}
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};
