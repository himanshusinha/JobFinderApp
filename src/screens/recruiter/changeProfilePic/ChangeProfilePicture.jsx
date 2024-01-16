import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, PermissionsAndroid} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import images from '../../../constants/images';
import AppButton from '../../../components/button/AppButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader/Loader';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
    const hasPermission = await requestStoragePermission();
    if (hasPermission) {
      const res = await launchImageLibrary({mediaType: 'photo'});
      if (!res.didCancel) {
        setImageData(res);
      }
    } else {
      console.warn('Storage permission denied');
    }
  };

  const chooseCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      const res = await launchCamera({mediaType: 'photo'});
      setImageData(res);
    } else {
      console.warn('Camera permission denied');
    }

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
        // Navigate back to the ProfileScreen
        navigation.goBack();
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      return (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  return (
    <WrapperContainer style={styles.WrapperContainer}>
      {isLoading && <Loader visible={isLoading} />}
      <View>
        <View style={styles.closeStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.CLOSE} style={styles.imageClose} />
          </TouchableOpacity>
        </View>
        <View style={styles.picContainer}>
          {imageData && imageData.assets && imageData.assets.length > 0 ? (
            <Image
              source={{uri: imageData.assets[0].uri}}
              style={styles.userImage}
            />
          ) : (
            <Image source={images.USER} style={styles.localImage} />
          )}

          <AppButton
            onPress={() => chooseGallery()}
            text="Choose from gallery"
            textStyle={styles.titleGallery}
            style={styles.buttonGallery}
          />
          <AppButton
            onPress={() => chooseCamera()}
            text="Choose from camera"
            textStyle={styles.titleCamera}
            style={styles.buttonCamera}
          />
          {imageData !== '' && (
            <AppButton
              onPress={() => uploadPic()}
              text="Upload Profile Pic"
              textStyle={styles.titleUploadPic}
              style={styles.buttonUploadPic}
            />
          )}
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ChangeProfilePicture;
