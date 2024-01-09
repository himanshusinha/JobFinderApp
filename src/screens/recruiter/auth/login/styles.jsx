import {Platform, StyleSheet} from 'react-native';
import colors from '../../../../constants/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles.jsx/responsiveSize';
import fontFamily from '../../../../styles.jsx/fontFamily';

const styles = StyleSheet.create({
  wrapperContainer: {backgroundColor: colors.WHITE},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  logo: {
    width: moderateScale(60),
    height: moderateScale(60),
    bottom: moderateScale(50),
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? moderateScale(60) : moderateScale(140),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: textScale(20),
    fontFamily: fontFamily.POPPINS_BOLD,
    marginTop: moderateScale(30),
  },
  labelEmailStyle: {
    color: colors.BLACK,
    fontSize: textScale(12),
    bottom: moderateScale(24),
    padding: moderateScale(10),
    backgroundColor: colors.WHITE,
  },
  labelPassStyle: {
    color: colors.BLACK,
    fontSize: textScale(12),
    bottom: moderateScale(24),
    backgroundColor: colors.WHITE,
    padding: moderateScale(10),
    alignItems: 'flex-start',
  },
  placeholderStyle: {
    right: moderateScale(120),
  },
  inputStyle: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
  labelStyle: {
    bottom: moderateScale(2),
    backgroundColor: 'white',
  },
  buttonLoginStyle: {width: '100%', marginVertical: moderateScaleVertical(10)},
  textLoginStyle: {
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_MEDIUM,
    color: colors.WHITE,
  },
  textSignUpStyle: {
    color: colors.BLACK,
    fontSize: textScale(14),
    fontFamily: fontFamily.POPPINS_MEDIUM,
  },
  buttonSignUpStyle: {
    width: '100%',
    marginVertical: moderateScaleVertical(5),
    backgroundColor: colors.WHITE,
    borderColor: colors.BLACK,
    borderWidth: moderateScale(0.3),
  },
  buttonLoginViewStyle: {marginHorizontal: 20, marginTop: moderateScale(10)},
  buttonSignUpViewStyle: {
    marginHorizontal: 20,
    marginBottom: moderateScale(10),
  },
  titleForgot: {
    color: colors.BLACK,
    fontFamily: fontFamily.POPPINS_MEDIUM,
    fontSize: textScale(14),
  },
  viewForgot: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  mainContainer: {marginTop: moderateScale(20)},
  errorText: {
    color: 'red',
    top: moderateScale(3),
  },
});
export default styles;
