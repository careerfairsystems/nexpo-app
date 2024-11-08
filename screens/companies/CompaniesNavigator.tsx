import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import CompaniesScreen from "./CompaniesScreen";
import CompanyDetailsScreen from "./CompanyDetailsScreen";
import { Image } from "react-native";
import { SearchBar, SearchBarProps } from "components/SearchBar";
import { TextInput } from "components/TextInput";
import Colors from "constants/Colors";

export type CompanyStackParamList = {
  CompaniesScreen: {
    searchBarProps: SearchBarProps;
  };
  CompanyDetailsScreen: {
    id: number;
  };
};
const CompanyStack = createStackNavigator<CompanyStackParamList>();
export function CompaniesNavigator() {
  return (
    <CompanyStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <CompanyStack.Screen
        name="CompaniesScreen"
        component={CompaniesScreen}
        options={{
          headerBackTitleVisible: false,
          ...HeaderStyles,
          headerTitleStyle: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.arkadNavy,
          },
        }}
      />
      <CompanyStack.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerTransparent: true,
          ...HeaderStyles,
          headerStyle: {
            borderBottomWidth: 0,
            borderBottomColor: Colors.arkadGreen,
            backgroundColor: Colors.arkadTurkos,
          }
        }}
      />
    </CompanyStack.Navigator>
  );
}
