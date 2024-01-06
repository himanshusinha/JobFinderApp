import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import WrapperContainer from '../../../../components/wrapperContainer/WrapperContainer';
import images from '../../../../constants/images';
import strings from '../../../../constants/strings';
import TextInputWithLabel from '../../../../components/input/TextInputWithLabel';
import colors from '../../../../constants/colors';
import AppButton from '../../../../components/button/AppButton';
import {useNavigation} from '@react-navigation/native';
import Loader from '../../../../components/loader/Loader';
import firestore from '@react-native-firebase/firestore';
import routes from '../../../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginRecruiterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const checkValidation = () => {
    let validEmail = true;
    let validPassword = true;

    if (email === '') {
      validEmail = false;
      setBadEmail('Please Enter Email');
    } else if (!EMAIL_REGEX.test(email)) {
      validEmail = false;
      setBadEmail('Please Enter Valid Email');
    }

    if (password === '') {
      validPassword = false;
      setBadPassword('Please Enter Password');
    } else if (!PASSWORD_REGEX.test(password)) {
      validPassword = false;
      setBadPassword('Please Enter Valid Password');
    } else {
      login();
    }
  };

  const handleEmailChange = e => {
    setEmail(e);
    if (badEmail) {
      setBadEmail('');
    }
  };

  const handlePasswordChange = e => {
    setPassword(e);
    if (badPassword) {
      setBadPassword('');
    }
  };

  const login = () => {
    setIsLoading(true);
    firestore()
      .collection('job_posters')
      .where('email', '==', email)
      .get()
      .then(data => {
        console.log(data.docs);
        setIsLoading(false);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', password);
        navigation.navigate(routes.HOME_SCREEN);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Error:', err.message);
      });
  };
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      {isLoading && <Loader visible={isLoading} />}
      <View style={styles.headerContainer}>
        <Image source={images.LOGO} style={styles.logo} />
        <Text style={styles.title}>{strings.TITLE_LOGIN}</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.inputStyle}>
          <View style={styles.labelStyle}>
            <Text>{'Email'}</Text>
          </View>
          <TextInputWithLabel
            value={email}
            onChangeText={handleEmailChange}
            placeholder={strings.HIRE_EMAIL_PLACEHOLDER}
            placeholderTextColor={colors.GRAY}
            labelStyle={styles.labelPassStyle}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {badEmail ? (
            <Text style={styles.errorText}>Please Enter Valid Email</Text>
          ) : null}
        </View>
        <View style={styles.inputStyle}>
          <View style={styles.labelStyle}>
            <Text>{'Password'}</Text>
          </View>
          <TextInputWithLabel
            value={password}
            onChangeText={handlePasswordChange}
            placeholder={strings.TITLE_PLACE_HOLDER_PASSWORD}
            placeholderTextColor={colors.GRAY}
            rightIcon={images.SHOW}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {badPassword ? (
            <Text style={styles.errorText}>Please Enter Valid Password</Text>
          ) : null}
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.viewForgot}>
          <Text style={styles.titleForgot}>{strings.TITLE_FORGOT}</Text>
        </TouchableOpacity>
        <View style={styles.buttonLoginViewStyle}>
          <AppButton
            onPress={() => {
              checkValidation();
            }}
            textStyle={styles.textLoginStyle}
            text={strings.TITLE_LOGIN}
            style={styles.buttonLoginStyle}
          />
        </View>
        <View style={styles.buttonSignUpViewStyle}>
          <AppButton
            onPress={() => navigation.navigate(routes.SIGN_UP_RECRUITER_SCREEN)}
            textStyle={styles.textSignUpStyle}
            text={strings.TITLE_CREATE_ACCOUNT}
            style={styles.buttonSignUpStyle}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default LoginRecruiterScreen;
