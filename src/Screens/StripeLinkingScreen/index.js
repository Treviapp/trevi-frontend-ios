import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  Image,
} from 'react-native';
import styles from './Style';
import { API_BASE_URL, client } from '../../api/config';
import axios from 'axios';

export default function StripeLinkingScreen({ route, navigation }) {
  const { fullName, email, eventName, guestMessage, image } = route.params;
  const [loading, setLoading] = useState(false);

  const handleConnectStripe = async () => {
    setLoading(true);

    try {
      // 1. Create the campaign
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

      console.log('📤 Creating campaign with:', {
        fullName,
        email,
        eventName,
        guestMessage,
        imagePresent: !!image,
      });

      const campaignRes = await axios.post(`${API_BASE_URL}/campaigns`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { host_code, guest_code } = campaignRes.data;
      console.log('✅ Campaign created with host_code:', host_code);

      // 2. Connect to Stripe with host_code
      console.log('📡 Sending host_code to Stripe connect:', host_code);

      const stripeRes = await client.post('/stripe/connect', {
        host_code, // ✅ make sure it's snake_case
      });

      const url = stripeRes.data.url || stripeRes.data.onboarding_url;

      if (url) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Stripe link not available.');
      }

      // 3. Navigate to success screen
      navigation.navigate('CreateEventSuccess', {
        hostCode: host_code,
        guestCode: guest_code,
      });
    } catch (error) {
      console.error('❌ Stripe linking error:', error);
      Alert.alert('Error', 'Something went wrong while setting up your event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almost There!</Text>
      <Text style={styles.subtitle}>
        To receive donations, please link your bank account using Stripe.
      </Text>

      <Image
        source={require('../../Assets/Images/cauldronfairy.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleConnectStripe}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Connect with Stripe</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

