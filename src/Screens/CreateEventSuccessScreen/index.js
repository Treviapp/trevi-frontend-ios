import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from './Style';
import CreateEventSuccessBackground from '../CreateEventSuccessBackground';

export default function CreateEventSuccessScreen({ route, navigation }) {
  const {
    // camelCase (from in-app navigation)
    hostCode,
    guestCode,
    eventName,
    fullName,
    email,
    message,
    photo,
    // snake_case (from deep link)
    host_code,
    guest_code,
    status,
  } = route?.params || {};

  // Prefer camelCase if present; otherwise fall back to snake_case
  const finalHostCode = hostCode ?? host_code ?? '';
  const finalGuestCode = guestCode ?? guest_code ?? '';

  const handleContinue = () => {
    navigation.navigate('HostDashboard', {
      hostCode: finalHostCode,
      eventName,
      fullName,
      email,
      message,
      photo,
      status,
    });
  };

  return (
    <CreateEventSuccessBackground>
      <View style={[styles.container, localStyles.contentContainer]}>
        <Text style={styles.title}>Event Created</Text>

        <Text style={styles.label}>Host Code</Text>
        <Text style={styles.code}>{finalHostCode || '—'}</Text>

        <Text style={styles.label}>Guest Code</Text>
        <Text style={styles.code}>{finalGuestCode || '—'}</Text>

        <Text style={styles.emailNotice}>
          ✅ We've emailed you these event codes.
        </Text>

        <Text style={styles.note}>
          Share the guest code with your friends so they can donate to your big event.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue to Dashboard</Text>
        </TouchableOpacity>

        <Image
          source={require('../../Assets/Images/fountain.png')}
          style={localStyles.fountain}
          resizeMode="contain"
        />
      </View>
    </CreateEventSuccessBackground>
  );
}

const localStyles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 220,
  },
  fountain: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 200,
    height: 200,
    opacity: 0.95,
  },
});