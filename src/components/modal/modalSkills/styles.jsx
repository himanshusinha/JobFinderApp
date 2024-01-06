import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // ... your existing styles
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flex: 0.5,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default styles;
