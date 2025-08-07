import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './Style';
import DonationSuccessBackground from '../DonationSuccessBackground';

export default function DonationSuccessScreen({ navigation }) {
  return (
    <DonationSuccessBackground>
      {/* ✨ Sparkle Trail Animation (drops in once) */}
      <Animatable.Image
        animation="slideInDown"
        duration={1600}
        easing="ease-in-out"
        source={require('../../Assets/Images/sparkletrail.png')}
        style={localStyles.sparkle}
        resizeMode="contain"
      />

      <Text style={styles.title}>Thank You!</Text>
      <Text style={styles.message}>Your gift has been sent successfully.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </DonationSuccessBackground>
  );
}

const localStyles = StyleSheet.create({
  sparkle: {
    width: 260,
    height: 260 ,
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
});
