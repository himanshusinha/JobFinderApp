import {View, Text, Image} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import images from '../../../constants/images';
import {moderateScale} from '../../../styles.jsx/responsiveSize';

const ChangeProfilePicture = () => {
  return (
    <WrapperContainer style={styles.WrapperContainer}>
      <View>
        <View>
          <Image
            source={images.CLOSE}
            style={{width: moderateScale(20), height: moderateScale(20)}}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ChangeProfilePicture;
