// ModalCategoryComp.js

import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, FlatList} from 'react-native';
import styles from '../modalSkills/styles';
import jobTitleInfo from '../../../constants/jobTitle.json';
import {moderateScale} from '../../../styles.jsx/responsiveSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalCategoryComp = ({toggleCatModal, visible, onSelect}) => {
  const [jobTitles, setJobTitles] = useState(jobTitleInfo);

  const handleSelect = selectedKeywords => {
    console.log('Selected Category:', selectedKeywords);
    // Join the selected keywords array into a string
    const selectedCategoryString = Array.isArray(selectedKeywords)
      ? selectedKeywords.join(', ')
      : selectedKeywords;
    onSelect(selectedCategoryString); // Set the selectedCategory state to a string value
    toggleCatModal();
  };
  const postJob = async () => {
    let name = await AsyncStorage.getItem('name');
     firestore
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleCatModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Select Category</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={jobTitles}
            renderItem={({item}) => (
              <View style={{width: '90%'}}>
                <View style={{padding: moderateScale(10)}}>
                  {item.keywords.map((keyword, index) => (
                    <TouchableOpacity
                      style={{marginVertical: moderateScale(10)}}
                      onPress={() => handleSelect(keyword)}>
                      <Text key={index}>
                        {Array.isArray(keyword) ? keyword.join(', ') : keyword}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            keyExtractor={item => item.category}
          />
          <TouchableOpacity onPress={toggleCatModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCategoryComp;
