import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import SSsCompaniesScreen from "./SSsCompaniesScreen";
import SSsListScreen from "./SSsListScreen";
import SSsSwitchScreen from "./SSsSwitchScreen";
import { Image } from "react-native";
import Colors from "constants/Colors";

export type SSsStackParamlist = {
  SSsCompaniesScreen: undefined;
  SSsListScreen: {
    companyId: number;
  };
  SSsSwitchScreen: {
    id: number;
    screen: string;
  };
};
const SSsStack = createStackNavigator<SSsStackParamlist>();
export function SSsStudentNavigator() {
  return (
    <SSsStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <SSsStack.Screen
        name="SSsCompaniesScreen"
        component={SSsCompaniesScreen}
        options={{
          title: "Student Sessions",
          headerTitle: "",
          ...HeaderStyles,
        }}
      />
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{
          title: "Student Sessions List",
          headerTitle: "",
          ...HeaderStyles,
          headerStyle: {
            backgroundColor: Colors.arkadTurkos,
            borderBottomWidth: 0,
          },
        }}
      />
      <SSsStack.Screen
        name="SSsSwitchScreen"
        component={SSsSwitchScreen}
        options={{
          title: "Studentsession",
          headerTitle: "",
          ...HeaderStyles,
        }}
      />
    </SSsStack.Navigator>
  );
}
