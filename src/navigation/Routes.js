import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import AppStack from './AppStack';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => {
      console.log('🔗 Deep link received:', url);

      if (url.includes('stripe-return')) {
        const params = Linking.parse(url).queryParams;
        navigation.navigate('CreateEventSuccess', {
          hostCode: params.host_code,
          guestCode: params.guest_code,
        });
      }
    });

    return () => sub.remove();
  }, [navigation]);

  console.log("✅ Routes.js loaded");

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
};

export default Routes;
