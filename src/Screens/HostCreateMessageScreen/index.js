import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Animatable from 'react-native-animatable';
import styles from './Style';

const HostCreateMessageScreen = ({ route, navigation }) => {
  // ✅ Safe params with defaults
  const { fullName = '', email = '', eventName = '' } = route?.params ?? {};
  const [guestMessage, setGuestMessage] = useState('');
  const [image, setImage] = useState(null); // { uri, width, height, ... }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.5,
    });

    // supports both new (canceled) and old (cancelled)
    const userCancelled = result.canceled ?? result.cancelled;
    if (!userCancelled && result.assets && result.assets[0]) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!fullName || !email || !eventName) {
      Alert.alert('Missing info', 'Please start from the Create Event screen.');
      navigation.navigate('CreateEventScreen');
      return;
    }

    // 🚀 No backend call here — pass along to StripeLinkingScreen
    navigation.navigate('StripeLinkingScreen', {
      fullName,
      email,
      eventName,
      guestMessage,
      image,
    });
  };

  const aspectRatio =
    image?.width && image?.height ? image.width / image.height : 1;

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
          style={{ paddingBottom: 10 }}
        >
          {/* 🧚 Fixed fairy at the top */}
          <Animatable.Image
            animation="pulse"
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Next</Text>
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
    marginTop: 10,
    marginBottom: 10,
  },
  previewWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: undefined, // derived from aspectRatio
    maxHeight: 250,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

export default HostCreateMessageScreen;

