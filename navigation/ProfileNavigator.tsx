import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TicketsScreen from '../screens/TicketsScreen';
import QRScreen from '../screens/QRScreen';
import EditProfileScreen from '../screens/EditProfileScreen';


export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  EventDetailsScreen: {
    id: number;
  };
  TicketsScreen: undefined;
  QRScreen: undefined;
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
      <ProfileStack.Screen
        name="TicketsScreen"
        component={TicketsScreen}
        options={{ title: 'Tickets', headerTitle: 'Tickets' }} />
      <ProfileStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ headerTitle: 'QR' }} />
    </ProfileStack.Navigator>
  );
}
