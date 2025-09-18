import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoIntroScreen = () => {
  console.log('✅ VideoIntroScreen mounted');
  const video = useRef(null);
  const navigation = useNavigation();

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('intro_seen', 'true');
    } catch (e) {
      console.log('⚠️ Failed to save intro_seen:', e);
    }
    navigation.replace('Welcome');
  };

  useEffect(() => {
    // Safety fallback: auto-skip if video hasn’t started in 5s
    const timer = setTimeout(() => {
      console.log('⏱️ Video failed to start, skipping intro');
      handleSkip();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        source={require('../../Assets/trevi_intro.mp4')}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        style={styles.video}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) handleSkip();
        }}
        onError={(err) => {
          console.log('❌ Video load error:', err);
          handleSkip();
        }}
      />
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width,
    height,
    position: 'absolute',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoIntroScreen;
