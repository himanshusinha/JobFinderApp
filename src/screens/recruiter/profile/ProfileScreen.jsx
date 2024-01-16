import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import images from '../../../constants/images';
import {profileData} from '../../../constants/listData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routes from '../../../constants/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('Johnas');
  const isFocused = useIsFocused();
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate(routes.INITIAL_SCREEN);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchStoredName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('updatedName');
        const userName = await AsyncStorage.getItem('name');
        console.log(userName);
        setUserName(userName);
        let image = await AsyncStorage.getItem('profileImageUrl');
        if (image != null) {
          setProfileImageUrl(image);
        }
        if (storedName !== null) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Error fetching stored name from AsyncStorage:', error);
      }
    };

    fetchStoredName();
  }, [isFocused]);

  return (
    <WrapperContainer
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.profileContainer}>
        {profileImageUrl !== '' ? (
          <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        ) : (
          <Image source={images.USER} style={styles.localImage} />
        )}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.userContainer}>
          <View>{name ? <Text>{name}</Text> : <Text>{userName}</Text>}</View>
        </View>
        <View style={styles.updateProfileContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.UPDATE_PROFILE_SCREEN)}>
            <Text style={styles.updateProfile}>Update Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.changeProfileContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.CHANGE_PROFILE_PICTURE, {
                profileImageUrl: profileImageUrl,
              })
            }>
            <Text style={styles.titleChangeProfile}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        data={profileData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                switch (index) {
                  case 0:
                    navigation.navigate(routes.HOME_SCREEN);
                    break;
                  case 1:
                    break;
                  case 2:
                    break;
                  case 3:
                    logout();
                    break;
                  default:
                    break;
                }
              }}
              activeOpacity={0.7}
              style={styles.touchable}>
              <Image style={styles.imageStyle} source={item.image} />
              <Text style={styles.titleStyle}>{item?.title}</Text>
              <Image style={styles.iconStyle} source={item.icon} />
            </TouchableOpacity>
          );
        }}
      />
    </WrapperContainer>
  );
};

export default ProfileScreen;
