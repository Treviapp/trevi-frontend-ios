import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
marginTop:  100,    
marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
 inputMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Keeps the background consistent
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top',  // Ensures text is aligned at the top
     },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
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

