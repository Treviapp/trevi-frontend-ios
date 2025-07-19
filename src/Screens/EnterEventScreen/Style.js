import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#FFFFFF', // deep aquamarine tone
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFFFFF', 
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});