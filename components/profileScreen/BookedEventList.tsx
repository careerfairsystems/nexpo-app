import React from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { Event } from '../../api/events';
import { EventListItem } from '../eventList/EventListItem';

type BookedEventListProps = {
  bookedEvents: Event[] | null,
  onPress: (eventId: number) => void,
}

const windowWidth = Dimensions.get('window').width;

export const BookedEventList = ({ bookedEvents, onPress }: BookedEventListProps) => 
  <FlatList
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    data={bookedEvents}
    keyExtractor={({ id }) => id.toString()}
    renderItem={({ item: event }) => 
      <View style={styles.item}>
        <EventListItem
          event={event} 
          booked={bookedEvents != null && bookedEvents.includes(event)}
          itemStyle={{width: windowWidth * 0.6}}
          onPress={() => onPress(event.id)} />
      </View>
      
    }
  />

  const styles = StyleSheet.create({
    item: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
  });
