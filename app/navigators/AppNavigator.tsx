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
      <AppStack />
    </NavigationContainer>
  );
};
