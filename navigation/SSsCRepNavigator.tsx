import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SSsListScreen from "../screens/studentSessions/SSsListScreen";
import SSsApplicationDetailsScreen from '../screens/studentSessions/SSsApplicationDetailsScreen';
import SSsSwitchScreen from '../screens/studentSessions/SSsSwitchScreen';


export type SSsStackParamlist = {
  SSsListScreen: {
    companyId: number;
  };
  SSsSwitchScreen: {
    id: number;
    screen: string;
  }
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
        name="SSsSwitchScreen"
        component={SSsSwitchScreen}
        options={{ title: 'Studentsession', headerTitle: 'Studentsession' }} />
      <SSsStack.Screen
        name="SSsApplicationDetailsScreen"
        component={SSsApplicationDetailsScreen}
        options={{ title: 'Application Details', headerTitle: 'Application Details' }} />
    </SSsStack.Navigator>
  );
}
