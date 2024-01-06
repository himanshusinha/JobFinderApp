import {View, Text} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';

const ChatScreen = () => {
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View>
        <Text>ChatScreen</Text>
      </View>
    </WrapperContainer>
  );
};

export default ChatScreen;
