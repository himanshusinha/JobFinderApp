import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpRecruiterScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [docId, setDocId] = useState('');
  const [badName, setBadName] = useState('');
  const [badEmail, setBadEmail] = useState('');
  const [badContact, setBadContact] = useState('');
  const [badCompany, setBadCompany] = useState('');
  const [badAddress, setBadAddress] = useState('');
  const [badPassword, setBadPassword] = useState('');

  const NAME_REGEX = /^[a-zA-Z\s]+$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const CONTACT_REGEX = /^[0-9]{10}$/;
  const COMPANY_REGEX = /^[a-zA-Z0-9\s]+$/;
  const ADDRESS_REGEX = /^[a-zA-Z0-9\s,.-]+$/;
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const checkValidation = () => {
    let validName = true;
    let validEmail = true;
    let validContact = true;
    let validCompany = true;
    let validAddress = true;
    let validPassword = true;

    if (name === '' || !NAME_REGEX.test(name)) {
      validName = false;
      setBadName('Please Enter Valid Name');
    }

    if (email === '' || !EMAIL_REGEX.test(email)) {
      validEmail = false;
      setBadEmail('Please Enter Valid Email');
    }

    if (contact === '' || !CONTACT_REGEX.test(contact)) {
      validContact = false;
      setBadContact('Please Enter Valid Contact Number');
    }

    if (company === '' || !COMPANY_REGEX.test(company)) {
      validCompany = false;
      setBadCompany('Please Enter Valid Company Name');
    }

    if (address === '' || !ADDRESS_REGEX.test(address)) {
      validAddress = false;
      setBadAddress('Please Enter Valid Address');
    }

    if (password === '' || !PASSWORD_REGEX.test(password)) {
      validPassword = false;
      setBadPassword('Please Enter Valid Password');
    }

    if (
      validName &&
      validEmail &&
      validContact &&
      validCompany &&
      validAddress &&
      validPassword
    ) {
      signUp();
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
  const handleNameChange = e => {
    setName(e);
    if (badName) {
      setBadName('');
    }
  };

  const handleContactChange = e => {
    setContact(e);
    if (badContact) {
      setBadContact('');
    }
  };

  const handleCompanyNameChange = e => {
    setCompany(e);
    if (badCompany) {
      setBadCompany('');
    }
  };

  const handleAddressChange = e => {
    setAddress(e);
    if (badAddress) {
      setBadAddress('');
    }
  };

  const generateUUID = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );

    return uuid;
  };

  // Generate a random UUID
  const uuid = generateUUID();
  console.log(uuid);

  const signUp = () => {
    const userId = generateUUID();
    const idd = AsyncStorage.setItem('idd', userId);
    setIsLoading(true);
    firestore()
      .collection('job_posters')
      .add({
        userId,
        name,
        email,
        contact,
        company,
        address,
        password,
      })
      .then(docRef => {
        const collectionId = docRef.id; // Retrieve the collection ID
        console.log('Collection ID:', collectionId); // Log the collection ID
        AsyncStorage.setItem('docid', collectionId);
        setDocId(collectionId);
        // ... (rest of your code)
      })
      .then(() => {
        AsyncStorage.setItem('id', userId);
        AsyncStorage.setItem('name', name);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('contact', contact);
        AsyncStorage.setItem('company', company);
        AsyncStorage.setItem('address', address);
        AsyncStorage.setItem('password', password);

        setUserId();
        setName('');
        setEmail('');
        setContact('');
        setCompany('');
        setAddress('');
        setPassword('');
        setIsLoading(false);
        setTimeout(() => {
          navigation.goBack();
        }, 3000);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <WrapperContainer style={styles.wrapperContainer}>
      {isLoading && <Loader visible={isLoading} />}

      <ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image source={images.LOGO} style={styles.logo} />
          <Text style={styles.title}>{strings.TITLE_CREATE_ACCOUNT}</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Name'}</Text>
            </View>
            <TextInputWithLabel
              value={name}
              onChangeText={handleNameChange}
              placeholder={strings.HIRE_EMAIL_PLACEHOLDER}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
              s
            />
            {badName ? (
              <Text style={styles.errorText}>Please Enter Valid Name</Text>
            ) : null}
          </View>
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Email'}</Text>
            </View>
            <TextInputWithLabel
              value={email}
              onChangeText={handleEmailChange}
              placeholder={strings.HIRE_PASS_PLACEHOLDER}
              placeholderTextColor={colors.GRAY}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badEmail ? (
              <Text style={styles.errorText}>Please Enter Valid Email</Text>
            ) : null}
          </View>
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Contact'}</Text>
            </View>
            <TextInputWithLabel
              value={contact}
              onChangeText={handleContactChange}
              placeholder={strings.TITLE_PLACE_HOLDER_MOBILE}
              placeholderTextColor={colors.GRAY}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badContact ? (
              <Text style={styles.errorText}>Please Enter Valid Contact</Text>
            ) : null}
          </View>
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Company Name'}</Text>
            </View>
            <TextInputWithLabel
              value={company}
              onChangeText={handleCompanyNameChange}
              placeholder={strings.TITLE_PLACE_HOLDER_COMPANY}
              placeholderTextColor={colors.GRAY}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badCompany ? (
              <Text style={styles.errorText}>Please Enter Valid Company</Text>
            ) : null}
          </View>
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Address'}</Text>
            </View>
            <TextInputWithLabel
              value={address}
              onChangeText={handleAddressChange}
              placeholder={strings.TITLE_PLACE_HOLDER_ADDRESS}
              placeholderTextColor={colors.GRAY}
              autoCorrect={false} // Disable auto correction
              autoCapitalize="none" // Disable auto capitalization
            />
            {badAddress ? (
              <Text style={styles.errorText}>Please Enter Valid Address</Text>
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
              autoCorrect={false} // Disable auto correction
              autoCapitalize="none" // Disable auto capitalization
            />
            {badPassword ? (
              <Text style={styles.errorText}>Please Enter Valid Password</Text>
            ) : null}
          </View>

          <View style={styles.buttonLoginViewStyle}>
            <AppButton
              onPress={() => {
                checkValidation();
              }}
              textStyle={styles.textLoginStyle}
              text={strings.TITLE_SIGN_UP}
              style={styles.buttonLoginStyle}
            />
          </View>
          <View style={styles.buttonSignUpViewStyle}>
            <AppButton
              onPress={() => navigation.goBack()}
              textStyle={styles.textSignUpStyle}
              text={strings.TITLE_LOGIN}
              style={styles.buttonSignUpStyle}
            />
          </View>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default SignUpRecruiterScreen;
