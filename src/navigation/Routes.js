import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Trevi Stack
import AppStack from './AppStack';

// Screens
import Carousal from '../Screens/Carousal';

// Redux Imports (optional – you can remove if not using Redux anymore)
import { useSelector } from 'react-redux';
import { isReadyRef, navigationRef } from './LinkingNavigator';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="App" component={AppStack} />
       <Stack.Screen name="Carousal" component={Carousal} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;


