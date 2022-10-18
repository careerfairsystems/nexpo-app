import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import CompaniesScreen from './CompaniesScreen';
import CompanyDetailsScreen from './CompanyDetailsScreen';


export type CompanyStackParamList = {
  CompaniesScreen: undefined;
  CompanyDetailsScreen: {
    id: number;
  };
};
const CompanyStack = createStackNavigator<CompanyStackParamList>();
export function CompaniesNavigator() {
  return (
    <CompanyStack.Navigator>
      <CompanyStack.Screen
        name="CompaniesScreen"
        component={CompaniesScreen}
        options={{ title: 'Companies', headerTitle: 'Companies' }} />
      <CompanyStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{ title: 'Company Details', headerTitle: 'Company Details' }} />
    </CompanyStack.Navigator>
  );
}
