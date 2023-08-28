/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import * as React from "react";

import Colors from "constants/Colors";

import { getMe, User } from "api/Users";
import { Role } from "api/Role";

import { API } from "api/API";
import ScreenActivityIndicator from "components/ScreenActivityIndicator";
import { useContext } from "react";
import { MapNavigator } from "../screens/maps/MapNavigator";
import { ProfileNavigator } from "../screens/profile/ProfileNavigator";
import { AuthNavigator } from "screens/auth/AuthNavigator";
import { EventsNavigator } from "../screens/event/EventsNavigator";
import { CompaniesNavigator } from "../screens/companies/CompaniesNavigator";
import { SSsStudentNavigator } from "../screens/studentSessions/SSsStudentNavigator";
import { SSsCRepNavigator } from "../screens/studentSessions/SSsCRepNavigator";
import { HeaderStyles } from "components/HeaderStyles";
import {
  AuthContext,
  AuthDispatchContext,
} from "components/AuthContextProvider";

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
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [companyId, setCompanyId] = React.useState<number | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const isSignedIn = useContext(AuthContext);
  const setSignedIn = useContext(AuthDispatchContext);

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
    if (isSignedIn) {
      getUser();
    } else {
      setUser(null);
      setCompanyId(null);
    }
  }, [isSignedIn]);

  async function logout() {
    await API.auth.logout();
    setSignedIn(false);
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
            borderTopColor: "#003366",
          },
        }}
      >
        <BottomTab.Screen
          name="Companies"
          component={CompaniesNavigator}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../assets/images/BottomNavigatorIconPackage/Business 2W.png")
                      : require("../assets/images/BottomNavigatorIconPackage/Business 2B.png")
                  }
                  style={{ width: 30, height: 30, marginBottom: -3 }}
                />
              );
            },
            ...HeaderStyles,
          }}
        />
        <BottomTab.Screen
          name="Maps"
          component={MapNavigator}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={
                    focused
                      ? require("../assets/images/BottomNavigatorIconPackage/Maps 2W.png")
                      : require("../assets/images/BottomNavigatorIconPackage/Maps 2B.png")
                  }
                  style={{ width: 30, height: 30, marginBottom: -3 }}
                />
              );
            },
            ...HeaderStyles,
          }}
        />
        {
          <BottomTab.Screen
            name="Events"
            component={EventsNavigator}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? require("../assets/images/BottomNavigatorIconPackage/Events 2W.png")
                        : require("../assets/images/BottomNavigatorIconPackage/Events 2B.png")
                    }
                    style={{ width: 30, height: 30, marginBottom: -3 }}
                  />
                );
              },
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
                tabBarIcon: ({ focused }) => {
                  return (
                    <Image
                      source={
                        focused
                          ? require("../assets/images/BottomNavigatorIconPackage/Student Sessions 2W.png")
                          : require("../assets/images/BottomNavigatorIconPackage/Student sessions 2B.png")
                      }
                      style={{ width: 30, height: 30, marginBottom: -3 }}
                    />
                  );
                },
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
                  tabBarIcon: ({ focused }) => {
                    return (
                      <Image
                        source={
                          focused
                            ? require("../assets/images/BottomNavigatorIconPackage/Student Sessions 2W.png")
                            : require("../assets/images/BottomNavigatorIconPackage/Student sessions 2B.png")
                        }
                        style={{ width: 30, height: 30, marginBottom: -3 }}
                      />
                    );
                  },
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
            options={({}) => ({
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? require("../assets/images/BottomNavigatorIconPackage/Profile 2W.png")
                        : require("../assets/images/BottomNavigatorIconPackage/Profile 2B.png")
                    }
                    style={{ width: 30, height: 30, marginBottom: -3 }}
                  />
                );
              },
            })}
          />
        ) : (
          <BottomTab.Screen
            name="Login"
            component={AuthNavigator}
            options={({}) => ({
              tabBarIcon: ({ focused }) => {
                return (
                  <Image
                    source={
                      focused
                        ? require("../assets/images/BottomNavigatorIconPackage/Profile 2W.png")
                        : require("../assets/images/BottomNavigatorIconPackage/Profile 2B.png")
                    }
                    style={{ width: 30, height: 30, marginBottom: -3 }}
                  />
                );
              },
            })}
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
