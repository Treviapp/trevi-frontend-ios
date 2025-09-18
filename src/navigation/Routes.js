// src/navigation/Routes.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Load your real AppStack here */}
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
