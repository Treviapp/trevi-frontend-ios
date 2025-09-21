import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import styles from './Style';
import { useNavigation } from '@react-navigation/native';

export default function DonationSuccessScreen({ route }) {
  const navigation = useNavigation();

  // ✅ pull params safely with defaults
  const {
    hostCode = '',
    guestCode = '',
    eventName = '',
    donorName = '',
    amount = 0,
  } = route?.params || {};

  const safeAmount = (amount / 100).toFixed(2);

  const handleGoToEvent = () => {
    if (!guestCode) {
      Alert.alert(
        "Missing event code",
        "We couldn’t find your event. Please re-enter the event code."
      );
      navigation.navigate('EnterEvent');
      return;
    }
    navigation.navigate('EventSummaryScreen', { guestCode });
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={[styles.container, localStyles.center]}>
      <Text style={styles.title}>Thank You! 🎉</Text>

      <Text style={styles.note}>
        {donorName ? `${donorName}, ` : ''}your gift of £{safeAmount} has been sent.
      </Text>

      {eventName ? (
        <Text style={styles.note}>You supported {eventName}.</Text>
      ) : (
        <Text style={styles.note}>Thanks for supporting this event.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleGoToEvent}>
        <Text style={styles.buttonText}>View Event</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.homeButton, { marginTop: 12 }]} onPress={handleGoHome}>
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
