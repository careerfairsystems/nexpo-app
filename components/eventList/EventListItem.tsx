import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '../Themed';

import { ListedEvent } from '../../api/events';

type ListedEventItemProps = {
  event: ListedEvent;
  onPress: () => void;
}

export const EventListItem = ({ event, onPress }: ListedEventItemProps) => 
  <Pressable onPress={onPress} style={styles.container}>
    <Text style={styles.eventName}>{event.name}</Text>
  </Pressable>

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
  },
  eventName: {
    fontSize: 18,
  }
})
