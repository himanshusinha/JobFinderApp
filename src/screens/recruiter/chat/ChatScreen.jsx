import {View, TextInput} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import AppButton from '../../../components/button/AppButton';

const ChatScreen = () => {
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View style={styles.container}>
        <View style={styles.inputMainContainer}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Enter your message" />
            <AppButton
              style={styles.buttonSend}
              text="Send"
              textStyle={styles.titleSend}
            />
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ChatScreen;
