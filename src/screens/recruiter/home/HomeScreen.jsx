import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Platform} from 'react-native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../styles.jsx/responsiveSize';
import fontFamily from '../../../styles.jsx/fontFamily';
import AppButton from '../../../components/button/AppButton';
import routes from '../../../constants/routes';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader/Loader';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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
              <View
                style={{
                  backgroundColor: colors.LIGHT_GRAY,
                  borderRadius: moderateScale(10),
                  marginHorizontal: moderateScale(20),
                  padding: moderateScale(10),
                  marginTop: Platform.OS === 'android' ? moderateScale(50) : 20,
                }}>
                <Text
                  style={{
                    fontFamily: fontFamily.POPPINS_BOLD,
                    fontSize: textScale(16),
                  }}>
                  {item.category}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.POPPINS_SEMIBOLD_THIN,
                    fontSize: textScale(14),
                  }}>
                  {item.company}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.POPPINS_SEMIBOLD_THIN,
                    fontSize: textScale(14),
                  }}>
                  {item.experience}
                </Text>
                <Text> {item.jobDesc}</Text>
                <Text> {item.jobTitle}</Text>
                <Text> {item.package}</Text>
                <Text> {item.postedBy}</Text>
                <Text style={{bottom: moderateScale(16)}}> {item.skills}</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}>
                  <AppButton
                    onPress={() =>
                      navigation.navigate(routes.EDIT_POST_SCREEN, {
                        data: item,
                        id: item.id,
                      })
                    }
                    text="Edit Post"
                    textStyle={{color: colors.BLACK, fontSize: textScale(12)}}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.GRAY,
                      backgroundColor: colors.WHITE,
                      height: moderateScale(30),
                      width: moderateScale(150),
                    }}
                  />
                  <AppButton
                    onPress={() => deleteJob(item.id)}
                    text="Delete Post"
                    textStyle={{color: colors.RED, fontSize: textScale(12)}}
                    style={{
                      borderWidth: 1,
                      borderColor: colors.RED,
                      backgroundColor: colors.WHITE,
                      height: moderateScale(30),
                      width: moderateScale(150),
                    }}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <View
            style={{
              marginTop: moderateScale(350),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No Job Found</Text>
          </View>
        )}
      </View>
    </WrapperContainer>
  );
};

export default HomeScreen;
