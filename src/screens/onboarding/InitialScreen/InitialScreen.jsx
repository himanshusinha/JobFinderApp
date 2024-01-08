import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';
import AppButton from '../../../components/button/AppButton';
import images from '../../../constants/images';
import strings from '../../../constants/strings';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
 
const InitialScreen = () => {
  const navigation = useNavigation();
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Image source={images.LOGO} style={styles.logo} />
          <Text style={styles.title}>{strings.WHAT_ARE_YOU_LOOKING_FOR}</Text>

          <AppButton
            onPress={() => navigation.navigate(routes.LOGIN_RECRUITER_SCREEN)}
            textStyle={styles.textHireStyle}
            text={strings.HIRE_CANDIDATES}
            style={styles.buttonHireStyle}
          />
          <AppButton
            onPress={() => {}}
            textStyle={styles.textGetStyle}
            text={strings.GET_JOB}
            style={styles.buttonGetStyle}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default InitialScreen;
