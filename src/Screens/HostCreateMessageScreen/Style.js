// C:\Users\Amanda Hughes\Projects\trevi-frontend\src\Screens\HostCreateMessageScreen\Style.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 30,
paddingTop: 20, 
    justifyContent: 'flex-start',   // ⬅️ shift layout to top
                   // ⬅️ creates space for fairy
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    color: '#000000',
  },
  inputMessage: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    height: 180,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  photoButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
    width: '60%',
  },
  photoButtonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
  },
  preview: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#8e94f2',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});
