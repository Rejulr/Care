import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AppStack} from './AppStack';
import { useAppStore } from '../data';

export const AppNavigator = () => {
  const {} = useAppStore();
  return (
    <NavigationContainer>
      <BottomSheetModalProvider>
        <AppStack />
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};
