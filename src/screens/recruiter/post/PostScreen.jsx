import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import WrapperContainer from '../../../components/wrapperContainer/WrapperContainer';
import images from '../../../constants/images';
import strings from '../../../constants/strings';
import TextInputWithLabel from '../../../components/input/TextInputWithLabel';
import colors from '../../../constants/colors';
import AppButton from '../../../components/button/AppButton';
import {moderateScale} from '../../../styles.jsx/responsiveSize';
import Loader from '../../../components/loader/Loader';
import ModalSkillsComp from '../../../components/modal/modalSkills/ModalSkillsComp';
import ModalCategoryComp from '../../../components/modal/modalCategory/ModalCategoryComp';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const PostScreen = () => {
  const navigation = useNavigation();
  const [jobTitle, setJobTitle] = useState('');
  const [badJobTitle, setBadJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [badJobDesc, setBadJobDesc] = useState('');
  const [skills, setSkills] = useState('');
  const [badSkills, setBadSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [badExperience, setBadExperience] = useState('');
  const [company, setCompany] = useState('');
  const [badCompany, setBadCompany] = useState('');
  const [empPackage, setEmpPackage] = useState('');
  const [badPackage, setBadPackage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCatVisible, setIsModalCatVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Select Skill');
  const [selectedCategory, setSelectCategory] = useState('Select Category');
  const [badCategory, setBadCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const checkValidation = () => {
  //   let validJobTitle = true;
  //   let validJobDesc = true;
  //   let validJobSkills = true;
  //   let validExperience = true;
  //   let validPackage = true;
  //   let validCompany = true;
  //   let validSelectedSkill = true;
  //   let validSelectedCategory = true;

  //   if (jobTitle === '') {
  //     validJobTitle = false;
  //     setBadJobTitle('Please Enter Job Title');
  //   }

  //   if (jobDesc === '') {
  //     validJobDesc = false;
  //     setBadJobDesc('Please Enter Job Desc');
  //   }

  //   if (skills === '') {
  //     validJobSkills = false;
  //     setBadSkills('Please Enter Skills');
  //   }

  //   if (selectedSkill === '') {
  //     validSelectedSkill = false;
  //     setBadSkills('Please Select Skills');
  //   } else {
  //     setBadSkills('');
  //   }

  //   if (selectedCategory === '') {
  //     validSelectedCategory = false;
  //     setBadCategory('Please Select Category');
  //   } else {
  //     setBadCategory('');
  //   }

  //   if (experience === '') {
  //     validExperience = false;
  //     setBadExperience('Please Enter Valid Experience');
  //   }

  //   if (empPackage === '') {
  //     validPackage = false;
  //     setBadPackage('Please Enter Valid Package');
  //   }

  //   if (company === '') {
  //     validCompany = false;
  //     setBadCompany('Please Enter Valid Company');
  //   }

  //   if (
  //     validJobTitle &&
  //     validJobDesc &&
  //     validJobSkills &&
  //     validSelectedSkill &&
  //     validSelectedCategory &&
  //     validExperience &&
  //     validPackage &&
  //     validCompany
  //   ) {
  //     console.log('Posting job...');

  //     postJob();
  //   }
  // };
  const [storedName, setStoredName] = useState('');
  const [storedId, setStoredId] = useState();
  useEffect(() => {
    const getNameFromStorage = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedIdd = await AsyncStorage.getItem('userId');
        if (storedName !== null && storedIdd !== null) {
          setStoredName(storedName);
          setStoredId(storedIdd);
        }
      } catch (error) {
        console.error('Error retrieving name from AsyncStorage:', error);
      }
    };

    getNameFromStorage();
  }, []);

  const handleJobTitleChange = e => {
    setJobTitle(e);
    if (badJobTitle) {
      setBadJobTitle('');
    }
  };

  const handleJobDescChange = e => {
    setJobDesc(e);
    if (badJobDesc) {
      setBadJobDesc('');
    }
  };

  const handleSkillsChange = e => {
    setSkills(e);
    if (badSkills) {
      setBadSkills('');
    }
  };

  const handleExperienceChange = e => {
    setExperience(e);
    if (badExperience) {
      setBadExperience('');
    }
  };

  const handlePackageChange = e => {
    setEmpPackage(e);
    if (badPackage) {
      setBadPackage('');
    }
  };

  const handleCompanyChange = e => {
    setCompany(e);
    if (badCompany) {
      setBadCompany('');
    }
  };

  const postJob = async () => {
    setIsLoading(true);
    firestore()
      .collection('jobs')
      .add({
        userId: storedId,
        posterName: storedName,
        jobTitle: jobTitle,
        jobDesc: jobDesc,
        category: selectedCategory,
        skills: selectedSkill,
        experience: experience,
        package: empPackage,
        company: company,
      })
      .then(() => {
        setIsLoading(false);
        setJobTitle('');
        setJobDesc('');
        setSelectCategory('');
        setSelectedSkill('');
        setExperience('');
        setEmpPackage('');
        setCompany('');
        navigation.goBack();
        console.log('Job created successfully!');
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleCatModal = () => {
    setIsModalCatVisible(!isModalCatVisible);
  };

  return (
    <ScrollView>
      <WrapperContainer style={styles.wrapperContainer}>
        {isLoading && <Loader visible={isLoading} />}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{strings.TITLE_POST}</Text>
        </View>
        <View style={styles.mainContainer}>
          {/* Job Title */}
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Job Title'}</Text>
            </View>
            <TextInputWithLabel
              value={jobTitle}
              onChangeText={handleJobTitleChange}
              placeholder={'ex Web Development'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badJobTitle ? (
              <Text style={styles.errorText}>{badJobTitle}</Text>
            ) : null}
          </View>
          {/* Job Description */}
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Job Description'}</Text>
            </View>
            <TextInputWithLabel
              value={jobDesc}
              onChangeText={handleJobDescChange}
              placeholder={'ex This is android development job'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badJobDesc ? (
              <Text style={styles.errorText}>{badJobDesc}</Text>
            ) : null}
          </View>
          {/* Select Skills */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              toggleModal();
            }}
            style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Select Skills'}</Text>
            </View>

            <TextInputWithLabel
              value={selectedSkill}
              onChangeText={handleSkillsChange}
              placeholder={'ex Web Development'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
              editable={false}
            />
            <Image
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                bottom: moderateScale(33),
                alignSelf: 'flex-end',
                marginEnd: moderateScale(10),
              }}
              source={images.DROP_DOWN}
            />
            {badSkills ? (
              <Text style={styles.errorText}>Please Enter Valid Skills</Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              toggleCatModal();
            }}
            style={[styles.inputStyle]}>
            <View style={styles.labelStyle}>
              <Text>{'Select Category'}</Text>
            </View>

            <TextInputWithLabel
              value={selectedCategory}
              placeholder={'ex Web Development'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
              editable={false}
            />
            <Image
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                bottom: moderateScale(33),
                alignSelf: 'flex-end',
                marginEnd: moderateScale(10),
              }}
              source={images.DROP_DOWN}
            />
            {badCategory ? (
              <Text style={styles.errorText}>Please Enter Valid Category</Text>
            ) : null}
          </TouchableOpacity>
          {/* Experience */}
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Experience'}</Text>
            </View>
            <TextInputWithLabel
              value={experience}
              onChangeText={handleExperienceChange}
              placeholder={'ex Required experience is 2 years +'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badExperience ? (
              <Text style={styles.errorText}>{badExperience}</Text>
            ) : null}
          </View>
          {/* Package */}
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Package'}</Text>
            </View>
            <TextInputWithLabel
              value={empPackage}
              onChangeText={handlePackageChange}
              placeholder={'ex XXXXX'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badPackage ? (
              <Text style={styles.errorText}>{badPackage}</Text>
            ) : null}
          </View>
          {/* Company */}
          <View style={styles.inputStyle}>
            <View style={styles.labelStyle}>
              <Text>{'Company'}</Text>
            </View>
            <TextInputWithLabel
              value={company}
              onChangeText={handleCompanyChange}
              placeholder={'ex Google'}
              placeholderTextColor={colors.GRAY}
              labelStyle={styles.labelPassStyle}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {badCompany ? (
              <Text style={styles.errorText}>{badCompany}</Text>
            ) : null}
          </View>

          <View style={[styles.buttonLoginViewStyle, {top: moderateScale(10)}]}>
            <AppButton
              onPress={() => {
                postJob();
              }}
              textStyle={styles.textLoginStyle}
              text={strings.TITLE_POST}
              style={styles.buttonLoginStyle}
            />
          </View>
          <ModalSkillsComp
            toggleModal={toggleModal}
            visible={isModalVisible}
            onSelect={setSelectedSkill}
          />
          <ModalCategoryComp
            toggleCatModal={toggleCatModal}
            visible={isModalCatVisible}
            onSelect={setSelectCategory}
          />
        </View>
      </WrapperContainer>
    </ScrollView>
  );
};

export default PostScreen;
