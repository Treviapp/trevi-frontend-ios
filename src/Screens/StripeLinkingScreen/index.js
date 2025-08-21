import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './Style';
import { API_BASE_URL, client } from '../../api/config';
import axios from 'axios';

export default function StripeLinkingScreen({ route }) {
  const { fullName, email, eventName, guestMessage, image } = route.params;
  const [loading, setLoading] = useState(false);

  const handleConnectStripe = async () => {
    setLoading(true);

    try {
      // 1) Create the campaign
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

      const campaignRes = await axios.post(`${API_BASE_URL}/campaigns`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { host_code } = campaignRes.data;

      // 2) Create Stripe onboarding link using host_code
      const stripeRes = await client.post('/stripe/connect', { hostCode: host_code });

      const url = stripeRes.data.url || stripeRes.data.onboarding_url;

      if (url) {
        Linking.openURL(url);
        // ⚠️ Do NOT navigate manually here — deep link will bring user back
      } else {
        Alert.alert('Error', 'Stripe link not available.');
      }
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

      <Text style={styles.note}>
        Stripe will securely collect your details so we can send your funds. If this is a
        personal event, select <Text style={{ fontWeight: 'bold' }}>Individual/Sole Trader</Text> when asked.
        When you’ve finished, return to Trevi to continue.
      </Text>

      <Animatable.Image
        animation="float"
        iterationCount="infinite"
        easing="ease-in-out"
        duration={3000}
        source={require('../../Assets/Images/fairybike.png')}
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
