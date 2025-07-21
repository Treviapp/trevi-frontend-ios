import { StyleSheet, Dimensions } from 'react-native';

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
    width: screenWidth - 48,
    fontFamily: 'Poppins-Regular',
  },
  inputMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 40,
    width: screenWidth - 48,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',
    minHeight: 120,
    maxHeight: 120,
  },
  cardContainer: {
    width: screenWidth - 48,
    height: 60,
    marginVertical: 20,
    alignSelf: 'center',
  },
  cardField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    height: 60,
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    width: screenWidth - 48,
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});
