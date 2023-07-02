/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "constants/Colors";

import { getMe, User } from "api/Users";
import { Role } from "api/Role";

import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { useContext } from "react";
import { AuthContext } from "components/AuthContext";
import { MapNavigator } from "../screens/maps/MapNavigator";
import { ProfileNavigator } from "../screens/profile/ProfileNavigator";
import { AuthNavigator } from "screens/auth/AuthNavigator";
import { EventsNavigator } from "../screens/event/EventsNavigator";
import { CompaniesNavigator } from "../screens/companies/CompaniesNavigator";
import { SSsStudentNavigator } from "../screens/studentSessions/SSsStudentNavigator";
import { SSsCRepNavigator } from "../screens/studentSessions/SSsCRepNavigator";
import { HeaderStyles } from "components/HeaderStyles";

export type BottomTabParamList = {
  Companies: undefined;
  Maps: undefined;
  You: undefined;
  Login: undefined;
  SSsStudent: undefined;
  SSsCRep: { companyId: number };
  Events: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator() {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [companyId, setCompanyId] = React.useState<number | null>(null);
  const [isSignedIn, setSignedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);
  const authContext = useContext(AuthContext);

  const getSignedInStatus = async () => {
    setLoading(true);
    const status = await API.auth.isAuthenticated();
    setSignedIn(status);
    setLoading(false);
  };

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
  };

  React.useEffect(() => {
    getSignedInStatus();
    if (isSignedIn) {
      getUser();
    }
  }, [isSignedIn]);

  async function logout() {
    await API.auth.logout();
    authContext.signOut();
  }

  if (isLoading) {
    return <ScreenActivityIndicator />;
  } else {
    return (
      <BottomTab.Navigator
        initialRouteName="Events"
        tabBarOptions={{
          activeTintColor: Colors.white,
          inactiveTintColor: Colors.arkadTurkos,
          activeBackgroundColor: Colors.arkadNavy,
          inactiveBackgroundColor: Colors.arkadNavy,
          style: {
            borderTopColor: Colors.arkadNavy,
          },
        }}
      >
        <BottomTab.Screen
          name="Companies"
          component={CompaniesNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIonicon
                name="briefcase-outline"
                color={Colors.arkadTurkos}
              />
            ),
            ...HeaderStyles,
          }}
        />
        <BottomTab.Screen
          name="Maps"
          component={MapNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIonicon name="map" color={Colors.arkadTurkos} />
            ),
            ...HeaderStyles,
          }}
        />
        {
          <BottomTab.Screen
            name="Events"
            component={EventsNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <TabBarMaterialIcon name="event" color={Colors.arkadTurkos} />
              ),
              ...HeaderStyles,
            }}
          />
        }
        {user &&
          (user.role !== Role.CompanyRepresentative ? (
            <BottomTab.Screen
              name="SSsStudent"
              component={SSsStudentNavigator}
              options={{
                title: "Student Sessions",
                tabBarIcon: ({ color }) => (
                  <TabBarMaterialIcon name="forum" color={Colors.arkadTurkos} />
                ),
                ...HeaderStyles,
              }}
            />
          ) : (
            companyId && (
              <BottomTab.Screen
                name="SSsCRep"
                component={SSsCRepNavigator}
                options={{
                  title: "Student Sessions",
                  tabBarIcon: ({ color }) => (
                    <TabBarMaterialIcon
                      name="forum"
                      color={Colors.arkadTurkos}
                    />
                  ),
                  ...HeaderStyles,
                }}
                initialParams={{ companyId: companyId }}
              />
            )
          ))}
        {isSignedIn ? (
          <BottomTab.Screen
            name="You"
            component={ProfileNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <TabBarIonicon name="person" color={Colors.arkadTurkos} />
              ),
              ...HeaderStyles,
            }}
          />
        ) : (
          <BottomTab.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              tabBarIcon: ({ color }) => (
                <TabBarIonicon name="person" color={Colors.arkadTurkos} />
              ),
              ...HeaderStyles,
            }}
          />
        )}
      </BottomTab.Navigator>
    );
  }
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIonicon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={30} style={{ marginBottom: -3 }} {...props} />;
}
