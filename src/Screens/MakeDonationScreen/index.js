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

export default function MakeDonationScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [photo, setPhoto] = useState(null);

  const hostCode = route?.params?.hostCode; // ✅ Get hostCode passed from previous screen

  const handleDonate = () => {
    if (!name.trim() || !amount.trim()) {
      Alert.alert('Validation', 'Please enter your name and select an amount.');
      return;
    }

    if (!hostCode) {
      Alert.alert('Missing Data', 'Missing host code. Please try again.');
      return;
    }

    console.log('📦 Passing hostCode to MakePaymentScreen:', hostCode);

    navigation.navigate('MakePaymentScreen', {
      name,
      amount,
      message,
      photo,
      hostCode,
    });
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
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

  const amountOptions = [
    { value: '5', color: '#FFDDC1' },
    { value: '10', color: '#C1E1FF' },
    { value: '20', color: '#D1FFC1' },
    { value: '50', color: '#F3C1FF' },
  ];

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

          <View style={{ width: '100%' }}>
            <TextInput
              style={styles.inputMessage}
              placeholder="Add a Message (optional)"
              value={message}
              onChangeText={(text) => text.length <= 150 && setMessage(text)}
              multiline
            />
            <Text style={{ textAlign: 'right', marginTop: 4, color: '#888' }}>
              {message.length} / 150
            </Text>
          </View>

          <View style={styles.amountOptions}>
            {amountOptions.map(({ value, color }) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  { backgroundColor: color },
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

          <TouchableOpacity style={styles.button} onPress={handleDonate}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </MakeDonationBackground>
  );
}
