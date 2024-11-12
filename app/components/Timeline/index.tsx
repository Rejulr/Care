import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import React, {useMemo, useRef, useState} from 'react';
import {StackNavigation} from '../../navigators';
import {$indicator} from '../AuthModal/style';
import {Button} from '../Button';
import {TimelineItem} from './item';

type AppointmentTimeline = {
  appointments: any[];
};
export const AppointmentTimeline = ({appointments}: AppointmentTimeline) => {
  const snapPoints = useMemo(() => ['1', '24%'], []);
  const navigation = useNavigation<StackNavigation>();
  const [patient, setPatient] = useState<any>();

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const onPress = async () => {
    bottomSheetModalRef.current?.close();
    navigation.navigate('Messages', {
      patientID: patient.patientID,
      channelName: patient.patientName,
      channelSelfie: patient.selfie,
    });
  };
  const timelineItemPress = (
    selfie: string,
    patientID: string,
    patientName: string,
  ) => {
    setPatient({selfie, patientID, patientName});
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <FlashList
        data={appointments}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TimelineItem item={item} onPress={timelineItemPress} />
        )}
        estimatedItemSize={200}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        // backgroundStyle={$container}
        handleIndicatorStyle={$indicator}
        backdropComponent={BottomSheetBackdrop}
        snapPoints={snapPoints}>
        <BottomSheetView>
          <Button label="Chat" onPress={onPress} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
