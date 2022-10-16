import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from './EventDetailsScreen';
import EventListScreen from "./EventListScreen";
import EventParticipantsScreen from './EventParticipantsScreen';
import QRScreen from './QRScreen';


export type EventStackParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    id: number;
  }
  EventParticipantsScreen: {
    id: number;
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
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ title: 'Event Details', headerTitle: 'Event Details' }}
      />
      <EventStack.Screen
        name="EventParticipantsScreen"
        component={EventParticipantsScreen}
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