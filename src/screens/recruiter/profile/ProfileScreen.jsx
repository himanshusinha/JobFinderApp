import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';

const ProfileScreen = () => {
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </WrapperContainer>
  );
};

export default ProfileScreen;
