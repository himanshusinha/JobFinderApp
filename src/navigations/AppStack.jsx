import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import SplashScreen from '../screens/onboarding/splash/SplashScreen';
import InitialScreen from '../screens/onboarding/InitialScreen/InitialScreen';
import {
  EditPostScreen,
  HomeScreen,
  LoginRecruiterScreen,
  PostScreen,
  ProfileScreen,
  SearchScreen,
  SignUpRecruiterScreen,
} from '../screens';
import BottomStack from './BottomStack';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={routes.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={routes.INITIAL_SCREEN} component={InitialScreen} />

        <Stack.Screen name={routes.HOME_SCREEN} component={BottomStack} />
        <Stack.Screen name={routes.SEARCH_SCREEN} component={SearchScreen} />
        <Stack.Screen name={routes.POST_SCREEN} component={PostScreen} />
        <Stack.Screen
          name={routes.EDIT_POST_SCREEN}
          component={EditPostScreen}
        />
        <Stack.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />

        <Stack.Screen
          name={routes.LOGIN_RECRUITER_SCREEN}
          component={LoginRecruiterScreen}
        />
        <Stack.Screen
          name={routes.SIGN_UP_RECRUITER_SCREEN}
          component={SignUpRecruiterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
