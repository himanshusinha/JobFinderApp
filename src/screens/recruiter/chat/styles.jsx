import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.WHITE},
  wrapperContainer: {backgroundColor: colors.WHITE},
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    marginHorizontal: moderateScale(10),
    borderColor: colors.GRAY,
    borderWidth: 1,
    height: moderateScale(40),
    width: '95%',
  },
  input: {flex: 1, paddingStart: moderateScale(10)},
  buttonSend: {
    borderRadius: moderateScale(0),
    height: moderateScale(40),
  },
  titleSend: {color: colors.WHITE, fontSize: textScale(12)},
  inputMainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    width: '100%',
  },
});
export default styles;
