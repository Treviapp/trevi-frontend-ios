import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#005F5F',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,  // Increased padding for bigger button height
    paddingHorizontal: 40, // Increased horizontal padding for wider button
    borderRadius: 12, // Adjust the border radius to match the new size
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '000000',
    fontSize: 18,  // Increased font size for bigger text
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});