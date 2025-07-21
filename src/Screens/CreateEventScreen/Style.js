import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputMessage: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    height: 100,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  photoButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#333',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#8e94f2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
