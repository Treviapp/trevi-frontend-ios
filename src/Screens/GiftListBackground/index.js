import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './Style';

export default function GiftListBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/bg-light-purple.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}
