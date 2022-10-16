import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from '../event/EventDetailsScreen';
import ProfileScreen from './ProfileScreen';
import ProfileSwitchScreen from './ProfileSwitchScreen';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  ProfileSwitchScreen: {
    screen: string;
  };
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
        name="ProfileSwitchScreen"
        component={ProfileSwitchScreen}
        options={{ headerTitle: 'Profile' }} />
      <ProfileStack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ headerTitle: 'Event' }} />
    </ProfileStack.Navigator>
  );
}
