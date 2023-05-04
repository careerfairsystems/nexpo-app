import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import CompaniesScreen from "./CompaniesScreen";
import CompanyDetailsScreen from "./CompanyDetailsScreen";
import { Image } from "react-native";

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
        options={{
          title: "Companies",
          headerTitle: "Companies",
          headerRight: () => (
            <Image
              source={require("../../assets/images/arkad_logo.png")}
              style={{
                marginRight: 10,
                width: 60,
                height: undefined,
                flex: 1,
              }}
            />
          ),
          ...HeaderStyles,
        }}
      />
      <CompanyStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{
          title: "Company Details",
          headerTitle: "Companies",
          headerRight: () => (
            <Image
              source={require("../../assets/images/arkad_logo.png")}
              style={{
                marginRight: 10,
                width: 60,
                height: undefined,
                flex: 1,
              }}
            />
          ),
          ...HeaderStyles,
        }}
      />
    </CompanyStack.Navigator>
  );
}
