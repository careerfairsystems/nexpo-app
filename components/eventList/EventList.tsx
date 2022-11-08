import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { Event } from '../../api/events';
import Colors from '../../constants/Colors';
import { EventListItem } from './EventListItem';

type EventListProps = {
  events: Event[] | null;
  onPress: (id: number) => void;
}

const { width, height } = Dimensions.get('window')

export function EventList ({ events, onPress }: EventListProps) {
  if(events?.length == 0) {
    return (
      <Text style={styles.text}>No upcoming events =(</Text>
    )
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={events}
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item: event }) => 
        <View style={styles.eventBox}>
          <EventListItem
            event={event} 
            itemStyle={{}}
            onPress={() => onPress(event.id)} />
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  eventBox: {
    width: width * 0.95,
    height: height * 0.24
  },
  text: {
    paddingTop: 40,
    fontFamily: 'main-font-bold',
    fontSize: 32,
    color: Colors.darkBlue,
  },
});
