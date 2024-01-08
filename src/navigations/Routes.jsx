import React, {useEffect} from 'react';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';

const Routes = () => {
  let userEmail = '';
  useEffect(() => {
    const checkSession = async () => {
      try {
        userEmail = await AsyncStorage.getItem('email');
      } catch (error) {
        console.log('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <NavigationContainer>
      {userEmail ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
