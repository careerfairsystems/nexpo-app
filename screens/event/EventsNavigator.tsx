import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from './templates/EventDetailsScreen';
import EventListScreen from "./EventListScreen";
import EventParticipantsScreen from './templates/EventParticipantsScreen';
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
        options={{ title: 'Event Participants', headerTitle: 'Event Participants' }}
      />
      <EventStack.Screen
        name="QRScreen"
        component={QRScreen}
        options={{ title: 'QR Scan', headerTitle: 'QR Scan' }}
      />
    </EventStack.Navigator>
  );
}