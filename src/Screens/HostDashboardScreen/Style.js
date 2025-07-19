import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Poppins-Bold', // Poppins Bold
    fontSize: 20,
    marginBottom: 10,
    color: '#4C2A85',
  },
  section: {
    marginVertical: 15,
  },
  qrLabel: {
    fontFamily: 'Poppins-SemiBold', // Poppins SemiBold
    fontSize: 30,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  subHeader: {
    fontFamily: 'Poppins-SemiBold', // Poppins SemiBold
    fontSize: 20,  // Adjust font size as needed
    color: '#444',  // Color for visibility
    textAlign: 'center',  // Center align the text
  },
  totalRaised: {  // Add this style for "Total Raised"
    fontFamily: 'Poppins-SemiBold', // Poppins SemiBold
    fontSize: 20,  // Larger font size for total raised
    color: '#4C2A85', // Same color as the title
    textAlign: 'center', // Center align the text
    marginVertical: 15,  // Add some margin for spacing
  },
});

