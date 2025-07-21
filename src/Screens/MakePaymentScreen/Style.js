import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
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
    minHeight: 100,
  },
  amountOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
    flexWrap: 'wrap',
  },
  amountButton: {
    backgroundColor: '#e6e3ff', // Light lavender
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 40,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  amountButtonSelected: {
    backgroundColor: '#8e94f2', // Deep purple
  },
  amountButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#444',
  },
  amountButtonTextSelected: {
    color: '#ffffff',
    fontFamily: 'Poppins-SemiBold',
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
  summaryTotal: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
});