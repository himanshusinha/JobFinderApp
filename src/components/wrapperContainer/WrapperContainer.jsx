import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
const WrapperContainer = ({style = {}, children}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...style,
        backgroundColor: colors.WHITE,
      }}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'white'}
      />
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};

//make this component available to the app
export default WrapperContainer;
