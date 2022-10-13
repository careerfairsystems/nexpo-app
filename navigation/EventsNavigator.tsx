import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import EventListScreen from "../screens/EventListScreen";
import EventParticipantsScreen from '../screens/EventParticipantsScreen';
import QRScreen from '../screens/QRScreen';


export type EventStackParamlist = {
  EventListScreen: undefined;
  QRScreen: undefined;
  EventParticipantsScreen: {
    id: number;
  }
  EventDetailsScreen: {
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