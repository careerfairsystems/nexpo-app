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
import OnboardingScreen from "./OnBoardingScreen";
import OnBoardingScreen from "./OnBoardingScreen";
import { ReactAIIndoorNavigationSDK } from "react-native-ai-navigation-sdk";

export type MapStackParamList = {
  PositioningMapScreen: { sdk: ReactAIIndoorNavigationSDK }; // Accept SDK instance as a parameter
  OnBoardingScreen: undefined;
  MapScreen: undefined;
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
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{
          title: "Onboarding",
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
        name="MapScreen"
        component={MapScreen}
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
