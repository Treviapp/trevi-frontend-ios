// src/Screens/StripeLinkingScreen/Style.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
note: {
  fontSize: 14,
  color: '#555',
  textAlign: 'center',
  marginHorizontal: 20,
  marginTop: 10,
  marginBottom: 20,
  fontFamily: 'Poppins-Regular',
},
});
