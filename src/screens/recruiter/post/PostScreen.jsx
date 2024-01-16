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

  const checkValidation = () => {
    let validJobTitle = true;
    let validJobDesc = true;
    let validJobSkills = true;
    let validExperience = true;
    let validPackage = true;
    let validCompany = true;
    let validSkill = true;
    let validCategory = true;

    if (jobTitle === '') {
      validJobTitle = false;
      setBadJobTitle('Please Enter Job Title');
    } else {
      setBadJobTitle('');
    }

    if (jobDesc === '') {
      validJobDesc = false;
      setBadJobDesc('Please Enter Job Description');
    } else if (jobDesc.length < 50) {
      validJobDesc = false;
      setBadJobDesc('Please Enter Job Description min 50 characters');
    } else {
      setBadJobDesc('');
    }

    if (selectedCategory === 'Select Category') {
      validCategory = false;
      setBadCategory('Please Select Job Category');
    } else {
      setBadCategory('');
    }

    if (selectedSkill === 'Select Skill') {
      validJobSkills = false;
      setBadSkills('Please Select Skill');
    } else {
      setBadSkills('');
    }

    let expRegex = /^\d{1,2}$/;

    if (experience === '') {
      validExperience = false;
      setBadExperience('Please Enter Experience');
    } else if (!experience.match(expRegex)) {
      validExperience = false;
      setBadExperience('Please Enter Valid Experience (either 1 or 2 digits)');
    } else {
      setBadExperience('');
    }

    if (empPackage === '') {
      validPackage = false;
      setBadPackage('Please Enter Package');
    } else if (!empPackage.match(expRegex)) {
      validPackage = false;
      setBadPackage('Please Enter Valid Package');
    } else {
      setBadPackage('');
    }

    if (company === '') {
      validCompany = false;
      setBadCompany('Please Enter Company');
    } else {
      setBadCompany('');
    }

    return (
      validJobTitle &&
      validJobDesc &&
      validJobSkills &&
      validCategory &&
      validExperience &&
      validPackage &&
      validCompany
    );
  };

  const [storedName, setStoredName] = useState('');
  console.log(storedName, '.........stored Name');
  const [storedId, setStoredId] = useState('');
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
          <View style={[styles.inputStyle, {top: moderateScale(6)}]}>
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
            style={[styles.inputStyle, {top: moderateScale(10)}]}>
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
            <Image style={styles.imageDropDown} source={images.DROP_DOWN} />
          </TouchableOpacity>
          {badSkills ? (
            <Text
              style={[
                styles.errorText,
                {
                  bottom: moderateScale(20),
                  marginHorizontal: moderateScale(20),
                },
              ]}>
              {badSkills}
            </Text>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              toggleCatModal();
            }}
            style={[styles.inputStyle, {top: moderateScale(10)}]}>
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
            <Image style={styles.imageDropDown} source={images.DROP_DOWN} />
          </TouchableOpacity>
          {badCategory ? (
            <Text
              style={[
                styles.errorText,
                {
                  bottom: moderateScale(50),
                  marginHorizontal: moderateScale(20),
                },
              ]}>
              {badCategory}
            </Text>
          ) : null}
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

          <View
            style={[styles.buttonLoginViewStyle, {bottom: moderateScale(10)}]}>
            <AppButton
              onPress={() => {
                console.log('Button Pressed');
                if (checkValidation()) {
                  console.log('Validation Passed');
                  postJob();
                } else {
                  console.log('Validation Failed');
                }
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
