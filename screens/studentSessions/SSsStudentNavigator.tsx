import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderStyles } from "components/HeaderStyles";
import SSsCompaniesScreen from "./SSsCompaniesScreen";
import SSsListScreen from "./SSsListScreen";
import SSsSwitchScreen from "./SSsSwitchScreen";
import { Image } from "react-native";

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
    <SSsStack.Navigator>
      <SSsStack.Screen
        name="SSsCompaniesScreen"
        component={SSsCompaniesScreen}
        options={{
          title: "Student Sessions",
          headerTitle: "Student Sessions",
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
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{
          title: "Student Sessions List",
          headerTitle: "Student Sessions",
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
      <SSsStack.Screen
        name="SSsSwitchScreen"
        component={SSsSwitchScreen}
        options={{
          title: "Studentsession",
          headerTitle: "Student Sessions",
          ...HeaderStyles,
        }}
      />
    </SSsStack.Navigator>
  );
}
