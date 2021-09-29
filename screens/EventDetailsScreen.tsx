import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { SingleEvent } from '../api/events';

type EventDetailsScreenParams = {
  route: {
    params: {
      event: SingleEvent;
    };
  };
}

export default function EventDetailsScreen({ route }: EventDetailsScreenParams) {
  const { event } = route.params;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.title}>{event.location}</Text>
      <Text style={styles.title}>{event.start}</Text>
      <Text style={styles.title}>{event.end}</Text>
      <Text style={styles.title}>{event.event_info.description}</Text>
      <Text style={styles.title}>{event.event_info.host}</Text>
      <Text style={styles.title}>{event.event_info.language}</Text>
      <Text style={styles.title}>{event.event_info.capacity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    marginBottom: 2,
    backgroundColor: '#042657',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  title: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  listItem: {
    color: '#FFFFFF',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
