import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../styles.jsx/responsiveSize';
import fontFamily from '../../../styles.jsx/fontFamily';

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
  },
  listItemContainer: {
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: moderateScale(10),
    marginHorizontal: moderateScale(20),
    padding: moderateScale(10),
    marginTop: Platform.OS === 'android' ? moderateScale(50) : 20,
  },
  categoryText: {
    fontFamily: fontFamily.POPPINS_BOLD,
    fontSize: textScale(16),
  },
  companyText: {
    fontFamily: fontFamily.POPPINS_SEMIBOLD_THIN,
    fontSize: textScale(14),
  },
  experienceText: {
    fontFamily: fontFamily.POPPINS_SEMIBOLD_THIN,
    fontSize: textScale(14),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  editButton: {
    borderWidth: 1,
    borderColor: colors.GRAY,
    backgroundColor: colors.WHITE,
    height: moderateScale(30),
    width: moderateScale(150),
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.RED,
    backgroundColor: colors.WHITE,
    height: moderateScale(30),
    width: moderateScale(150),
  },
  noJobFoundContainer: {
    marginTop: moderateScale(350),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobFoundText: {
    fontSize: textScale(16),
  },
  titleSkills: {top: moderateScale(1)},
  titleEditPost: {color: colors.BLACK, fontSize: textScale(12)},
  titleDeletePost: {color: colors.RED, fontSize: textScale(12)},
});

export default styles;
