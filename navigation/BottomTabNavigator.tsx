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
import SSsCompaniesScreen from '../screens/studentSessions/SSsCompaniesScreen';
import SSsListScreen from "../screens/studentSessions/SSsListScreen";
import MapScreen from "../screens/MapScreen";
import ProfileScreen from '../screens/ProfileScreen';
import TicketsScreen from '../screens/TicketsScreen';
import QRScreen from '../screens/QRScreen';
import ZoomMapScreen from '../screens/ZoomMapScreen';
import { Map } from '../components/maps/MapProps';
import EditProfileScreen from '../screens/EditProfileScreen';
import { getMe, Role, User } from '../api/users';

import { Platform } from 'react-native';
import SSsDetailsScreen from '../screens/studentSessions/SSsDetailsScreen';
import SSsApplicationScreen from '../screens/studentSessions/SSsApplicationSreen';
import SSsApplicationsListScreen from '../screens/studentSessions/SSsApplicationsListScreen';
import { Text, View } from '../components/Themed';
import { API } from '../api';


export type BottomTabParamList = {
  Companies: undefined;
  Maps: undefined;
  Profile: undefined;
  SSs: undefined;
  Events: undefined
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [companyId, setCompanyId] = React.useState<number | null>(null);
  const [companyName, setCompanyName] = React.useState<string | null>(null);
  const [user, setUser] = React.useState< User | null>(null);

  const getUser = async () => {
    setLoading(true);
    const usr = await getMe();
    setUser(usr);
    setCompanyId(usr.companyId);
    const company = usr.companyId ? await API.companies.getCompany(usr.companyId) : null;
    setCompanyName(company?.name ? company.name : null);
    setLoading(false);
  }

  React.useEffect(() => {
    getUser();
  }, []);


  if(isLoading || user == null) {
    return (<View>
              <Text>isLoading</Text>
            </View>)
  }
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (navigation.canGoBack()) {
              //navigation.popToTop()
            }
            navigation.replace('CompaniesScreen')
          },
        })}
      />
      {//Platform.OS !== 'web' && commented out because didn't know why was here
      <BottomTab.Screen 
        name="Maps"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIonicon name="map" color={color} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (navigation.canGoBack()) {
              //navigation.popToTop()
            }
            navigation.replace('MapScreen')
          },
        })}
      />
      }
      <BottomTab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="event" color={color} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (navigation.canGoBack()) {
              //navigation.popToTop()
            }
            navigation.replace('EventListScreen')
          },
        })}
      />
      <BottomTab.Screen
        name="SSs"
        component={SSsNavigator}
        options={{
          title: 'Student Sessions',
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="forum" color={color} />,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (navigation.canGoBack()) {
              //navigation.popToTop()
            }
            user.role === Role.CompanyRepresentative ? navigation.replace('SSsListScreen', { companyId, companyName }) : navigation.replace('SSsCompaniesScreen')
          },
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIonicon name="person" color={color} />,
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            if (navigation.canGoBack()) {
              //navigation.popToTop()
            }
            navigation.replace('ProfileScreen')
          },
        })}
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

export type SSsStackParamlist = {
  SSsCompaniesScreen: undefined;
  SSsListScreen: {
    companyId: number;
    companyName: string;
  }
  SSsDetailsScreen: {
    companyId: number;
    companyName: string;
    timeslotId: number;
  }
  SSsApplicationScreen: {
    companyId: number;
    companyName: string;
  }
  SSsApplicationsListScreen: {
    companyId: number;
    companyName: string;
  }
}

const SSsStack = createStackNavigator<SSsStackParamlist>();
function SSsNavigator() {
  return (
    <SSsStack.Navigator>
      <SSsStack.Screen
        name="SSsCompaniesScreen"
        component={SSsCompaniesScreen}
        options={{ title: 'Student Sessions', headerTitle: 'Student Sessions' }}
      />
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{ title: 'Student Sessions List', headerTitle: 'Student Sessions List' }}
      />
      <SSsStack.Screen
        name="SSsDetailsScreen"
        component={SSsDetailsScreen}
        options={{ title: 'Session Details', headerTitle: 'Session Details' }}
      />
      <SSsStack.Screen
        name="SSsApplicationScreen"
        component={SSsApplicationScreen}
        options={{ title: 'Application', headerTitle: 'Application' }}
      />
        <SSsStack.Screen
        name="SSsApplicationsListScreen"
        component={SSsApplicationsListScreen}
        options={{ title: 'Applications', headerTitle: 'Applications' }}
      />
    </SSsStack.Navigator>
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
