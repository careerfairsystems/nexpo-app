import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import EventDetailsScreen from './EventDetailsScreen';
import EventListScreen from "./EventListScreen";


export type EventStackParamlist = {
  EventListScreen: undefined;
  EventDetailsScreen: {
    id: number;
  };
};
const EventStack = createStackNavigator<EventStackParamlist>();
export function EventsNavigator() {
  return (
    <EventStack.Navigator>
      <EventStack.Screen
        name="EventListScreen"
        component={EventListScreen}
        options={{ title: 'Events', headerTitle: 'Events' }} />
      <EventStack.Screen
        name="EventDetailsScreen"
        component={EventDetailsScreen}
        options={{ title: 'Event Details', headerTitle: 'Event Details' }} />
    </EventStack.Navigator>
  );
}
