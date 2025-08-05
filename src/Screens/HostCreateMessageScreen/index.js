import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import styles from './Style';
import { API_BASE_URL } from '../../api/config';

const HostCreateMessageScreen = ({ route, navigation }) => {
  const { fullName, email, eventName } = route.params;
  const [guestMessage, setGuestMessage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !eventName) {
      Alert.alert('Missing fields', 'Please go back and complete all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('creator_name', fullName);
    formData.append('creator_email', email);
    formData.append('name', eventName);
    formData.append('guest_message', guestMessage);

    if (image) {
      formData.append('host_image', {
        uri: image.uri,
        name: 'host_image.jpg',
        type: 'image/jpeg',
      });
    }

    setLoading(true);

    try {
console.log('📤 Sending formData to:', `${API_BASE_URL}/campaigns`);
console.log('📝 Form data:', formData);
      const response = await axios.post(`${API_BASE_URL}/campaigns`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { host_code, guest_code } = response.data;

      navigation.navigate('CreateEventSuccess', {
        hostCode: host_code,
        guestCode: guest_code,
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      Alert.alert('Error', 'Something went wrong while creating the event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message for Guests</Text>

      <TextInput
        style={styles.inputMessage}
        placeholder="Write a short message to your guests. Let them know what their gift is going towards..."
        value={guestMessage}
        onChangeText={setGuestMessage}
        multiline
      />

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>
          {image ? 'Change Photo' : 'Add a Photo'}
        </Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Event</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HostCreateMessageScreen;
