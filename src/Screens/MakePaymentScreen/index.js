import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './Style';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import MakePaymentBackground from '../MakePaymentBackground';

export default function MakePaymentScreen({ route, navigation }) {
  const { name, amount, message, photo, hostCode } = route.params;
  const { confirmPayment, loading } = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState();
  const treviFee = 1.2;
  const totalAmount = parseFloat(amount) + treviFee;

  const handleConfirmPayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Validation', 'Please enter complete card details.');
      return;
    }

    try {
      const API_URL = 'http://192.168.1.62:8000/api/stripe/payment-intent';
      console.log('📡 Fetch sent to:', API_URL);
      console.log('📦 hostCode being sent:', hostCode);
      console.log('🧪 route.params:', route.params);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(parseFloat(amount) * 100), // Gift amount only (pennies)
          host_code: hostCode,
          name: name ?? '',
          message: message ?? '',
          photo_path: photo?.uri ?? '',
        }),
      });

      const rawText = await response.text();
      console.log('📨 Raw server response text:', rawText);

      try {
        const data = JSON.parse(rawText);
        console.log('✅ Parsed JSON response:', data);

        const clientSecret = data.clientSecret;
        if (!clientSecret) throw new Error('No client secret returned');

        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: { name },
          },
        });

        if (error) {
          Alert.alert('Payment failed', error.message);
        } else if (paymentIntent) {
          navigation.navigate('DonationSuccess', { name, amount });
        }
      } catch (jsonError) {
        console.error('❌ JSON Parse error:', jsonError.message);
        Alert.alert('Error', 'Unexpected server response. Please try again.');
      }
    } catch (err) {
      console.error('❌ Stripe payment error:', err);
      Alert.alert('Error', err.message || 'Could not process payment. Please try again.');
    }
  };

  return (
    <MakePaymentBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Confirm & Pay</Text>

          <Text style={styles.summary}>Gift Amount: £{amount}</Text>
          <Text style={styles.summary}>Trevi Fee: £1.20</Text>
          <Text style={styles.summaryTotal}>
            Total to Pay: £{totalAmount.toFixed(2)}
          </Text>

          {message ? <Text style={styles.summary}>Message: {message}</Text> : null}

          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <CardField
            postalCodeEnabled={false}
            placeholder={{ number: '4242 4242 4242 4242' }}
            cardStyle={styles.cardField}
            style={styles.cardContainer}
            onCardChange={setCardDetails}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleConfirmPayment}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Processing...' : 'Confirm & Pay'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </MakePaymentBackground>
  );
}

