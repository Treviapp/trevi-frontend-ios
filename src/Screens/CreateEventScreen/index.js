import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './Style';
import { API_BASE_URL, client } from '../../api/config';
import axios from 'axios';

export default function StripeLinkingScreen({ route, navigation }) {
  const { fullName, email, eventName, guestMessage, image } = route.params;
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const [createdCodes, setCreatedCodes] = useState(null); // ⬅️ store host/guest codes for continue button
  const slowTimerRef = useRef(null);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const isRetriable = (err) => {
    const status = err?.response?.status;
    return err?.code === 'ECONNABORTED' || !status || status >= 500;
  };

  const createCampaign = async (formData) => {
    let lastErr;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log('📡 POST /campaigns (attempt', attempt + 1, ')');
        const res = await axios.post(`${API_BASE_URL}/campaigns`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 20000,
        });
        return res.data;
      } catch (err) {
        lastErr = err;
        console.warn('⚠️ create campaign error:', err?.message || err);
        if (attempt === 0 && isRetriable(err)) {
          await sleep(700);
          continue;
        }
        throw lastErr;
      }
    }
  };

  const createStripeLink = async (host_code) => {
    let lastErr;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log('📡 POST /stripe/connect (attempt', attempt + 1, ')', { hostCode: host_code });
        const res = await client.post('/stripe/connect', { hostCode: host_code }, { timeout: 15000 });
        return res.data;
      } catch (err) {
        lastErr = err;
        console.warn('⚠️ stripe connect error:', err?.message || err);
        if (attempt === 0 && isRetriable(err)) {
          await sleep(700);
          continue;
        }
        throw lastErr;
      }
    }
  };

  const handleConnectStripe = async () => {
    setLoading(true);
    setSlow(false);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => setSlow(true), 2000);

    const minLoadMs = 900;
    const start = Date.now();

    try {
      // 1) Create the campaign
      const formData = new FormData();
      formData.append('creator_name', fullName);
      formData.append('creator_email', email);
      formData.append('name', eventName);
      formData.append('guest_message', guestMessage);

      if (image?.uri) {
        formData.append('host_image', {
          uri: image.uri,
          name: 'host_image.jpg',
          type: 'image/jpeg',
        });
      }

      console.log('📡 About to POST campaign to:', `${API_BASE_URL}/campaigns`);
      const campaignData = await createCampaign(formData);
      const { host_code, guest_code } = campaignData || {};
      if (!host_code) throw new Error('No host_code returned from server');
      console.log('✅ Campaign created, host_code:', host_code, 'guest_code:', guest_code);

      // Store codes for the "Continue" button
      setCreatedCodes({
        hostCode: host_code,
        guestCode: guest_code || '',
        eventName,
        fullName,
        email,
        message: guestMessage,
        photo: image,
        status: campaignData?.status,
      });

      // 2) Create Stripe onboarding link
      const stripeData = await createStripeLink(host_code);
      console.log('✅ Stripe response:', stripeData);

      const url = stripeData?.url || stripeData?.onboarding_url;
      if (!url) throw new Error('Stripe link not available from server response');

      console.log('🔗 Opening Stripe URL:', url);
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) throw new Error('Cannot open Stripe URL on this device');
      await Linking.openURL(url);
    } catch (error) {
      console.error('❌ Stripe linking error (full):', JSON.stringify(error?.response?.data || error, null, 2));
      if (error?.response) {
        console.error('🔴 Response status:', error.response.status);
      }
      Alert.alert('Error', 'Something went wrong while setting up your event. Please try again.');
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < minLoadMs) await sleep(minLoadMs - elapsed);

      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!createdCodes) return;
    navigation.navigate('CreateEventSuccessScreen', {
      ...createdCodes,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almost There!</Text>

      <Text style={styles.subtitle}>
        To receive donations, please link your bank account using Stripe.
      </Text>

      <Text style={styles.note}>
        Stripe will securely collect your details so we can send your funds. If this is a{' '}
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

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleConnectStripe} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Connect with Stripe</Text>}
      </TouchableOpacity>

      {/* After campaign is created, let the user continue to codes */}
      {!loading && createdCodes && (
        <TouchableOpacity style={[styles.button, { marginTop: 12 }]} onPress={handleContinue}>
          <Text style={styles.buttonText}>I’ve finished linking — Show my event codes</Text>
        </TouchableOpacity>
      )}

      {loading && (
        <View style={localStyles.overlay}>
          <ActivityIndicator size="large" />
          <Text style={localStyles.overlayText}>{slow ? 'Still working…' : 'Loading…'}</Text>
        </View>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  overlayText: {
    marginTop: 10,
    fontSize: 16,
  },
});
