import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventSwitchScreen from '../event/EventSwitchScreen';
import EventDetailsScreen from '../event/templates/EventDetailsScreen';
import ProfileScreen from './ProfileScreen';
import ProfileSwitchScreen from './ProfileSwitchScreen';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  ProfileSwitchScreen: {
    screen: string;
  };
  EventSwitchScreen: {
    id: number;
    screen: string;
  }
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
        name="EventSwitchScreen"
        component={EventSwitchScreen}
        options={{ headerTitle: 'Event' }} />
    </ProfileStack.Navigator>
  );
}
