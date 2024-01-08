import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes from '../constants/routes';
import {ProfileScreen, UpdateProfileScreen} from '../screens';
import ChangeProfilePicture from '../screens/recruiter/changeProfilePic/ChangeProfilePicture';
const ProfileInnerStack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileInnerStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileInnerStack.Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
      />
      <ProfileInnerStack.Screen
        name={routes.UPDATE_PROFILE_SCREEN}
        component={UpdateProfileScreen}
      />
      <ProfileInnerStack.Screen
        name={routes.CHANGE_PROFILE_PICTURE}
        component={ChangeProfilePicture}
      />
    </ProfileInnerStack.Navigator>
  );
};

export default ProfileStack;
