import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {Pressable} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {ArrowBackAndroid, ArrowBackiOS, VideoCall} from '../../../assets/svgs';
import {StackNavigation} from '../../../navigators';
import {StackTabNavigation} from '../../../navigators/TabParamList';
import {isAndroid, moderateScale} from '../../../utils';
import {Avatar} from '../../Avatar';
import {Box} from '../../Box';
import {$button, $widthHeightStyle} from '../../Dismiss/style';
import {Text} from '../../Text';
import {$back} from './styles';

type MessageHeaderProps = {
  channelSelfie: string;
  channelName: string;
  patientID: string;
};
export const MessageHeader = memo(
  ({channelName, channelSelfie, patientID}: MessageHeaderProps) => {
    const navigation = useNavigation<StackTabNavigation>();
    const mainNavigation = useNavigation<StackNavigation>();
    const onPress = () => {
      navigation.navigate('Chat');
    };
    const videoCallOnPress = () => {
      mainNavigation.navigate('VideoCall', {
        patientName: channelName,
        patientID,
        type: 'Video',
        incomingCall: false,
        avatar: channelSelfie,
      });
    };

    return (
      <>
        <Box
          marginTop="s"
          flexDirection="row"
          pr="l"
          alignItems="center"
          justifyContent="space-between">
          <Box flex={1} flexDirection="row" alignItems="center">
            <Box>
              <RectButton
                hitSlop={50}
                onPress={onPress}
                style={[$button, $widthHeightStyle(), $back]}>
                {!isAndroid ? <ArrowBackiOS /> : <ArrowBackAndroid />}
              </RectButton>
            </Box>
            <Box alignItems="center" flexDirection="row" gap="n">
              <Avatar uri={channelSelfie} patientID={patientID} />

              <Box gap="s">
                <Text
                  fontSize={moderateScale(14)}
                  numberOfLines={1}
                  variant="buttonLabel"
                  color="primary"
                  ellipsizeMode="tail">
                  {channelName}
                </Text>
                <Text
                  color="primary"
                  variant="regular"
                  fontSize={moderateScale(13)}>
                  Doctor
                </Text>
              </Box>
            </Box>
          </Box>
          <Pressable hitSlop={70} onPress={videoCallOnPress}>
            <Box>
              <VideoCall />
            </Box>
          </Pressable>
        </Box>
        {/* LINE */}
        <Box marginVertical="n" height={0.7} backgroundColor="line" />
      </>
    );
  },
);
