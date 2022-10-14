import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import SSsCompaniesScreen from '../screens/studentSessions/SSsCompaniesScreen';
import SSsListScreen from "../screens/studentSessions/SSsListScreen";
import SSsDetailsScreen from '../screenTemplates/SSsDetailsScreen';
import SSsApplicationScreen from '../screenTemplates/SSsApplicationSreen';
import SSsApplicationsListScreen from '../screenTemplates/SSsApplicationsListScreen';
import SSsApplicationDetailsScreen from '../screens/studentSessions/SSsApplicationDetailsScreen';
import SSsSwitchScreen from '../screens/studentSessions/SSsSwitchScreen';


export type SSsStackParamlist = {
  SSsCompaniesScreen: undefined;
  SSsListScreen: {
    companyId: number;
  };
  SSsSwitchScreen: {
    id: number;
    screen: string;
  }
};
const SSsStack = createStackNavigator<SSsStackParamlist>();
export function SSsStudentNavigator() {
  return (
    <SSsStack.Navigator>
      <SSsStack.Screen
        name="SSsCompaniesScreen"
        component={SSsCompaniesScreen}
        options={{ title: 'Student Sessions', headerTitle: 'Student Sessions' }} />
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{ title: 'Student Sessions List', headerTitle: 'Student Sessions List' }} />
        <SSsStack.Screen
        name="SSsSwitchScreen"
        component={SSsSwitchScreen}
        options={{ title: 'Studentsession', headerTitle: 'Studentsession' }} />
    </SSsStack.Navigator>
  );
}
