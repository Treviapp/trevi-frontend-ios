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
import HomeButton from '../../Components/HomeButton';

export default function HostCreateMessageScreen({ navigation, route }) {
  const { fullName, email, eventName } = route.params;
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!message) {
      Alert.alert('Please write a message for your guests.');
      return;
    }

    const formData = new FormData();
    formData.append('name', eventName);
    formData.append('creator_name', fullName);
    formData.append('creator_email', email);
    formData.append('guest_message', message);

    if (photo?.uri) {
      formData.append('host_image', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'event_photo.jpg',
      });
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://192.168.1.62:8000/api/campaigns',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const { host_code, guest_code } = response.data;

      navigation.navigate('CreateEventSuccess', {
        hostCode: host_code,
        guestCode: guest_code,
        eventName,
        fullName,
        email,
        message,
        photo,
      });
    } catch (error) {
      console.error('Error creating event:', error.message);
      Alert.alert('Something went wrong while creating the event.');
    } finally {
      setLoading(false);
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

    if (!result.canceled && result.assets?.length > 0) {
      const selected = result.assets[0];
      setPhoto({
        uri: selected.uri,
        type: 'image/jpeg',
        name: selected.fileName || 'event_photo.jpg',
      });
    }
  };

  return (
    <CreateEventBackground>
      <HomeButton />
      <View style={styles.container}>
        <Text style={styles.title}>Your Message</Text>

        <TextInput
          style={styles.inputMessage}
          value={message}
          onChangeText={setMessage}
          placeholder="Let your guests know what their gift will mean to you..."
          multiline
          maxLength={158}
        />

        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          <Text style={styles.photoButtonText}>
            {photo ? 'Change Photo' : 'Upload a Photo'}
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          {photo?.uri && (
            <Image
              source={{ uri: photo.uri }}
              style={[styles.preview, { backgroundColor: '#eee', height: 180 }]}
              resizeMode="contain"
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreateEvent} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Creating Event...' : 'Create Event'}
          </Text>
        </TouchableOpacity>
      </View>
    </CreateEventBackground>
  );
}
