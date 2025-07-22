import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './Style';
import HostDashboardBackground from '../HostDashboardBackground';
import { client } from '../../api/config';
import { useNavigation } from '@react-navigation/native';

const FRONTEND_BASE = 'https://trevi.app/enter/';

export default function HostDashboardScreen({ route, navigation }) {
  const initialCode = route?.params?.hostCode || '';
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [donations, setDonations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('👀 initialCode =', initialCode);
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

      console.log('✅ campaign =', data);
      setCampaign(data);
      setDonations(data.donations || []);
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
    donations.reduce((sum, d) => sum + d.amount, 0);

  const handleViewGifts = () => {
    navigation.navigate('GiftListScreen', { hostCode: campaign?.host_code });
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
        </>
      ) : campaign ? (
<<<<<<< HEAD
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {/* ✅ Red debug box */}
          <View style={{ backgroundColor: 'red', padding: 10, margin: 10 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              ✅ ScrollView is showing
            </Text>
          </View>

          <Text style={styles.handwritingTitle}>{campaign.title}</Text>
          <Text style={styles.subHeader}>Hosted by {campaign.host}</Text>

          <Text style={styles.totalRaised}>
            Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
          </Text>

          <View style={{ alignItems: 'center', marginVertical: 5 }}>
            <Text style={styles.qrLabel}>Your Event QR code</Text>
            <QRCode
              value={`${FRONTEND_BASE}${campaign.guest_code}`}
              size={200}
            />
            <Text style={styles.qrText}>Scan the QR code to join the event</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('GiftListScreen', {
                hostCode: campaign?.host_code || 'MISSING',
              })
            }
          >
            <Text style={styles.buttonText}>View My Gifts</Text>
          </TouchableOpacity>

          {donations.map((donation, idx) => (
            <View key={idx} style={styles.donationCard}>
              {donation.photo_path && (
                <Image
                  source={{
                    uri: `${client.defaults.baseURL.replace('/api', '')}/storage/${donation.photo_path.replace('storage/', '')}`,
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.message}>
                {donation.message || '(No message)'}
              </Text>
              <Text style={styles.amount}>
                £{(donation.amount / 100).toFixed(2)}
=======
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
            <Text style={styles.handwritingTitle}>
              {campaign.title || 'No Title'}
            </Text>

            <Text style={styles.subHeader}>
              Hosted by {campaign.host || 'Unknown'}
            </Text>

            <Text style={styles.totalRaised}>
              Total Raised: £{(getTotalRaised() / 100).toFixed(2)}
            </Text>

            <View style={{ alignItems: 'center', marginVertical: 5 }}>
              <Text style={styles.qrLabel}>Your Event QR code</Text>
              <QRCode
                value={`${FRONTEND_BASE}${campaign.guest_code}`}
                size={200}
              />
              <Text style={styles.qrText}>
                Scan the QR code to join the event
>>>>>>> cf009af (Add GiftList screen no Stripe connect yet)
              </Text>
            </View>

            {donations.map((donation, idx) => (
              <View key={idx} style={styles.donationCard}>
                {donation.photo_path && (
                  <Image
                    source={{
                      uri: `${client.defaults.baseURL.replace(
                        '/api',
                        ''
                      )}/storage/${donation.photo_path.replace(
                        'storage/',
                        ''
                      )}`,
                    }}
                    style={styles.image}
                  />
                )}
                <Text style={styles.message}>
                  {donation.message || '(No message)'}
                </Text>
                <Text style={styles.amount}>
                  £{(donation.amount / 100).toFixed(2)}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* ✅ New Button */}
          <TouchableOpacity
            style={styles.viewGiftsButton}
            onPress={handleViewGifts}
          >
            <Text style={styles.viewGiftsButtonText}>View My Gifts</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator style={{ marginTop: 50 }} />
      )}
    </HostDashboardBackground>
  );
}
