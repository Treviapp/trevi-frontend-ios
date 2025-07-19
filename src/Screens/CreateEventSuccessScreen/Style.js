import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4C2A85', // deep purple
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#4C2A85',
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  value: {
    fontSize: 16,
    color: '#444',
    fontFamily: 'Poppins-Regular',
  },
  messageBox: {
    fontSize: 16,
    color: '#444',
    backgroundColor: '#F8F8F8',
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    fontFamily: 'Poppins-Regular',
  },
  code: {
    fontSize: 20,
    color: '#005F5F',
    fontWeight: 'bold',
    marginTop: 4,
    fontFamily: 'Poppins-Bold',
  },
  note: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#FF4081', // vibrant pink
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});