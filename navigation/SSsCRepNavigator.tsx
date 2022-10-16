import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SSsListScreen from "../screens/studentSessions/SSsListScreen";
import SSsDetailsScreen from '../screens/studentSessions/SSsDetailsScreen';
import SSsApplicationScreen from '../screens/studentSessions/SSsApplicationSreen';
import SSsApplicationsListScreen from '../screens/studentSessions/SSsApplicationsListScreen';
import SSsApplicationDetailsScreen from '../screens/studentSessions/SSsApplicationDetailsScreen';


export type SSsStackParamlist = {
  SSsListScreen: {
    companyId: number;
  };
  SSsDetailsScreen: {
    timeslotId: number;
  };
  SSsApplicationScreen: {
    companyId: number;
  };
  SSsApplicationsListScreen: undefined;
  SSsApplicationDetailsScreen: {
    applicationId: number;
  };
};
const SSsStack = createStackNavigator<SSsStackParamlist>();
export type SSsCRepNavigatorParams = {
  route: {
    params: {
      companyId: number;
    };
  };
};
export function SSsCRepNavigator({route}: SSsCRepNavigatorParams) {
  const companyId = route.params.companyId;
  return (
    <SSsStack.Navigator>
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{ title: 'Student Sessions List', headerTitle: 'Student Sessions List' }}
        initialParams= {{companyId}} />
        
      <SSsStack.Screen
        name="SSsDetailsScreen"
        component={SSsDetailsScreen}
        options={{ title: 'Session Details', headerTitle: 'Session Details' }} />
      <SSsStack.Screen
        name="SSsApplicationScreen"
        component={SSsApplicationScreen}
        options={{ title: 'Application', headerTitle: 'Application' }} />
      <SSsStack.Screen
        name="SSsApplicationsListScreen"
        component={SSsApplicationsListScreen}
        options={{ title: 'Applications', headerTitle: 'Applications' }} />
      <SSsStack.Screen
        name="SSsApplicationDetailsScreen"
        component={SSsApplicationDetailsScreen}
        options={{ title: 'Application Details', headerTitle: 'Application Details' }} />
    </SSsStack.Navigator>
  );
}
