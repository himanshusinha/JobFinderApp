import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import images from '../../../constants/images';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';
import AppButton from '../../../components/button/AppButton';
import colors from '../../../constants/colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader/Loader';

const ChangeProfilePicture = () => {
  const [imageData, setImageData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const getUserIdFromStorage = async () => {
      try {
        const storedId = await AsyncStorage.getItem('docid');
        console.log(storedId, '.........iserid');
        if (storedId !== null) {
          setId(storedId);
        }
      } catch (error) {
        console.error('Error retrieving userId from AsyncStorage:', error);
      }
    };

    getUserIdFromStorage();
  }, []);
  const chooseGallery = async () => {
    const res = await launchImageLibrary({mediaType: 'photo'});

    if (!res.didCancel) {
      setImageData(res);
    }
  };
  const chooseCamera = async () => {
    const userDocument = firestore().collection('Users').doc('ABC');

    if (!res.didCancel) {
      setImageData(res);
    }
  };
  const uploadPic = async () => {
    setIsLoading(true);
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    firestore()
      .collection('job_posters')
      .doc(id)
      .update({
        profileImage: url,
      })
      .then(async () => {
        await AsyncStorage.setItem('profileImageUrl', url);
        setIsLoading(false);
        navigation.goBack();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <WrapperContainer style={styles.WrapperContainer}>
      {isLoading && <Loader visible={isLoading} />}
      <View>
        <View style={{marginHorizontal: moderateScale(20)}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.CLOSE}
              style={{width: moderateScale(20), height: moderateScale(20)}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: moderateScale(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {imageData && imageData.assets && imageData.assets.length > 0 ? (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={{
                width: moderateScale(150),
                height: moderateScale(150),
                borderRadius: moderateScale(70),
                marginTop: moderateScale(80),
              }}
            />
          ) : (
            <Image
              source={images.USER}
              style={{
                width: moderateScale(150),
                height: moderateScale(150),
                borderRadius: moderateScale(40),
                marginTop: moderateScale(80),
              }}
            />
          )}

          <AppButton
            onPress={() => chooseGallery()}
            text="Choose from gallery"
            textStyle={{fontSize: textScale(12)}}
            style={{
              backgroundColor: colors.WHITE,
              borderColor: colors.GRAY,
              borderWidth: 1,
              width: '80%',
              marginTop: moderateScale(30),
              height: moderateScale(40),
            }}
          />
          {imageData != '' && (
            <AppButton
              onPress={() => uploadPic()}
              text="Upload Profile Pic"
              textStyle={{fontSize: textScale(12), color: colors.WHITE}}
              style={{
                backgroundColor: colors.BLACK,
                borderColor: colors.WHITE,
                borderWidth: 1,
                width: '80%',
                marginTop: moderateScale(30),
                height: moderateScale(40),
              }}
            />
          )}
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ChangeProfilePicture;
