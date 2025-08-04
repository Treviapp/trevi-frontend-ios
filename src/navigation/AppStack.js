import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VideoIntroScreen from '../Screens/VideoIntroScreen'; // ✅ New import
import WelcomeScreen from '../Screens/WelcomeScreen';
import EnterEventScreen from '../Screens/EnterEventScreen';
import CreateEventScreen from '../Screens/CreateEventScreen';
import HostCreateMessageScreen from '../Screens/HostCreateMessageScreen';
import CreateEventSuccessScreen from '../Screens/CreateEventSuccessScreen';
import HostDashboard from '../Screens/HostDashboardScreen';
import MakeDonationScreen from '../Screens/MakeDonationScreen';
import MakePaymentScreen from '../Screens/MakePaymentScreen';
import DonationSuccessScreen from '../Screens/DonationSuccessScreen';
import EventSummaryScreen from '../Screens/EventSummaryScreen';
import AccessEventScreen from '../Screens/AccessEventScreen';
import GiftListScreen from '../Screens/GiftListScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="VideoIntro" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VideoIntro" component={VideoIntroScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="AccessEvent" component={AccessEventScreen} />
      <Stack.Screen name="EnterEvent" component={EnterEventScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="HostCreateMessage" component={HostCreateMessageScreen} />
      <Stack.Screen name="CreateEventSuccess" component={CreateEventSuccessScreen} />
      <Stack.Screen name="HostDashboard" component={HostDashboard} />
      <Stack.Screen name="EventSummaryScreen" component={EventSummaryScreen} />
      <Stack.Screen name="MakeDonation" component={MakeDonationScreen} />
      <Stack.Screen name="MakePaymentScreen" component={MakePaymentScreen} />
      <Stack.Screen name="DonationSuccess" component={DonationSuccessScreen} />
      <Stack.Screen name="GiftListScreen" component={GiftListScreen} />
    </Stack.Navigator>
  );
}
