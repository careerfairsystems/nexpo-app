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
import SignUpScreen from '../screens/SignUpScreen';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { AuthContext } from '../components/AuthContext';

import { API } from '../api';
import FinalizeSignUpScreen from '../screens/FinalizeSignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';


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

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
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

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  FinalizeSignUpScreen: {
    token: string;
  };
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: {
    token: string;
  };
}
const AuthStack = createStackNavigator<AuthStackParamList>();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginScreen">
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }}/>
      <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign up' }} />
      <AuthStack.Screen name="FinalizeSignUpScreen" component={FinalizeSignUpScreen} options={{ title: 'Finalize signup' }} />
      <AuthStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Forgot password' }} />
      <AuthStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: 'Reset password' }} />
    </AuthStack.Navigator>
  );
}
