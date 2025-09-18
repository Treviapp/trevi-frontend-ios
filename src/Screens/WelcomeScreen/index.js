// src/Screens/WelcomeScreen/index.js
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './Style';
import WelcomeBackground from '../WelcomeBackground';

export default function WelcomeScreen({ navigation, onLayout }) {
  return (
    <WelcomeBackground onLayout={onLayout}>
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

