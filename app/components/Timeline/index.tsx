import {FlashList} from '@shopify/flash-list';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {formatTiming, moderateScale} from '../../utils';
import {Box} from '../Box';
import {Text} from '../Text';
import {$fastImage} from './styles';

type AppointmentTimeline = {
  appointments: any[];
};
export const AppointmentTimeline = ({appointments}: AppointmentTimeline) => {
  return (
    <FlashList
      data={appointments}
      renderItem={({item, index}) => (
        <Box key={index} flexDirection="row" alignItems="flex-start" mt="s">
          <Text>{item?.time}</Text>
          {item?.data?.map(({appointmentTime, patientName, selfie}) => (
            <Box key={index} marginTop="xs" flex={1} marginLeft="n">
              <Box height={1} backgroundColor="inputStroke" />
              <Box
                paddingHorizontal="n"
                alignItems="center"
                paddingVertical="m"
                mt="n"
                gap="n"
                flexDirection="row"
                backgroundColor="secondary2"
                borderRadius={9}>
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
          ))}
        </Box>
      )}
      estimatedItemSize={200}
    />
  );
};
