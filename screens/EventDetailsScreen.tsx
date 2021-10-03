import React, { useEffect, useState } from 'react';
import { StyleSheet, Systrace } from 'react-native';

import { Text, View } from '../components/Themed';

import { SingleEvent, TicketRequest } from '../api/events';
import { API } from '../api';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ButtonText } from '../components/StyledText';

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

  const createTicket = async () => {
    setLoading(true);
    console.log(event)

    if(event?.id == undefined) {
      return;
    }
    
    const ticketRequest: TicketRequest = {
      event_id: event.id,
      photo: true
    }
    
    const ticket = await API.events.createTicket(ticketRequest);

    setLoading(false);

    if (ticket != undefined) {
      alert('Registered to ' + event?.name + ' ' + event?.date);
    } 
    else {
      alert('Could not register to ' + event?.name + ' ' + event?.date);
    }
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
      <ArkadButton onPress={createTicket}>
        <ButtonText text="Register"></ButtonText>
      </ArkadButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
