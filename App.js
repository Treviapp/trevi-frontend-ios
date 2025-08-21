import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  useFonts,
  DancingScript_700Bold,
} from '@expo-google-fonts/dancing-script';
import * as Linking from 'expo-linking';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('./src/Assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./src/Assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./src/Assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/Assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/Assets/fonts/Poppins-Bold.ttf'),
    DancingScript_700Bold,
  });

  const prefix = Linking.createURL('/');

  const linking = {
    prefixes: ['trevi://', prefix],
    config: {
      screens: {
        App: {
          screens: {
            // Map the path and PARSE query params from the deep link
            CreateEventSuccess: {
              path: 'stripe-return',
              parse: {
                // backend sends host_code & guest_code → pass them through
                host_code: (v) => v,
                guest_code: (v) => v,
                status: (v) => v,
              },
            },
          },
        },
      },
    },
  };

  const onReady = useCallback(() => {
    console.log('✅ Navigation ready');
  }, []);

  // Log any deep links received (for debugging)
  useEffect(() => {
    const sub = Linking.addEventListener('url', (event) => {
      console.log('🔗 Deep link received:', event.url);
    });
    return () => sub.remove();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <StripeProvider
      publishableKey="pk_test_51RXKLrIMEUGCmkevn3YDd0y1oRaPogoAAo5MpDFrMlfrM9YdO9ISBqrqaAl6kwoLQfQjScaaepDW8ZE0Tx7vyIKx00eiMFSmEZ"
      merchantIdentifier="merchant.com.trevi"
    >
      <NavigationContainer linking={linking} onReady={onReady}>
        <Routes />
      </NavigationContainer>
    </StripeProvider>
  );
}
