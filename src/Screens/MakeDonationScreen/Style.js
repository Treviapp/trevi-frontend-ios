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
  },
  amountButton: {
    backgroundColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  amountButtonSelected: {
    backgroundColor: '#8e94f2',
  },
  amountButtonText: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  amountButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  uploadButton: {
    marginBottom: 20,
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  uploadButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
  },
  previewImage: {
    width: screenWidth - 48,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
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