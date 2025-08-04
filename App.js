import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  useFonts,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('./src/Assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./src/Assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/Assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/Assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/Assets/fonts/Poppins-Bold.ttf'),
    DancingScript_700Bold,
  });

  const onReady = useCallback(() => {
    console.log('✅ Navigation ready');
  }, []);

  if (!fontsLoaded) return null;

  return (
    <StripeProvider
      publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ"
      merchantIdentifier="merchant.com.trevi" // optional for Apple Pay
    >
      <NavigationContainer onReady={onReady}>
        <Routes />
      </NavigationContainer>
    </StripeProvider>
  );
}
