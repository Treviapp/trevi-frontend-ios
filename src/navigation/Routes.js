import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const Routes = () => {
  console.log("✅ Routes.js loaded"); // Debug log

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default Routes;
