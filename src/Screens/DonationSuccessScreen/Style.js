import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, // ✅ ensures full height usage
    backgroundColor: '#fff', // you can change if you want themed BG
    padding: 20,
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    color: '#dbf6bf',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 20,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 200,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

