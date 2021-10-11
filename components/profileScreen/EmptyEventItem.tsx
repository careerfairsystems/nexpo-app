import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { ListedEvent } from '../../api/events';
import { EventListItem } from '../eventList/EventListItem';

const { width, height } = Dimensions.get('window')

const getEmptyEvent = () => {
  const emptyEvent: ListedEvent = {
    start: "",
    name: "No booked events",
    location: "",
    id: 0,
    end: "",
    date: "",
    capacity: 0,
    tickets: 0,
  }
  return emptyEvent;
};

export const EmptyEventItem = () => 
  <View style={styles.eventObject}>
    <EventListItem 
      event={getEmptyEvent()} 
      booked={false}
      onPress={() => {}} />
  </View>

  const styles = StyleSheet.create({
    eventObject:{
      paddingTop: '5%',
      width: width * 0.7,
      height: height * 0.22,
    },
  });
