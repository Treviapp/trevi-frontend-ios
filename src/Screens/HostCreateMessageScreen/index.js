import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import styles from './Style';
import { API_BASE_URL } from '../../api/config';

const HostCreateMessageScreen = ({ route, navigation }) => {
  const { fullName, email, eventName } = route.params;
  const [guestMessage, setGuestMessage] = useState('');
  const [image, setImage] = useState(null);        // { uri, width, height, ... }
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

    if (!result.cancelled && result.assets && result.assets[0]) {
      setImage(result.assets[0]); // includes width/height
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
      const response = await axios.post(`${API_BASE_URL}/debug/campaign`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { host_code, guest_code } = response.data;

      navigation.navigate('StripeLinkingScreen', {
        hostCode: host_code,
        guestCode: guest_code,
        fullName,
        email,
        eventName,
        guestMessage,
        image,
      });
    } catch (error) {
      console.error('Error creating campaign:', error);
      Alert.alert('Error', 'Something went wrong while creating the event.');
    } finally {
      setLoading(false);
    }
  };

  // Compute aspect ratio for correct non-cropped preview
  const aspectRatio = image?.width && image?.height ? image.width / image.height : 1;

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ paddingBottom: 10 }} // To avoid extra scroll at bottom
        >
          {/* 🧚 Fixed fairy at the top */}
          <Animatable.Image
            animation="float"
            iterationCount="infinite"
            easing="ease-in-out"
            source={require('../../Assets/Images/flyingfairyscroll.png')}
            style={localStyles.fairy}
            resizeMode="contain"
          />

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

          {/* Non-cropping preview */}
          {image && (
            <View style={localStyles.previewWrapper}>
              <Image
                source={{ uri: image.uri }}
                style={[localStyles.preview, { aspectRatio }]}
                resizeMode="contain"
              />
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Next</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const localStyles = StyleSheet.create({
  fairy: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10, // Tightened the space
    marginBottom: 10, // Reduced bottom space
  },
  previewWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: undefined,   // height derived from aspectRatio
    maxHeight: 250,      // Limit height for the preview
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

export default HostCreateMessageScreen;
