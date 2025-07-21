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
  const { name, amount, message, photo } = route.params;
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
      const response = await fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }), // Convert to cents
      });
      const { clientSecret } = await response.json();
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
    } catch (err) {
      console.error('❌ Stripe payment error:', err);
      Alert.alert('Error', 'Could not process payment. Please try again.');
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
