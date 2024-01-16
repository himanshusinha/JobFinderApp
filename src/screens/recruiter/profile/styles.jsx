import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale} from '../../../styles.jsx/responsiveSize';

const styles = StyleSheet.create({
  wrapperContainer: {backgroundColor: colors.WHITE},
  profileContainer: {justifyContent: 'center', alignItems: 'center'},
  profileImage: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    marginTop: moderateScale(80),
  },
  localImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    marginTop: moderateScale(80),
  },
  userContainer: {marginTop: moderateScale(20)},
  updateProfileContainer: {marginTop: moderateScale(10)},
  changeProfileContainer: {marginTop: moderateScale(10)},
  updateProfile: {textDecorationLine: 'underline'},
  titleChangeProfile: {textDecorationLine: 'underline'},
  contentContainer: {marginTop: moderateScale(80)},
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: moderateScale(10),
  },
  imageStyle: {width: moderateScale(20), height: moderateScale(20)},
  iconStyle: {width: moderateScale(14), height: moderateScale(14)},
  titleStyle: {width: '84%'},
});
export default styles;
