import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './Style';
import WelcomeBackground from '../WelcomeBackground'; // ✅ use new background

// ✅ Register custom float animation
Animatable.initializeRegistryWithDefinitions({
  float: {
    0: { translateY: 0 },
    0.5: { translateY: -10 },
    1: { translateY: 0 },
  },
});

export default function WelcomeScreen({ navigation, onLayout }) {
  return (
    <WelcomeBackground onLayout={onLayout}>
      <Animatable.Image
        animation="float"
        easing="ease-in-out"
        iterationCount="infinite"
        duration={4000}
        style={localStyles.orb}
        source={require('../../Assets/Images/orb.png')} // ✅ use your fairy image here
      />

      <Text style={styles.title}>Welcome to Trevi</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EnterEvent')}
      >
        <Text style={styles.buttonText}>Enter Event as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AccessEvent')}
      >
        <Text style={styles.buttonText}>Access my Event</Text>
      </TouchableOpacity>
    </WelcomeBackground>
  );
}

const localStyles = StyleSheet.create({
  orb: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
