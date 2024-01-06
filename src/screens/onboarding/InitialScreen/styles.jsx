import {StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles.jsx/responsiveSize';
import fontFamily from '../../../styles.jsx/fontFamily';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  wrapperContainer: {backgroundColor: colors.WHITE},

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  textHireStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_MEDIUM,
    color: colors.WHITE,
  },
  textGetStyle: {
    color: colors.BLACK,
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_MEDIUM,
  },
  buttonGetStyle: {
    width: '90%',
    marginVertical: moderateScaleVertical(5),
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: moderateScale(0.3),
  },
  buttonHireStyle: {width: '90%', marginVertical: moderateScaleVertical(10)},

  logo: {
    width: moderateScale(80),
    height: moderateScale(80),
    bottom: moderateScale(50),
  },
  title: {
    fontSize: textScale(20),
    fontFamily: fontFamily.POPPINS_SEMIBOLD_THIN,
    marginTop: moderateScale(10),
    bottom: moderateScale(20),
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
