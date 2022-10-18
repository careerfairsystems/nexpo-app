/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialIcons  } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { getMe, Role, User } from '../api/users';

import { View } from '../components/Themed';
import { API } from '../api';
import { LogoutButton } from '../components/profileScreen/Buttons';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { MapNavigator } from '../screens/maps/MapNavigator';
import { ProfileNavigator } from '../screens/profile/ProfileNavigator';
import { EventsNavigator } from '../screens/event/EventsNavigator';
import { CompaniesNavigator } from '../screens/companies/CompaniesNavigator';
import { SSsStudentNavigator } from '../screens/studentSessions/SSsStudentNavigator';
import { SSsCRepNavigator } from '../screens/studentSessions/SSsCRepNavigator';


export type BottomTabParamList = {
  Companies: undefined;
  Maps: undefined;
  Profile: undefined;
  SSsStudent: undefined;
  SSsCRep: {companyId: number;};
  Events: undefined
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [companyId, setCompanyId] = React.useState<number | null>(null);
  const [user, setUser] = React.useState< User | null>(null);
  const authContext = useContext(AuthContext);

  const getUser = async () => {
    try {
      setLoading(true);
      const usr = await getMe();
      setUser(usr);
      setCompanyId(usr.companyId);
    } catch (error) {
      console.log(error);
      logout();
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUser();
  }, []);

  async function logout() {
    await API.auth.logout();
    authContext.signOut();
  };

  if(isLoading || !user) {
    return (
      <ScreenActivityIndicator />
    )
  }
  return (
    <BottomTab.Navigator
      initialRouteName="Events"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Companies"
        component={CompaniesNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarIonicon name="briefcase-outline" color={color} />, }}
      />
      <BottomTab.Screen 
        name="Maps"
        component={MapNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarIonicon name="map" color={color} />,}}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarMaterialIcon name="event" color={color} />, }}
      />
      {user.role !== Role.CompanyRepresentative ? 
      <BottomTab.Screen
        name="SSsStudent"
        component={SSsStudentNavigator}
        options={{
          title: 'Student Sessions',
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="forum" color={color} />,
        }}
      /> : companyId &&
      <BottomTab.Screen
        name="SSsCRep"
        component={SSsCRepNavigator}
        options={{
          title: 'Student Sessions',
          tabBarIcon: ({ color }) => <TabBarMaterialIcon name="forum" color={color} />,
        }}
        initialParams={{companyId: companyId}}
      />
      }
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarIonicon name="person" color={color} />, }}
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