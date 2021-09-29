import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { EventListParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { API } from '../api';
import { Company } from '../api/companies';
import { CompanyListItem } from '../components/ComanyListItem';
import { ListedEvent, SingleEvent } from '../api/events';
import { EventListItem } from '../components/eventList/EventListItem';

type EventsNavigation = {
  navigation: StackNavigationProp<
    EventListParamList,
    'EventListScreen'
  >
};

export default function CompaniesScreen({navigation}: EventsNavigation) {
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [events, setEvents] = React.useState<ListedEvent[] | null>(null);
  
    const getEvents = async () => {
      setLoading(true);
      const events = await API.events.getAllEvents();
      setEvents(events);
      setLoading(false);
    }

    const openEventDetails = async (id: number) => {
      const event = await API.events.getSingleEvent(id);
      navigation.navigate('EventDetailsScreen', { event });
    }
  
    React.useEffect(() => {
      getEvents();
    }, []);
    
    return (
      <View style={styles.container}>
        {isLoading 
          ? <Text>Loading...</Text>
          : <FlatList
              data={events}
              keyExtractor={({ id }) => id.toString()}
              renderItem={({ item }) => 
                <EventListItem
                  event={item} 
                  onPress={() => openEventDetails} />
                } />
        }
      </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
