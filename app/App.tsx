import {ThemeProvider} from '@shopify/restyle';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {theme} from './theme';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {useAppStore} from './data';
import {
  sendMessage,
  updateAllDeliveryStatus,
  updateDeliveryStatus,
} from './db/helper';
import {AppStack} from './navigators/AppStack';
import socket from './services/socket';

function App(): React.JSX.Element {
  //fix specialty value
  const {UID} = useAppStore();
  const navigationRef = createNavigationContainerRef<any>();

  useEffect(() => {
    async function onConnect() {
      console.log('Connected');
    }

    function onDisconnect() {
      console.log('Disconnected');
    }

    async function receiveMessage(data: any, callback) {
      const {doctor, message, sender, patient} = data;
      await sendMessage({
        deliveryStatus: 'delivered',
        doctor,
        message,
        patient,
        sender,
      });
      callback({
        deliveryStatus: 'delivered',
      });
    }

    async function updateStatus(response: any) {
      console.log(response);
      const {deliveryStatus: status, patient, messageID, type} = response;
      //emit delivered if successful
      if (type === 'single') {
        await updateDeliveryStatus(status, messageID);
      } else {
        await updateAllDeliveryStatus(status, patient);
      }
    }

    const handleIncomingCallOffer = (data, callback) => {
      const {patient, offer} = data;

      if (navigationRef.isReady()) {
        navigationRef.navigate('VideoCall', {
          incomingCall: true,
          patientName: patient.name,
          patientID: patient.id,
          offer,
          avatar: patient.avatar,
        });
      }
      callback({
        callStatus: 'Ringing',
      });
    };
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive', receiveMessage);
    socket.on('incomingCallOffer', handleIncomingCallOffer);
    socket.on('read', updateStatus);
    socket.emit('join', UID);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive', receiveMessage);
      socket.off('read', updateStatus);
      socket.emit('left', UID);
      socket.on('incomingCallOffer', handleIncomingCallOffer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <BottomSheetModalProvider>
              <AppStack />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
