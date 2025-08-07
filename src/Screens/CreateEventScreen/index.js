import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import styles from './Style';
import CreateEventBackground from '../CreateEventBackground';

const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');

  const handleNext = () => {
    if (!fullName || !email || !eventName) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    navigation.navigate('HostCreateMessage', {
      fullName: toTitleCase(fullName),
      email,
      eventName: toTitleCase(eventName),
    });
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <CreateEventBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Event</Text>

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your name"
          maxLength={30}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={40}
        />

        <TextInput
          style={styles.input}
          value={eventName}
          onChangeText={setEventName}
          placeholder="Enter your event name"
          maxLength={40}
          autoCapitalize="words"
        />

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      {/* 🧚 Fairy at bottom-right */}
      <Image
        source={require('../../Assets/Images/cauldronfairy.png')}
        style={localStyles.fairy}
        resizeMode="contain"
      />
    </CreateEventBackground>
  );
}

const localStyles = StyleSheet.create({
  fairy: {
    width: 300,
    height: 300,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.95,
  },
});
