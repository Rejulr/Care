import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Header} from '../components';
import {Onboarding, Verification, VerificationStatus} from '../screens';
import {AppStackParamList} from './AppStackParamList';
export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />

      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerLeft: () => <Header />,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="VerificationStatus" component={VerificationStatus} />
    </Stack.Navigator>
  );
};
