import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import SplashScreen from '../screens/onboarding/splash/SplashScreen';
import InitialScreen from '../screens/onboarding/InitialScreen/InitialScreen';
import LoginRecruiterScreen from '../screens/recruiter/auth/login/LoginRecruiterScreen';
import SignUpRecruiterScreen from '../screens/recruiter/auth/signup/SignUpRecruiterScreen';
import {HomeScreen} from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={routes.LOGIN_RECRUITER_SCREEN}
        component={LoginRecruiterScreen}
      />
      <Stack.Screen
        name={routes.SIGN_UP_RECRUITER_SCREEN}
        component={SignUpRecruiterScreen}
      />
      <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
