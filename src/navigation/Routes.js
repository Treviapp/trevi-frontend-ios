import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function SmokeTest() {
  return (
    <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
      <Text>It works</Text>
    </View>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Smoke" component={SmokeTest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
