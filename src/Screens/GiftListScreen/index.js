import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import styles from './Style';
import GiftListBackground from '../GiftListBackground';
import { client } from '../../api/config';

export default function GiftListScreen({ route }) {
  const hostCode = route?.params?.hostCode || '';
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const mounted = useRef(true);
  const slowTimerRef = useRef(null);
  const giftsRef = useRef(gifts);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    giftsRef.current = gifts;
  }, [gifts]);

  useEffect(() => {
    if (hostCode) {
      loadInitial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hostCode]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const dedupeGifts = (rawGifts = []) => {
    const seen = new Set();
    return rawGifts.filter((gift) => {
      const key =
        gift.payment_intent_id ||
        `${gift.message}-${gift.amount}-${gift.created_at}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const loadInitial = async () => {
    setLoading(true);
    setSlow(false);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => setSlow(true), 2000);

    const minLoadMs = 900;
    const start = Date.now();

    try {
      const res = await client.get(`/campaigns/host/${hostCode}`, { timeout: 15000 });
      const uniqueGifts = dedupeGifts(res.data?.donations || []);
      if (!mounted.current) return;
      setGifts(uniqueGifts);
    } catch (err) {
      console.error(err);
      if (!mounted.current) return;
      // Keep the UX calm; only alert if it’s clearly not transient
      Alert.alert('Error', 'Unable to fetch gifts right now. Please try again.');
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < minLoadMs) await sleep(minLoadMs - elapsed);
      if (!mounted.current) return;
      setLoading(false);
      if (slowTimerRef.current) {
        clearTimeout(slowTimerRef.current);
        slowTimerRef.current = null;
      }
      // Short first-open sync window to catch webhook delay
      startInitialSync();
    }
  };

  const startInitialSync = async () => {
    setSyncing(true);
    const backoffs = [1200, 1700, 2500, 3500, 5000]; // ~14–16s total + jitter
    const t0 = Date.now();
    const MAX_MS = 20000;

    let i = 0;
    while (mounted.current && Date.now() - t0 < MAX_MS) {
      // wait with a little jitter
      const delay = backoffs[Math.min(i, backoffs.length - 1)] + Math.floor(Math.random() * 300);
      await sleep(delay);
      if (!mounted.current) break;

      try {
        const res = await client.get(`/campaigns/host/${hostCode}`, { timeout: 12000 });
        const uniqueGifts = dedupeGifts(res.data?.donations || []);
        if (!mounted.current) break;

        // Update if the list size changed (new gift landed)
        if (uniqueGifts.length !== giftsRef.current.length) {
          setGifts(uniqueGifts);
          break; // stop polling once we see a change
        }
      } catch (_e) {
        // Swallow and continue—this is a soft sync phase
      }
      i++;
    }
    if (mounted.current) setSyncing(false);
  };

  return (
    <GiftListBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Gifts</Text>

        {loading ? (
          <View style={localStyles.center}>
            <ActivityIndicator size="large" color="#8e94f2" />
            <Text style={localStyles.loadingText}>{slow ? 'Still working…' : 'Loading…'}</Text>
          </View>
        ) : gifts.length === 0 ? (
          <>
            {syncing && (
              <View style={localStyles.syncRow}>
                <ActivityIndicator size="small" />
                <Text style={localStyles.syncText}>Checking for new gifts…</Text>
              </View>
            )}
            <Text style={styles.emptyText}>No gifts received yet.</Text>
          </>
        ) : (
          <>
            {syncing && (
              <View style={localStyles.syncRow}>
                <ActivityIndicator size="small" />
                <Text style={localStyles.syncText}>Updating…</Text>
              </View>
            )}
            {gifts.map((gift, index) => (
              <View key={index} style={styles.giftCard}>
                {gift.photo_url && (
                  <Image
                    source={{ uri: gift.photo_url }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                )}
                <Text style={styles.name}>
                  {gift.name?.trim() ? gift.name : 'Anonymous'}
                </Text>
                <Text style={styles.message}>
                  {gift.message || '(No message)'}
                </Text>
                <Text style={styles.amount}>
                  £{((gift.net_payout || 0) / 100).toFixed(2)}
                </Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </GiftListBackground>
  );
}

const localStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  syncText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

