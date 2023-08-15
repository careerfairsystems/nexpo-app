/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

import Colors from "constants/Colors";
import { AuthContextProvider } from "components/AuthContextProvider";

export default function Navigation() {

  const theme: Theme = {
    dark: false,
    colors: {
      primary: DefaultTheme.colors.primary,
      background: Colors.arkadNavy,
      card: DefaultTheme.colors.card,
      text: Colors.white,
      border: Colors.arkadNavy,
      notification: DefaultTheme.colors.notification,
    },
  };

  return (
    <AuthContextProvider>
      <NavigationContainer linking={LinkingConfiguration} theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Root"
    >
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </RootStack.Navigator>
  );
}
