import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 34,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
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
  homeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: 80,
  },
  homeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});
