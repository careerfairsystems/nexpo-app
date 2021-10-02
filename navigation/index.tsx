/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LoginScreen from '../screens/LoginScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import { API } from '../api';

type AuthenticationContext = {
  signIn: () => void;
  signOut: () => void;
}
const defaultAuthContext = {
  signIn: () => {
    console.error('Using AuthContext outside provider, check that a parent provides a real context');
  },
  signOut: () => {
    console.error('Using AuthContext outside provider, check that a parent provides a real context');
  }
}
export const AuthContext = React.createContext<AuthenticationContext>(defaultAuthContext);

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [signedIn, setSignedIn] = React.useState<boolean>(false);

  const authContext = {
    signIn: () => {
      setSignedIn(true);
    },
    signOut: () => {
      setSignedIn(false);
    }
  };

  // Set initial state if already signed in
  React.useEffect(() => {
    const bootstrap = async () => {
      const authenticated = await API.auth.isAuthenticated();
      setSignedIn(authenticated);
    }

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          { signedIn
            ? <RootNavigator />
            : <AuthNavigator />
          }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Root" >
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}

type AuthStackParamList = {
  Login: undefined;
}
const AuthStack = createStackNavigator<AuthStackParamList>();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
