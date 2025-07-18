import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#005F5F',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#00CFC1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  card: {
    backgroundColor: '#F0F0F0', // Light background to make it visible
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    color: '#000000', // Text color for the card input
    height: 60,  // Adjusted height for proper visibility
    marginBottom: 20, // Add space below the card input
  },
  cardField: {
    backgroundColor: '#FFFFFF', // White background for the card field
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    height: 60,  // Ensure enough height for the card input
    marginVertical: 20,
  },
});

