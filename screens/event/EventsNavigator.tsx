import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import EventListScreen from "./EventListScreen";
//import QRScreen from './QRScreen';
import EventSwitchScreen from "./EventSwitchScreen";
import { HeaderStyles } from "components/HeaderStyles";
import { Image } from "react-native";

export type EventStackParamlist = {
  EventListScreen: undefined;
  EventSwitchScreen: {
    id: number;
    screen: string;
  };
  QRScreen: {
    id: number;
  };
};
const EventStack = createStackNavigator<EventStackParamlist>();
export function EventsNavigator() {
  return (
    <EventStack.Navigator
      screenOptions={{ 
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true }}
    >
      <EventStack.Screen
        name="EventListScreen"
        component={EventListScreen}
        options={{
          title: "Events",
          headerTitle: "Events",
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
      <EventStack.Screen
        name="EventSwitchScreen"
        component={EventSwitchScreen}
        options={{
          title: "Event",
          headerTitle: "Events",
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
      {/* <EventStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ title: 'QR Scan', headerTitle: 'QR Scan', ...HeaderStyles }}
      /> */}
    </EventStack.Navigator>
  );
}
