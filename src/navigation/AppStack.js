import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../Screens/WelcomeScreen'; // eager (first screen)

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      {/* First screen loads immediately */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      {/* Lazy-loaded screens (only load when navigated to) */}
      <Stack.Screen name="VideoIntro" getComponent={() => require('../Screens/VideoIntroScreen').default} />
      <Stack.Screen name="AccessEvent" getComponent={() => require('../Screens/AccessEventScreen').default} />
      <Stack.Screen name="EnterEvent" getComponent={() => require('../Screens/EnterEventScreen').default} />
      <Stack.Screen name="CreateEvent" getComponent={() => require('../Screens/CreateEventScreen').default} />
      <Stack.Screen name="HostCreateMessage" getComponent={() => require('../Screens/HostCreateMessageScreen').default} />
      <Stack.Screen name="StripeLinkingScreen" getComponent={() => require('../Screens/StripeLinkingScreen').default} />
      <Stack.Screen name="CreateEventSuccess" getComponent={() => require('../Screens/CreateEventSuccessScreen').default} />
      <Stack.Screen name="HostDashboard" getComponent={() => require('../Screens/HostDashboardScreen').default} />
      <Stack.Screen name="EventSummaryScreen" getComponent={() => require('../Screens/EventSummaryScreen').default} />
      <Stack.Screen name="MakeDonation" getComponent={() => require('../Screens/MakeDonationScreen').default} />
      <Stack.Screen name="MakePaymentScreen" getComponent={() => require('../Screens/MakePaymentScreen').default} />
      <Stack.Screen name="DonationSuccess" getComponent={() => require('../Screens/DonationSuccessScreen').default} />
      <Stack.Screen name="GiftListScreen" getComponent={() => require('../Screens/GiftListScreen').default} />
    </Stack.Navigator>
  );
}

