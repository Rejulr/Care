import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Header} from '../components';

import {Onboarding, Verification, VerificationStatus} from '../screens';
import {AppStackParamList} from './AppStackParamList';
export const AppStack = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(users: any) {
    setUser(users);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line curly
  if (initializing) return <></>;

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: 'white'},
      }}>
      {user ? (
        <>
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
          <Stack.Screen
            name="VerificationStatus"
            component={VerificationStatus}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      )}
    </Stack.Navigator>
  );
};
