import {withObservables} from '@nozbe/watermelondb/react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Pressable, TextInput} from 'react-native';
import {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {Attachment, SendFill} from '../../assets/svgs';
import {
  AnimatedBox,
  Box,
  EnhancedMessageItem,
  MessageHeader,
  Screen,
} from '../../components';
import {$input} from '../../components/Chat/styles';
import {$container} from '../../components/LinearGradient/styles';
import {useAppStore} from '../../data';
import {
  addChannel,
  observeMessage,
  observeUnreadCount,
  sendMessage,
  updateDeliveryStatus,
} from '../../db/helper';
import MessagesModel from '../../db/messagesModel';
import {AppStackParamList} from '../../navigators';
import socket from '../../services/socket';
import {colors} from '../../theme';
import {spacing} from '../../theme/spacing';
import {isAndroid} from '../../utils';
type MessagesProps = {
  messages: MessagesModel[];
  unread: number;
};

const Messages = ({messages, unread}: MessagesProps) => {
  const {params} = useRoute<RouteProp<AppStackParamList, 'Messages'>>();
  const {UID} = useAppStore();
  // const navigation = useNavigation<StackTabNavigation>();
  const {patientID, channelName, channelSelfie} = params;
  const [messageInput, setMessageInput] = useState<string>('');
  const flashListRef = useRef<FlashList<MessagesModel>>(null);

  const onLoadListener = useCallback(({elapsedTimeInMs}) => {
    console.log('Sample List load time', elapsedTimeInMs);
  }, []);

  useEffect(() => {
    if (unread > 0) {
      socket.emit('read', {
        deliveryStatus: 'delivered',
        doctor: UID,
        patient: patientID,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unread]);

  const onPress = async () => {
    if (messageInput.length > 0) {
      flashListRef.current?.scrollToIndex({
        animated: true,
        index: messages.length - 1,
        viewOffset: 100,
      });
      const msgPayload = {
        doctor: UID,
        message: messageInput,
        patient: patientID,
        sender: UID,
        deliveryStatus: 'pending',
      };
      if (messages.length === 0) {
        const message = await addChannel({
          deliveryStatus: 'pending',
          doctor: UID,
          lastMessage: messageInput,
          patient: patientID,
          sender: UID,
          channelName,
          channelSelfie,
        }).catch(e => console.log(e));
        emitMessage(msgPayload, message?.id!);
      } else {
        const message = await sendMessage({
          ...msgPayload,
        }).catch(e => console.log(e));
        emitMessage(msgPayload, message?.id!);
      }
    }
  };

  const emitMessage = (msgPayload: any, id: string) => {
    socket.emit(
      'message',
      {...msgPayload, messageID: id},
      async (response: any) => {
        const {deliveryStatus, messageID} = response;
        console.log(deliveryStatus, messageID);
        await updateDeliveryStatus(deliveryStatus, messageID);
      },
    );
    setMessageInput('');
  };

  const sendStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {scale: messageInput.length > 0 ? withSpring(1.27) : withSpring(0)},
      ],
    };
  });

  return (
    <Screen>
      <KeyboardAvoidingView
        style={$container}
        keyboardVerticalOffset={40}
        behavior={!isAndroid ? 'padding' : undefined}>
        <Box flex={1}>
          {/* HEADER */}
          <MessageHeader
            patientID={patientID}
            channelName={channelName}
            channelSelfie={channelSelfie}
          />

          {/* Messages */}
          <Box flexGrow={6} paddingHorizontal="l">
            <FlashList
              ref={flashListRef}
              data={messages}
              showsVerticalScrollIndicator={false}
              getItemType={item => item.sender}
              estimatedItemSize={200}
              onLayout={() =>
                messages.length > 0 &&
                flashListRef?.current?.scrollToEnd({animated: true})
              }
              keyExtractor={item => item?.id?.toString()}
              onLoad={onLoadListener}
              renderItem={({item}) => (
                <EnhancedMessageItem item={item} UID={UID} />
              )}
            />
          </Box>

          {/* Message Input */}
          <Box flexGrow={0.37}>
            <Box marginVertical="m" height={0.9} backgroundColor="line" />

            <Box
              overflow="hidden"
              alignItems="center"
              paddingHorizontal="l"
              gap="n"
              flexDirection="row">
              <Box
                borderWidth={1}
                height={45}
                width={45}
                alignItems="center"
                backgroundColor="line"
                justifyContent="center"
                borderRadius={spacing.borderRadius}
                borderColor="line2">
                <Attachment />
              </Box>
              <AnimatedBox flex={1} borderRadius={spacing.borderRadius}>
                <TextInput
                  style={$input}
                  multiline={true}
                  value={messageInput}
                  keyboardType="default"
                  placeholder=" Type Something!"
                  placeholderTextColor={colors.primary}
                  onChangeText={value => {
                    setMessageInput(value);
                  }}
                />
              </AnimatedBox>

              {messageInput.length > 0 && (
                <AnimatedBox style={sendStyle}>
                  <Pressable onPress={onPress} hitSlop={40}>
                    <SendFill />
                  </Pressable>
                </AnimatedBox>
              )}
            </Box>
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </Screen>
  );
};
const enhance = withObservables(['route'], ({route}) => ({
  messages: observeMessage(route?.params?.patientID),
  unread: observeUnreadCount(route?.params?.patientID),
}));
export const EnhancedMessages = enhance(Messages);
