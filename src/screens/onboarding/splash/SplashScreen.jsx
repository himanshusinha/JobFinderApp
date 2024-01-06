import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import images from '../../../constants/images';
import strings from '../../../constants/strings';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('email');
        if (userEmail) {
          navigation.navigate(routes.HOME_SCREEN);
        } else {
          navigation.navigate(routes.LOGIN_RECRUITER_SCREEN);
        }
      } catch (error) {
        console.log('Error checking session:', error);
      }
    };

    checkSession();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={images.LOGO} style={styles.logo} />
      <Text style={styles.title}>{strings.TITLE}</Text>
      <Text style={styles.slogan}>{strings.SLOGAN}</Text>
    </View>
  );
};

export default SplashScreen;
