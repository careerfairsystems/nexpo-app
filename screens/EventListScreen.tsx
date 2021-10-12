import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import { Event } from '../api/events';
import { EventList } from '../components/eventList/EventList';
import { EventStackParamlist } from '../navigation/BottomTabNavigator';

type EventsNavigation = {
  navigation: StackNavigationProp<
    EventStackParamlist,
    'EventListScreen'
  >;
};

export default function CompaniesScreen({navigation}: EventsNavigation) {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [events, setEvents] = React.useState<Event[] | null>(null);
  const [bookedEvents, setBookedEvents] = React.useState<Event[] | null>(null);
  
  const getEvents = async () => {
    setLoading(true);

    const events = await API.events.getAllEvents();
    setEvents(events);
    const bookedEvents = await API.events.getBookedEvents();
    setBookedEvents(bookedEvents);

    setLoading(false);
  }

  const openEventDetails = (id: number) => {
    navigation.navigate('EventDetailsScreen', { id });
  }
  
  React.useEffect(() => {
    getEvents();
  }, []);
    
  return (
    <View style={styles.container}>
      {isLoading 
        ? <Text>Loading...</Text>
        : <EventList 
            events={events}
            bookedEvents={bookedEvents}
            onPress={openEventDetails} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
