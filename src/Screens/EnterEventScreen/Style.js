import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000', // ✅ Removed trailing space
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
    marginTop: 20,
    marginBottom: 40,
    width: '100%',
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  homeButton: {
    marginTop: 16,    backgroundColor: '#ccc',

    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#333',
    fontSize: 16,
  },
});
