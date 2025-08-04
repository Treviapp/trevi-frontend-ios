import React from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './Style';

const DonationSuccessBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../Assets/Images/donationsuccess-bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  );
};

export default DonationSuccessBackground;
