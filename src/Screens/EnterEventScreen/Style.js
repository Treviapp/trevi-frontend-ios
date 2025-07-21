import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#758239 ', //
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginTop:20,
    marginBottom: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#8e94f2', 
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});