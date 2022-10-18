/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { AuthContext } from '../components/AuthContext';

import { API } from '../api';
import { AuthNavigator } from '../screens/auth/AuthNavigator';


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


