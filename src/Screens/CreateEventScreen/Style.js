import { StyleSheet, Dimensions } from 'react-native';

// Get screen width to set a max width for the input field
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 30,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  inputMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Keeps the background consistent
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 40,
    width: screenWidth - 64,  // Reduced width to make it slightly smaller
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',  // Ensures text is aligned at the top
    minHeight: 120,  // Reasonable minimum height for comfort
    maxHeight: 120,  // Maximum height limit
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 2,
    alignItems: 'center',
    width: '100%',
    marginTop: 60,  // Added marginTop to move the button down
  },
  buttonText: {
    color: '000000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});