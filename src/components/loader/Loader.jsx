import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';

const Loader = ({visible}) => {
  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.indicatorStyle}>
          <ActivityIndicator color={colors.BLACK} size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
