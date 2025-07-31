import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  handwritingTitle: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 38,
    color: '#8e94f2',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 240,           // ✅ taller height
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'contain', // ✅ backup
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#977dff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
});
