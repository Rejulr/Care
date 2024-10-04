import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppNavigator} from './navigators';
import {theme} from './theme';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
