import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // You can change this to (0,0,0,0.6) if you want a darker overlay
    paddingTop: 60,
  },
});
