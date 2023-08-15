import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import { Image } from "react-native";
import SSsListScreen from "./SSsListScreen";
import SSsApplicationDetailsScreen from "./SSsApplicationDetailsScreen";
import SSsSwitchScreen from "./SSsSwitchScreen";
import { HeaderStyles } from "components/HeaderStyles";

export type SSsStackParamlist = {
  SSsListScreen: {
    companyId: number;
  };
  SSsSwitchScreen: {
    id: number;
    screen: string;
  };
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
export function SSsCRepNavigator({ route }: SSsCRepNavigatorParams) {
  const companyId = route.params.companyId;
  return (
    <SSsStack.Navigator
      screenOptions={{ 
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true }}
    >
      <SSsStack.Screen
        name="SSsListScreen"
        component={SSsListScreen}
        options={{
          title: "Student Sessions List",
          headerTitle: "Student Sessions",
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
        initialParams={{ companyId }}
      />
      <SSsStack.Screen
        name="SSsSwitchScreen"
        component={SSsSwitchScreen}
        options={{ title: "Studentsession", headerTitle: "Student Sessions",  ...HeaderStyles }}
      />
      <SSsStack.Screen
        name="SSsApplicationDetailsScreen"
        component={SSsApplicationDetailsScreen}
        options={{ title: "Application Details", headerTitle: "Student Sessions", ...HeaderStyles }}
      />
    </SSsStack.Navigator>
  );
}
