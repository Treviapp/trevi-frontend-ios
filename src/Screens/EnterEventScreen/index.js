import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, StyleSheet } from 'react-native';
import styles from './Style';
import EnterEventBackground from '../EnterEventBackground';
import { client } from '../../api/config'; // ✅ axios instance

export default function EnterEventScreen({ navigation }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);
  const slowTimerRef = useRef(null);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const isRetriable = (err) => {
    const status = err?.response?.status;
    // retry on timeouts, network errors, and 5xx
    return err?.code === 'ECONNABORTED' || !status || status >= 500;
  };

  const handleJoin = async () => {
    console.log('🚨 Join Event button was pressed'); // Debug log

    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Validation', 'Please enter an event code.');
      return;
    }

    setLoading(true);
    setSlow(false);
    slowTimerRef.current = setTimeout(() => setSlow(true), 2000);

    const minLoadMs = 900;
    const start = Date.now();

    try {
      let response;
      let lastErr;

      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          response = await client.get(`/campaigns/guest/${trimmed}`, { timeout: 15000 });
          break; // success
        } catch (err) {
          lastErr = err;
          if (attempt === 0 && isRetriable(err)) {
            // small backoff then retry once
            await sleep(700);
            continue;
          }
          throw err; // non-retriable or out of attempts
        }
      }

      const campaign = response.data;
      console.log('✅ Guest campaign found:', campaign); // Success log

      // ensure a minimum spinner time for smooth UX
      const elapsed = Date.now() - start;
      if (elapsed < minLoadMs) await sleep(minLoadMs - elapsed);

      navigation.navigate('EventSummaryScreen', {
        guestCode: campaign.code,
        title: campaign.title,
        host: campaign.host,
      });
    } catch (err) {
      console.error('❌ Guest code error:', err?.message || err);

      const elapsed = Date.now() - start;
      if (elapsed < minLoadMs) await sleep(minLoadMs - elapsed);

      // Friendly error without scaring users during transient lag
      const status = err?.response?.status;
      const msg =
        status === 404
          ? 'Event not found. Please check your code.'
          : 'We’re having trouble finding that event right now. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <EnterEventBackground>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../Assets/Images/doorbell.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Enter Event Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Guest Event Code"
        value={code}
        onChangeText={setCode}
        autoCapitalize="characters"
        editable={!loading}
      />

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={handleJoin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Joining…' : 'Join Event'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.homeButton} onPress={handleGoHome} disabled={loading}>
        <Text style={styles.homeButtonText}>Home</Text>
      </TouchableOpacity>

      {loading && (
        <View style={localStyles.overlay}>
          <ActivityIndicator size="large" />
          <Text style={localStyles.overlayText}>{slow ? 'Still working…' : 'Loading…'}</Text>
        </View>
      )}
    </EnterEventBackground>
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

