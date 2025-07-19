import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import axios from 'axios';

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
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Event</Text>

      <Text style={styles.label}>Your Full Name:</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email Address:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Enter your event name"
      />

      <Text style={styles.label}>Greeting Message:</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Write a message for your guests"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}
