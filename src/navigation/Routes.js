// src/navigation/Routes.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StripeProvider } from '@stripe/stripe-react-native';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <StripeProvider
      publishableKey="pk_live_..." // ⬅️ replace this with your actual LIVE publishable key
      merchantIdentifier="merchant.com.amandatreviapp.trevi" // must match your iOS bundle identifier
      urlScheme="trevi" // matches the "scheme" in app.json
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

