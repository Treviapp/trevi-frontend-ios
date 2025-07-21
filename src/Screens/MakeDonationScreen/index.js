import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, Alert, View } from 'react-native';
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
      // 1. Get a PaymentIntent client secret from your backend
      const response = await fetch('http://localhost:8000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) * 100 }), // amount in cents
      });
      const { clientSecret } = await response.json();
      if (!clientSecret) throw new Error('No client secret returned from backend');

      // 2. Confirm the payment
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
    <View style={{ flex: 1 }}>
      <MakeDonationBackground>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Send a Gift</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Add a Message (optional)"
            value={message}
            onChangeText={setMessage}
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (£)"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      </MakeDonationBackground>

      {/* Move CardField outside the background wrapper */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CardField
          postalCodeEnabled={false}
          placeholder={{ number: '4242 4242 4242 4242' }}
          cardStyle={styles.cardField}  // Capital F for correct style
          style={{ width: '90%', height: 60, marginVertical: 20 }}
          onCardChange={setCardDetails}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDonate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Send Gift'}</Text>
      </TouchableOpacity>
    </View>
  );
}