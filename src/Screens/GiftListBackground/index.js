import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './Style';
import giftlistBackground from '../../Assets/Images/giftlist-bg.png';

export default function GiftListBackground({ children }) {
  return (
    <ImageBackground source={giftlistBackground} style={styles.background}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}
