import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";

import { Map } from "components/maps/MapProps";
import { HeaderStyles } from "components/HeaderStyles";
import { Image } from "react-native";
import CombainMapScreen from "./CombainMapScreen";
import ViewAllBuildingsScreen from "./ViewAllBuildingsScreen";

export type MapStackParamList = {
  CombainMapScreen: undefined;
  ViewAllBuildingsScreen: undefined;
};
const MapStack = createStackNavigator<MapStackParamList>();
export default function CombainMapNavigator() {
  return (
    <MapStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <MapStack.Screen
        name="CombainMapScreen"
        component={CombainMapScreen}
        options={{
          title: "Maps",
          headerTitle: "Maps",
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
      <MapStack.Screen
        name="ViewAllBuildingsScreen"
        component={ViewAllBuildingsScreen}
        options={{
          title: "Map",
          headerTitle: "Maps",
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
    </MapStack.Navigator>
  );
}
