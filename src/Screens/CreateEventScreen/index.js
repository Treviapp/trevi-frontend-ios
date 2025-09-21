import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './Style';

export default function CreateEventScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [eventName, setEventName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid =
    fullName.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(email.trim()) &&
    eventName.trim().length > 1;

  const handleNext = () => {
    if (!isValid) {
      Alert.alert(
        'Please complete all fields',
        'Enter your name, a valid email, and an event name.'
      );
      return;
    }
    setSubmitting(true);
    navigation.navigate('HostCreateMessage', {
      fullName: fullName.trim(),
      email: email.trim(),
      eventName: eventName.trim(),
    });
    setSubmitting(false);
  };

  const handleGoHome = () => navigation.navigate('Welcome');

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={[styles.container, localStyles.content]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* —— Form block (top) —— */}
          <View style={localStyles.formBlock}>
            <Text style={styles.title}>Start a New Event</Text>

            <Text style={styles.label}>Your Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex Smith"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. alex@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />

            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex’s Graduation"
              value={eventName}
              onChangeText={setEventName}
              autoCapitalize="words"
              returnKeyType="done"
            />

            <TouchableOpacity
              style={[styles.button, (!isValid || submitting) && { opacity: 0.6 }]}
              onPress={handleNext}
              disabled={!isValid || submitting}
            >
              <Text style={styles.buttonText}>
                {submitting ? 'Please wait…' : 'Create Event'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
              <Text style={styles.homeButtonText}>Home</Text>
            </TouchableOpacity>
          </View>

          {/* —— Fairy at the bottom —— */}
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            easing="ease-in-out"
            duration={3000}
            style={localStyles.heroWrapBottom}
          >
            <Image
              source={require('../../Assets/Images/cauldronfairy.png')}
              style={localStyles.hero}
              resizeMode="contain"
            />
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const localStyles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  formBlock: {
    width: '100%',
  },
  heroWrapBottom: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  hero: {
    width: 220,
    height: 220,
    opacity: 0.98,
  },
});
