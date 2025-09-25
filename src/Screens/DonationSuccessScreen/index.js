import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './Style';
import { useNavigation } from '@react-navigation/native';

export default function DonationSuccessScreen({ route }) {
  const navigation = useNavigation();

  const {
    eventName = '',
    donorName = '',
    amount = 0,
  } = route?.params || {};

  const safeAmount = parseFloat(amount).toFixed(2);

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <View style={[styles.container, localStyles.center]}>
      <Text style={styles.title}>Thank You! 🎉</Text>

      <Text style={styles.message}>
        {donorName ? `${donorName}, ` : ''}your gift of £{safeAmount} has been sent.
      </Text>

      {eventName ? (
        <Text style={styles.message}>You supported {eventName}.</Text>
      ) : (
        <Text style={styles.message}>Thanks for supporting this event.</Text>
      )}

      <TouchableOpacity
        style={[styles.button, { marginTop: 24 }]}
        onPress={handleGoHome}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const localStyles = StyleSheet.create({
  center: {
    flex: 1, // ✅ makes the whole screen available for centering
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

