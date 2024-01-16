import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Platform} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import AppButton from '../../../components/button/AppButton';
import routes from '../../../constants/routes';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader/Loader';

const HomeScreen = () => {
  const [jobData, setJobData] = useState([]);
  const [storedId, setStoredId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('jobs').get();
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJobData(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [jobData]);

  const deleteJob = async userId => {
    setIsLoading(true);
    try {
      console.log('Deleting job with ID:', userId);
      await firestore().collection('jobs').doc(userId).delete();
      console.log('Document successfully deleted!');
      setJobData(prevData => prevData.filter(item => item.id !== userId));
    } catch (error) {
      console.error('Error deleting document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getNameFromStorage = async () => {
      try {
        const storedIdd = await AsyncStorage.getItem('userId');
        if (storedIdd !== null) {
          setStoredId(storedIdd);
        }
      } catch (error) {
        console.error('Error retrieving name from AsyncStorage:', error);
      }
    };
    getNameFromStorage();
  }, []);

  return (
    <WrapperContainer style={styles.wrapperContainer}>
      {isLoading && <Loader visible={isLoading} />}

      <View>
        {jobData.length > 0 ? (
          <FlatList
            data={jobData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <Text style={styles.companyText}>{item.company}</Text>
                <Text style={styles.experienceText}>{item.experience}</Text>
                <Text>{item.jobDesc}</Text>
                <Text>{item.jobTitle}</Text>
                <Text>{item.package}</Text>
                <Text>{item.postedBy}</Text>
                <Text style={styles.titleSkills}>{item.skills}</Text>

                <View style={styles.buttonContainer}>
                  <AppButton
                    onPress={() =>
                      navigation.navigate(routes.EDIT_POST_SCREEN, {
                        data: item,
                        id: item.id,
                      })
                    }
                    text="Edit Post"
                    textStyle={styles.titleEditPost}
                    style={styles.editButton}
                  />
                  <AppButton
                    onPress={() => deleteJob(item.id)}
                    text="Delete Post"
                    textStyle={styles.titleDeletePost}
                    style={styles.deleteButton}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.noJobFoundContainer}>
            <Text style={styles.noJobFoundText}>No Job Found</Text>
          </View>
        )}
      </View>
    </WrapperContainer>
  );
};

export default HomeScreen;
