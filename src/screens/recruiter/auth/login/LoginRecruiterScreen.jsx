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

  const checkValidation = () => {
    let validEmail = true;
    let validPassword = true;

    // Check for empty email
    if (email.trim() == '') {
      validEmail = false;
      setBadEmail('Please Enter Valid Email');
    } else {
      setBadEmail('');
    }

    // Check for empty password
    if (password.trim() == '') {
      validPassword = false;
      setBadPassword('Please Enter Valid Password');
    } else {
      setBadPassword('');
    }

    if (validEmail && validPassword) {
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
        setIsLoading(false);
        if (data.docs.length === 0) {
          // No user found with the provided email
          setBadEmail('No user found with this email.');
        } else {
          const userData = data.docs[0].data();
          // Check if the password matches
          if (userData.password !== password) {
            // Password does not match
            setBadPassword('Incorrect password.');
          } else {
            // Password matches, continue with login process
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('password', password);
            navigation.navigate(routes.HOME_SCREEN);
            1;
          }
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Error:', err.message);
        // Handle other errors as needed
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
          {badEmail ? <Text style={styles.errorText}>{badEmail}</Text> : null}
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
            <Text style={styles.errorText}>{badPassword}</Text>
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
