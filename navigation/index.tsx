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
import { AuthContext } from "components/AuthContext";

import { API } from "api/API";
import Colors from "constants/Colors";

export default function Navigation() {
  const [signedIn, setSignedIn] = React.useState<boolean>(false);

  const theme: Theme = {
    dark: false,
    colors: {
      primary: DefaultTheme.colors.primary,
      background: Colors.white,
      card: DefaultTheme.colors.card,
      text: Colors.white,
      border: Colors.arkadNavy,
      notification: DefaultTheme.colors.notification,
    },
  };

  const authContext = {
    signIn: () => {
      setSignedIn(true);
    },
    signOut: () => {
      setSignedIn(false);
    },
  };

  // Set initial state if already signed in
  React.useEffect(() => {
    const bootstrap = async () => {
      const authenticated = await API.auth.isAuthenticated();
      setSignedIn(authenticated);
    };

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer linking={LinkingConfiguration} theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
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
