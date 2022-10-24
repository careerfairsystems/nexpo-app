import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventListScreen from "./EventListScreen";
import QRScreen from './QRScreen';
import EventSwitchScreen from './EventSwitchScreen';


export type EventStackParamlist = {
  EventListScreen: undefined;
  EventSwitchScreen: {
    id: number;
    screen: string;
  }
  QRScreen: {
    id: number;
  }
}
const EventStack = createStackNavigator<EventStackParamlist>();
export function EventsNavigator() {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name="EventListScreen"
        component={EventListScreen}
        options={{ title: 'Events', headerTitle: 'Events' }}
      />
      <EventStack.Screen
        name="EventSwitchScreen"
        component={EventSwitchScreen}
        options={{ title: 'Event', headerTitle: 'Event' }}
      />
      <EventStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ title: 'QR Scan', headerTitle: 'QR Scan' }}
      />
    </EventStack.Navigator>
  );
}