import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import styles from './Style';
import MakeDonationBackground from '../MakeDonationBackground';
import * as ImagePicker from 'expo-image-picker';

export default function MakeDonationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [photo, setPhoto] = useState(null);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Please allow access to your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const handleNext = () => {
    if (!name.trim() || !amount.trim()) {
      Alert.alert('Validation', 'Please enter your name and select an amount.');
      return;
    }

    navigation.navigate('MakePaymentScreen', {
      name,
      amount,
      message,
      photo,
    });
  };

  return (
    <MakeDonationBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Send a Gift</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            style={styles.inputMessage}
            placeholder="Add a Message (optional)"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          {/* Amount Buttons */}
          <View style={styles.amountOptions}>
            {['5', '10', '20', '50'].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  amount === value && styles.amountButtonSelected,
                ]}
                onPress={() => setAmount(value)}
              >
                <Text
                  style={[
                    styles.amountButtonText,
                    amount === value && styles.amountButtonTextSelected,
                  ]}
                >
                  £{value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Upload Image */}
          <TouchableOpacity onPress={handlePickImage} style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>
              {photo ? 'Change Photo' : 'Upload a Photo (optional)'}
            </Text>
          </TouchableOpacity>

          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          )}

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </MakeDonationBackground>
  );
}