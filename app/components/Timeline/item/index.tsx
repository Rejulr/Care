import React from 'react';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {spacing} from '../../../theme/spacing';
import {formatTiming, moderateScale} from '../../../utils';
import {Box} from '../../Box';
import {Text} from '../../Text';
import {$fastImage, $item} from '../styles';

type TimelineItemProps = {
  onPress: (selfie: string, patientID: string, patientName: string) => void;
  item: any;
};

export const TimelineItem = ({onPress, item}: TimelineItemProps) => {
  return (
    <Box flexDirection="row" alignItems="flex-start" mt="s">
      <Text>{item?.time}</Text>
      {item?.data?.map(({appointmentTime, patientName, selfie, patientID}) => (
        <Pressable
          key={item}
          style={$item}
          onPress={() => onPress(selfie, patientID, patientName)}>
          <Box>
            <Box height={1} backgroundColor="inputStroke" />
            <Box
              paddingHorizontal="n"
              alignItems="center"
              paddingVertical="m"
              mt="n"
              gap="n"
              flexDirection="row"
              backgroundColor="secondary2"
              borderRadius={spacing.borderRadius}>
              <FastImage
                style={$fastImage}
                source={{
                  uri: selfie,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.center}
              />
              <Box flexDirection="row">
                <Box>
                  <Text
                    variant="semiBold"
                    color="primary"
                    fontSize={moderateScale(13)}>
                    {patientName}
                  </Text>
                  <Text variant="regular" color="primary">
                    {formatTiming(
                      appointmentTime[0].startTime,
                      appointmentTime[0].endTime,
                    )}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};
