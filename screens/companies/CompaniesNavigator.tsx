import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import CompaniesScreen from "./CompaniesScreen";
import CompanyDetailsScreen from "./CompanyDetailsScreen";
import { Image } from "react-native";
import Colors from "constants/Colors";

export type CompanyStackParamList = {
  CompaniesScreen: undefined;
  CompanyDetailsScreen: {
    id: number;
  };
};
const CompanyStack = createStackNavigator<CompanyStackParamList>();
export function CompaniesNavigator() {
  return (
    <CompanyStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <CompanyStack.Screen
        name="CompaniesScreen"
        component={CompaniesScreen}
        options={{
          title: "Companies",
          headerTitle: "Companies",
          headerRight: () => (
            <Image
              source={require("../../assets/images/arkad_logo_inverted.png")}
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
              source={require("../../assets/images/arkad_logo_inverted.png")}
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
