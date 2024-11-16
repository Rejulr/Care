import {withObservables} from '@nozbe/watermelondb/react';
import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {Box, EnhancedChannelList, Screen} from '../../components';
import {Header} from '../../components/Verification';
import ChannelModel from '../../db/channelModel';
import {observeChannels} from '../../db/helper';

type ChatProps = {
  channels: ChannelModel[];
};
export const Chat = ({channels}: ChatProps) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Screen styles={{backgroundColor: 'white'}} useAlignment useDefault>
      <Box mt="l">
        <Header addDefault={false} title="Chats" summary=" " />
      </Box>
      <Box flex={1} mt="m">
        <FlashList
          data={channels}
          estimatedItemSize={200}
          renderItem={({item}) => <EnhancedChannelList channel={item} />}
        />
      </Box>
    </Screen>
  );
};
const enhance = withObservables([], () => ({
  channels: observeChannels(),
}));

export const EnhancedChat = enhance(Chat);
