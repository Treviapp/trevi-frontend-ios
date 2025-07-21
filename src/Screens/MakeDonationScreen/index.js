import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './Style';
import MakeDonationBackground from '../MakeDonationBackground';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

export default function MakeDonationScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const handleDonate = async () => {
    if (!name.trim() || !amount.trim()) {
      Alert.alert('Validation', 'Please enter your name and gift amount.');
      return;
    }
    if (!cardDetails?.complete) {
      Alert.alert('Validation', 'Please enter complete card details.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) * 100 }),
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
    <MakeDonationBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Send a Gift</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.inputMessage}
            placeholder="Add a Message (optional)"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (£)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <CardField
            postalCodeEnabled={false}
            placeholder={{ number: '4242 4242 4242 4242' }}
            cardStyle={styles.cardField}
            style={styles.cardContainer}
            onCardChange={setCardDetails}
          />

          <TouchableOpacity style={styles.button} onPress={handleDonate} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Processing...' : 'Send'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </MakeDonationBackground>
  );
}