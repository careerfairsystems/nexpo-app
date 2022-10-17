import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import EditProfileScreen from '../screens/EditProfileScreen';


export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  EventDetailsScreen: {
    id: number;
  };
};
const ProfileStack = createStackNavigator<ProfileStackParamList>();
export function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile', headerTitle: 'Profile' }} />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerTitle: 'Edit Profile' }} />
      <ProfileStack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ headerTitle: 'Event' }} />
    </ProfileStack.Navigator>
  );
}
