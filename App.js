import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import AppStack from './src/navigation/AppStack';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import {
  useFonts,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';

import * as Font from 'expo-font';

// Prevent splash screen from hiding too soon
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('./src/Assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./src/Assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/Assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/Assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/Assets/fonts/Poppins-Bold.ttf'),
    DancingScript_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <StripeProvider publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ">
      <NavigationContainer onReady={onLayoutRootView}>
        <AppStack />
      </NavigationContainer>
    </StripeProvider>
  );
}
