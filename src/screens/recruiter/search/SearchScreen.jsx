import {View, Text} from 'react-native';
import React from 'react';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';

const SearchScreen = () => {
  return (
    <WrapperContainer style={styles.wrapperContainer}>
      <View>
        <Text>SearchScreen</Text>
      </View>
    </WrapperContainer>
  );
};

export default SearchScreen;
