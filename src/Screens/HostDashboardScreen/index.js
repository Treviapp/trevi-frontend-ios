import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './Style';
import HostDashboardBackground from '../HostDashboardBackground';
import { client } from '../../api/config';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import axios from 'axios';

const FRONTEND_BASE = 'https://trevi.app/enter/';

export default function HostDashboardScreen({ route, navigation }) {
  const initialCode = route?.params?.hostCode || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const navigationHook = useNavigation();

  useEffect(() => {
    if (initialCode) {
      handleLoadDashboard();
    }
  }, [initialCode]);

  const handleLoadDashboard = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      Alert.alert('Please enter your host code');
      return;
    }

    setLoading(true);
    try {
      const res = await client.get(`/campaigns/host/${trimmed}`);
      const data = res.data;

      setCampaign(data);
      setDonations(data.donations || []);
      console.log('🧪 Donations loaded:', data.donations);
    } catch (err) {
      if (err.response?.status === 404) {
        Alert.alert('Campaign not found');
      } else if (err.message === 'Network Error') {
        Alert.alert('Network error', 'Check your connection');
      } else {
        Alert.alert('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

  const getTotalRaised = () =>
    donations.reduce((sum, d) => sum + (d.net_payout || 0), 0);

  const handleViewGifts = () => {
    navigation.navigate('GiftListScreen', { hostCode: campaign?.host_code });
  };

  const handleConnectStripe = async () => {
    try {
      const res = await axios.post(`${client.defaults.baseURL}/stripe/connect`, {
        host_code: campaign?.host_code,
      });

      const url = res.data.url || res.data.onboarding_url;
      if (url) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No onboarding URL returned.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Stripe Error', 'Could not start onboarding.');
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Welcome');
  };

  return (
    <HostDashboardBackground>
      {!campaign && !initialCode ? (
        <>
          <Text style={styles.label}>Enter Your Host Code</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. HOST123"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoadDashboard}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>View Dashboard</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </>
      ) : campaign ? (
        <>
          <View style={{ paddingBottom: 20 }}>
            <Text style={styles.handwritingTitle}>{campaign.title}</Text>
            <Text style={styles.subHeader}>Hosted by {campaign.host}</Text>

            <Text style={styles.totalRaised}>
              Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
            </Text>

            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Text style={styles.qrLabel}>Your Event QR code</Text>
              <QRCode
                value={`${FRONTEND_BASE}${campaign.guest_code}`}
                size={140}
              />
              <Text style={styles.qrText}>Scan the QR code to join the event</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleConnectStripe}>
              <Text style={styles.buttonText}>Click here to link your bank account to your event</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.viewGiftsButton}
            onPress={handleViewGifts}
          >
            <Text style={styles.viewGiftsButtonText}>View My Gifts</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator style={{ marginTop: 50 }} />
      )}
    </HostDashboardBackground>
  );
}

