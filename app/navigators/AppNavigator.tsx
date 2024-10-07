import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppStack} from './AppStack';

export const AppNavigator = () => {
  const onNavigationReady = () => {
    SplashScreen.hide();
  };

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <BottomSheetModalProvider>
        <AppStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
