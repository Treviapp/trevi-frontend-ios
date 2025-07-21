import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    width: '100%',
  },
  inputMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',
    width: '100%',
  },
  cardContainer: {
    width: '100%',
    height: 60,
    marginVertical: 20,
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
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});
