import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import MapScreen from "./MapScreen";
import ZoomMapScreen from "./ZoomMapScreen";
import { Map } from "components/maps/MapProps";
import { HeaderStyles } from "components/HeaderStyles";
import { Image } from "react-native";
import PositioningMapScreen from "./PositioningMapScreen";

export type MapStackParamList = {
  PositioningMapScreen: undefined;
  ZoomMapScreen: {
    map: Map;
  };
};
const MapStack = createStackNavigator<MapStackParamList>();
export function MapNavigator() {
  return (
    <MapStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
      }}
    >
      <MapStack.Screen
        name="PositioningMapScreen"
        component={PositioningMapScreen}
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
        name="ZoomMapScreen"
        component={ZoomMapScreen}
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
