import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import colors from '../constants/colors';
import routes from '../constants/routes';
import {
  ChatScreen,
  HomeScreen,
  PostScreen,
  ProfileScreen,
  SearchScreen,
} from '../screens';
import images from '../constants/images';
import {moderateScale} from '../styles.jsx/responsiveSize';

const Tab = createBottomTabNavigator();

const BottomStack = ({focused}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: focused ? colors.BLACK : colors.GRAY,
                  bottom: moderateScale(14),
                  width: moderateScale(60),
                }}></View>
              <Image
                source={images.HOME}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? colors.BLACK : colors.GRAY,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={routes.SEARCH_SCREEN}
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: focused ? colors.BLACK : colors.GRAY,
                  bottom: moderateScale(14),
                  width: moderateScale(60),
                }}></View>
              <Image
                source={images.SEARCH}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? colors.BLACK : colors.GRAY,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={routes.POST_SCREEN}
        component={PostScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: focused ? colors.BLACK : colors.GRAY,
                  bottom: moderateScale(14),
                  width: moderateScale(60),
                }}></View>
              <Image
                source={images.ADD}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? colors.BLACK : colors.GRAY,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={routes.CHAT_SCREEN}
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: focused ? colors.BLACK : colors.GRAY,
                  bottom: moderateScale(14),
                  width: moderateScale(60),
                }}></View>
              <Image
                source={images.CHAT}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? colors.BLACK : colors.GRAY,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: focused ? colors.BLACK : colors.GRAY,
                  bottom: moderateScale(14),
                  width: moderateScale(60),
                }}></View>
              <Image
                source={images.PROFILE}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? colors.BLACK : colors.GRAY,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomStack;
