import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import jobTitleInfo from '../../../constants/jobTitle.json';
import {moderateScale} from '../../../styles.jsx/responsiveSize';
import {useState} from 'react';
const ModalSkillsComp = ({toggleModal, visible, onSelect}) => {
  const [jobTitle, setJobTitle] = useState(jobTitleInfo);
  const handleSelect = selectedValue => {
    onSelect(selectedValue);
    toggleModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        toggleModal();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Select Skills</Text>
          <FlatList
            data={jobTitle}
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => handleSelect(item.category)}>
                  <Text style={{padding: moderateScale(5)}}>
                    {item?.category}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSkillsComp;
