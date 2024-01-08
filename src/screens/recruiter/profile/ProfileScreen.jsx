import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import {moderateScale} from '../../../styles.jsx/responsiveSize';
import images from '../../../constants/images';
import {profileData} from '../../../constants/listData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routes from '../../../constants/routes';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const isFocused = useIsFocused();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  console.log(profileImageUrl);
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
        let image = await AsyncStorage.getItem('profileImageUrl');
        if (image != null) {
          setProfileImageUrl(image);
        }
        if (storedName !== null && userName !== null) {
          setName(storedName);
          setUserName(userName);
        }
      } catch (error) {
        console.error('Error fetching stored name from AsyncStorage:', error);
      }
    };

    fetchStoredName();
  }, [isFocused]);

  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {profileImageUrl != '' ? (
          <Image
            source={{uri: profileImageUrl}}
            style={{
              width: moderateScale(120),
              height: moderateScale(120),
              borderRadius: moderateScale(60),
              marginTop: moderateScale(80),
            }}
          />
        ) : (
          <Image
            source={images.USER}
            style={{
              width: moderateScale(80),
              height: moderateScale(80),
              borderRadius: moderateScale(40),
              marginTop: moderateScale(80),
            }}
          />
        )}
        <View style={{marginTop: moderateScale(20)}}>
          <View>
            {name ? <Text>{userName}</Text> : <Text>{userName}</Text>}
          </View>
        </View>
        <View style={{marginTop: moderateScale(10)}}>
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.UPDATE_PROFILE_SCREEN)}>
            <Text style={{textDecorationLine: 'underline'}}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: moderateScale(10)}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.CHANGE_PROFILE_PICTURE, {
                profileImageUrl: profileImageUrl,
              })
            }>
            <Text style={{textDecorationLine: 'underline'}}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{marginTop: moderateScale(80)}}
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
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  marginVertical: moderateScale(10),
                }}>
                <Image
                  style={{width: moderateScale(20), height: moderateScale(20)}}
                  source={item.image}
                />
                <Text style={{width: '84%'}}>{item?.title}</Text>
                <Image
                  style={{width: moderateScale(14), height: moderateScale(14)}}
                  source={item.icon}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </WrapperContainer>
  );
};

export default ProfileScreen;
