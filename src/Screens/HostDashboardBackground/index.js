import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';

export default function HostDashboardBackground({ children }) {
  return (
    <ImageBackground
      source={require('../../Assets/Images/hostdashboard-bg.png')}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.imageFade}   // ⬅️ fade the background image only
      blurRadius={0}                  // ⬅️ optional soft blur (tweak or remove)
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  // Lower = fainter. Try 0.15–0.35 until it feels right.
  imageFade: {
    opacity: 0.42,
  },
  // Increase the alpha here if you want an extra white wash over the image.
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.12)', // e.g., 0.2 for more fade
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
