import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 60,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  summary: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#444',
    marginBottom: 5,
    textAlign: 'center',
  },
  summaryTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginVertical: 20,
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
    paddingVertical: 16,
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