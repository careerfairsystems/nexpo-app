import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { Event } from 'api/events';
import { EventListItem } from '../eventList/EventListItem';

const { width, height } = Dimensions.get('window')

const getEmptyEvent = () => {
  const emptyEvent: Event = {
    start: "",
    name: "No booked events",
    description: "",
    host: "",
    language: "",
    location: "",
    id: 0,
    end: "",
    date: "",
    capacity: 0,
    ticketCount: 0,
  }
  return emptyEvent;
};

export const EmptyEventItem = () => 
  <View style={styles.eventObject}>
    <EventListItem 
      event={getEmptyEvent()} 
      booked={false}
      itemStyle={{}}
      onPress={() => {}} />
  </View>

  const styles = StyleSheet.create({
    eventObject:{
      paddingTop: '5%',
      width: width * 0.7,
      height: height * 0.22,
    },
  });
