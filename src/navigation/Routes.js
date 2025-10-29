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
      publishableKey="pk_live_51RXKLjIZnBW7XxVHInY17LFasEoyTuZB88ytB4LLScE7L113h1Qzgk19T2R9ROiNQ8TBUYvBIJ0yUPkLVSM9LuGB00EFXISZp1"
      merchantIdentifier="merchant.com.amandatreviapp.trevi"
      urlScheme="trevi"
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="App" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

