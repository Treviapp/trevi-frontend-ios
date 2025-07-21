import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import axios from 'axios';
import CreateEventBackground from '../CreateEventBackground';

// 🔤 Capitalize first letter of each word
const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateEvent = async () => {
    console.log('🚨 Create Event button pressed');

    if (!fullName || !email || !eventName || !message) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    try {
      console.log('📡 Sending request to backend...');

      const response = await axios.post('http://192.168.1.62:8000/api/campaigns', {
        name: eventName,
        creator_name: fullName,
        creator_email: email,
        guest_message: message,
      });

      console.log('✅ Backend response:', response.data);

      const { host_code, guest_code } = response.data;

      navigation.navigate('CreateEventSuccessScreen', {
        hostCode: host_code,
        guestCode: guest_code,
        eventName,
        fullName,
        email,
        message,
      });
    } catch (error) {
      console.error('❌ Axios Error:', error.message);
      Alert.alert('Something went wrong while creating the event.');
    }
  };

  return (
    <CreateEventBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Event</Text>

        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={(text) => setFullName(toTitleCase(text))}
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
          onChangeText={(text) => setEventName(toTitleCase(text))}
          placeholder="Enter your event name"
          maxLength={40}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.inputMessage}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message for your guests to let them know what your goal is and how their gift is helping to make your dream come true"
          multiline
          maxLength={158}
        />

        <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </CreateEventBackground>
  );
}
