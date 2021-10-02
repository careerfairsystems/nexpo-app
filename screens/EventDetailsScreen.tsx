import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import { SingleEvent } from '../api/events';
import { API } from '../api';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';

type EventDetailsScreenParams = {
  route: {
    params: {
      id: number;
    };
  };
}

export default function EventDetailsScreen({ route }: EventDetailsScreenParams) {
  const { id } = route.params;
  
  const [event, setEvent] = useState<SingleEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getEvent = async () => {
    setLoading(true);

    const event = await API.events.getSingleEvent(id);
    setEvent(event);

    setLoading(false);
  }

  useEffect(() => {
    getEvent();
  }, [])

  if (loading) return (<ScreenActivityIndicator />);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event?.name}</Text>
      <Text style={styles.title}>{event?.location}</Text>
      <Text style={styles.title}>{event?.start}</Text>
      <Text style={styles.title}>{event?.end}</Text>
      <Text style={styles.title}>{event?.event_info.description}</Text>
      <Text style={styles.title}>{event?.event_info.host}</Text>
      <Text style={styles.title}>{event?.event_info.language}</Text>
      <Text style={styles.title}>{event?.tickets}/{event?.event_info.capacity}</Text>
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
