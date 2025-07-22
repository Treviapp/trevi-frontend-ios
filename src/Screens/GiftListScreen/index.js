import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
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
=======
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import GiftListBackground from '../GiftListBackground';
import styles from './Style';
import axios from 'axios';

const GiftListScreen = ({ route }) => {
  const { hostCode } = route.params;
>>>>>>> cf009af (Add GiftList screen no Stripe connect yet)
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const fetchGifts = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.62:8000/api/campaigns/${hostCode}/giftreel`
        );
        setGifts(response.data.messages || []);
      } catch (error) {
        console.error('Error fetching gift list:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGifts();
  }, [hostCode]);

  const renderGift = ({ item }) => (
    <View style={styles.giftCard}>
      <Text style={styles.name}>{item.name || 'Anonymous'}</Text>
      <Text style={styles.message}>{item.message}</Text>
      {item.photo && (
        <Image
          source={{ uri: `http://192.168.1.62:8000/storage/${item.photo}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.timestamp}>{item.created_at}</Text>
    </View>
  );

  return (
    <GiftListBackground>
      <Text style={styles.title}>🎁 Gifts You've Received</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : gifts.length === 0 ? (
        <Text style={styles.noGifts}>No gifts yet. Check back later!</Text>
      ) : (
        <FlatList
          data={gifts}
          renderItem={renderGift}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </GiftListBackground>
  );
};

export default GiftListScreen;
>>>>>>> cf009af (Add GiftList screen no Stripe connect yet)
