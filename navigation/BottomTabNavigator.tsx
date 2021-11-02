/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialIcons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import CompaniesScreen from '../screens/CompaniesScreen';
import CompanyDetailsScreen from '../screens/CompanyDetailsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventListScreen from "../screens/EventListScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from '../screens/ProfileScreen';
import TicketsScreen from '../screens/TicketsScreen';
import QRScreen from '../screens/QRScreen';
import { Ticket } from '../api/tickets';
import ZoomMapScreen from '../screens/ZoomMapScreen';
import { Map } from '../components/maps/MapProps';
import EditProfileScreen from '../screens/EditProfileScreen';



export type BottomTabParamList = {
  Companies: undefined;
  Maps: undefined;
  Profile: undefined;
  Events: undefined
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Events"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Companies"
        component={CompaniesNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIonicon name="briefcase-outline" color={color} />,
        }}
      />
      <BottomTab.Screen 
        name="Maps"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIonicon name="map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="event" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIonicon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIonicon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialIcon(props: { name: React.ComponentProps<typeof MaterialIcons>['name']; color: string }) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export type CompanyStackParamList = {
  CompaniesScreen: undefined;
  CompanyDetailsScreen: {
    id: number;
  };
};
const CompanyStack = createStackNavigator<CompanyStackParamList>();
function CompaniesNavigator() {
  return (
    <CompanyStack.Navigator>
      <CompanyStack.Screen
        name="CompaniesScreen"
        component={CompaniesScreen}
        options={{ title: 'Companies', headerTitle: 'Companies' }}
      />
      <CompanyStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{ title: 'Company Details', headerTitle: 'Company Details' }}
      />
    </CompanyStack.Navigator>
  );
}

export type EventStackParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    id: number;
  }
}
const EventStack = createStackNavigator<EventStackParamlist>();
function EventsNavigator() {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name="EventListScreen"
        component={EventListScreen}
        options={{ title: 'Events', headerTitle: 'Events' }}
      />
      <EventStack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ title: 'Event Details', headerTitle: 'Event Details' }}
      />
    </EventStack.Navigator>
  );
}

export type MapStackParamList = {
  MapScreen: undefined;
  ZoomMapScreen: {
    map: Map;
  }
}
const MapStack = createStackNavigator<MapStackParamList>();
function MapNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ title: 'Maps', headerTitle: 'Maps' }} />
    <MapStack.Screen
        name="ZoomMapScreen"
        component={ZoomMapScreen}
        options={{ title: 'Map', headerTitle: 'Map' }} />
    </MapStack.Navigator>
  )
}

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  EventDetailsScreen: {
    id: number;
  },
  TicketsScreen: undefined;
  QRScreen: undefined,
}
const ProfileStack = createStackNavigator<ProfileStackParamList>();
function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile', headerTitle: 'Profile' }}
      />
      <ProfileStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerTitle: 'Edit Profile' }}
      />
      <ProfileStack.Screen 
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ headerTitle: 'Event' }}
      />
      <ProfileStack.Screen 
        name="TicketsScreen"
        component={TicketsScreen}
        options={{ title: 'Tickets', headerTitle: 'Tickets' }}
      />
      <ProfileStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ headerTitle: 'QR' }}
      />
    </ProfileStack.Navigator>
  );
}
