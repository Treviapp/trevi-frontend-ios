import React from 'react';
<<<<<<< HEAD
import { View, ImageBackground } from 'react-native';
import styles from './Style';

export default function GiftListBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/bg-light-purple.png')}
=======
import { ImageBackground, View } from 'react-native';
import styles from './Style';

const GiftListBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/giftlist-bg.png')}
>>>>>>> cf009af (Add GiftList screen no Stripe connect yet)
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
<<<<<<< HEAD
}
=======
};

export default GiftListBackground;
>>>>>>> cf009af (Add GiftList screen no Stripe connect yet)
