import {StyleSheet} from 'react-native';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';
import fontFamily from '../../../styles.jsx/fontFamily';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
  },
  title: {
    fontSize: textScale(20),
    fontFamily: fontFamily.POPPINS_BOLD,
    marginTop: moderateScale(10),
  },
  slogan: {
    fontSize: textScale(16),
    fontFamily: fontFamily.POPPINS_LIGHT_ITALIC,
    top: moderateScale(320),
  },
});
export default styles;
