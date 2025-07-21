import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

export default function CreateEventBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/createevent-bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Ensure content is centered within the background
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Reduced opacity for more visibility of the background
    justifyContent: 'center', // Centers children vertically
    alignItems: 'center', // Centers children horizontally
    padding: 20, // Adds padding around the children elements
  },
});