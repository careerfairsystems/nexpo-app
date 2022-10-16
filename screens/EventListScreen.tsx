import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import { Event } from '../api/events';
import { EventList } from '../components/eventList/EventList';
import { EventStackParamlist } from "../navigation/EventsNavigator";
import { UpcomingButton } from '../components/eventList/UpcomingButton';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';

type EventsNavigation = {
  navigation: StackNavigationProp<
    EventStackParamlist,
    'EventListScreen'
  >;
};

export default function EventListScreen({navigation}: EventsNavigation) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState<Event[] | null>(null);
  const [upcomingEvents, setUpcomingEvents] = React.useState<Event[] | null>(null);
  const [showAllEvents, setShowAllEvents] = React.useState<boolean>(false);
  const [bookedEvents, setBookedEvents] = React.useState<Event[] | null>(null);
  
  const getEvents = async () => {
    setLoading(true);

    const events = await API.events.getAllEvents();
    setEvents(events);
    setUpcomingEvents(API.events.getUpcomingEvents(events));
    const bookedEvents = await API.events.getBookedEvents();
    setBookedEvents(bookedEvents);

    setLoading(false);
  }

  function switchEvents() {
    setShowAllEvents(!showAllEvents);
  }

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }
  
  React.useEffect(() => {
    getEvents();
  }, []);

  if (isLoading) {
    return (<View style={styles.container}>
      <ScreenActivityIndicator />
    </View>)
  }
    
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <UpcomingButton 
          showAllEvents={showAllEvents}
          onPress={switchEvents} />
        <EventList 
          events={showAllEvents ? events : upcomingEvents}
          bookedEvents={bookedEvents}
          onPress={openEventDetails} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
