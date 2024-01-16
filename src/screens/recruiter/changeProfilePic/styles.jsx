import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';

const styles = StyleSheet.create({
  WrapperContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  closeStyle: {marginHorizontal: moderateScale(20)},
  imageClose: {width: moderateScale(20), height: moderateScale(20)},
  picContainer: {
    marginTop: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(70),
    marginTop: moderateScale(80),
  },
  localImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(40),
    marginTop: moderateScale(80),
  },
  titleGallery: {fontSize: textScale(12)},
  buttonGallery: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY,
    borderWidth: 1,
    width: '80%',
    marginTop: moderateScale(30),
    height: moderateScale(40),
  },
  titleCamera: {fontSize: textScale(12)},
  buttonCamera: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY,
    borderWidth: 1,
    width: '80%',
    marginTop: moderateScale(30),
    height: moderateScale(40),
  },
  buttonUploadPic: {
    backgroundColor: colors.BLACK,
    borderColor: colors.WHITE,
    borderWidth: 1,
    width: '80%',
    marginTop: moderateScale(30),
    height: moderateScale(40),
  },
  titleUploadPic: {fontSize: textScale(12), color: colors.WHITE},
});
export default styles;
