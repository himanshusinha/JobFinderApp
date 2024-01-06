import {StyleSheet} from 'react-native';
import {moderateScale} from '../../styles.jsx/responsiveSize';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY,
    height: moderateScale(50),
    paddingVertical: 10,
    borderRadius: moderateScale(10),
  },
  inputStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: moderateScale(30),
  },
  imageStyle: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: colors.BLACK,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default styles;
