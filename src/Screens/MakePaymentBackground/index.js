import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import styles from './Style'; // ✅ ADD THIS LINE
import backgroundImage from '../../Assets/Images/makepayment-bg.png'; // Replace with your image

export default function MakePaymentBackground({ children }) {
  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}
