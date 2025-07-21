import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import styles from './Style';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import CreateEventBackground from '../CreateEventBackground';

// 🔤 Capitalize first letter of each word
const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleCreateEvent = async () => {
    console.log('🚨 Create Event button pressed');

    if (!fullName || !email || !eventName || !message) {
      Alert.alert('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', toTitleCase(eventName));
    formData.append('creator_name', toTitleCase(fullName));
    formData.append('creator_email', email);
    formData.append('guest_message', message);

    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'event_photo.jpg',
      });
    }

    try {
      console.log('📡 Sending request to backend...');

      const response = await axios.post(
        'http://192.168.1.62:8000/api/campaigns',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('✅ Backend response:', response.data);

      const { host_code, guest_code } = response.data;

      navigation.navigate('CreateEventSuccessScreen', {
        hostCode: host_code,
        guestCode: guest_code,
        eventName,
        fullName,
        email,
        message,
        photo, // pass image to next screen if needed
      });
    } catch (error) {
      console.error('❌ Axios Error:', error.message);
      Alert.alert('Something went wrong while creating the event.');
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow photo access to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
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

        <TextInput
          style={styles.inputMessage}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message for your guests to let them know what your goal is and how their gift is helping to make your dream come true"
          multiline
          maxLength={158}
        />

        {/* Upload Photo */}
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>
            {photo ? 'Change Photo' : 'Upload a Photo'}
          </Text>
        </TouchableOpacity>

        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={styles.preview}
            resizeMode="cover"
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    </CreateEventBackground>
  );
}
