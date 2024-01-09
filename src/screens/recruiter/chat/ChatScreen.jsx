import {View, Text, TextInput} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import AppButton from '../../../components/button/AppButton';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';
import colors from '../../../constants/colors';

const ChatScreen = () => {
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.WHITE,
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 10,
              marginHorizontal: moderateScale(10),
              borderColor: colors.GRAY,
              borderWidth: 1,
              height: moderateScale(40),
              width: '95%',
            }}>
            <TextInput
              style={{flex: 1, paddingStart: moderateScale(10)}}
              placeholder="Enter your message"
            />
            <AppButton
              style={{
                borderRadius: moderateScale(0),
                height: moderateScale(40),
              }}
              text="Send"
              textStyle={{color: colors.WHITE, fontSize: textScale(12)}}
            />
          </View>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default ChatScreen;
