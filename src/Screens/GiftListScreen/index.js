import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './Style';
import GiftListBackground from '../GiftListBackground';
import { client } from '../../api/config';

export default function GiftListScreen({ route }) {
  const hostCode = route?.params?.hostCode || '';
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostCode) {
      fetchGifts();
    }
  }, [hostCode]);

  const fetchGifts = async () => {
    try {
      const res = await client.get(`/campaigns/host/${hostCode}`);
      setGifts(res.data.donations || []);
    } catch (err) {
      console.error(err);
      Alert.alert('Error fetching gifts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GiftListBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Gifts</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#8e94f2" />
        ) : gifts.length === 0 ? (
          <Text style={styles.emptyText}>No gifts received yet.</Text>
        ) : (
          gifts.map((gift, index) => (
            <View key={index} style={styles.giftCard}>
              {gift.photo_path && (
                <Image
                  source={{
                    uri: `${client.defaults.baseURL.replace('/api', '')}/storage/${gift.photo_path.replace('storage/', '')}`,
                  }}
                  style={styles.image}
                />
              )}
              <Text style={styles.message}>{gift.message || '(No message)'}</Text>
              <Text style={styles.amount}>£{(gift.amount / 100).toFixed(2)}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </GiftListBackground>
  );
}
