import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { format } from "date-fns";

import Colors from '../constants/Colors'

import { SingleEvent } from '../api/events';
import { TicketRequest } from '../api/tickets';

import { API } from '../api';
import ScreenActivityIndicator from '../components/ScreenActivityIndicator';
import { ArkadButton } from '../components/Buttons';
import { ArkadText } from '../components/StyledText';
import { Ionicons, MaterialIcons, MaterialCommunityIcons   } from '@expo/vector-icons';

type EventDetailsScreenParams = {
  route: {
    params: {
      id: number;
    };
  };
}

function convertDateFormat(date: string) {
  var d = new Date(date)
  return format(d, "LLL d");
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
    
    const ticket = await API.tickets.createTicket(ticketRequest);

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

  if (loading || event == undefined) {
    return (<ScreenActivityIndicator />);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ArkadText text={event.name} style={styles.title}/>
      </View>
      <View style={styles.headerContainer}>
        <View style={[styles.subHeaderContainer, {flex: 0.7}]}>
          <View style={styles.leftItem}>
            <Ionicons name="calendar" size={16} color="black"/>
            <ArkadText text={convertDateFormat(event.date) + "  :  " + event.start + " - " + event.end} style={styles.headerText}/>
          </View>
          <View style={styles.leftItem}>
            <Ionicons name="map" size={16} color="black"/>
            <ArkadText text={event.location} style={styles.headerText}/>
          </View>
          <View style={styles.leftItem}>
            <MaterialCommunityIcons name="microphone" size={16} color="black"/>
            <ArkadText text={event.event_info.host} style={styles.headerText}/>
          </View>
        </View>
        <View style={[styles.subHeaderContainer, {flex: 0.3}]}>
          <View style={styles.rightItem}>
            <Ionicons name="people" size={16} color="black"/>
            <ArkadText text={event.tickets + "/" + event.event_info.capacity} style={styles.headerText}/>
          </View>
          <View style={styles.rightItem}>
            <MaterialIcons name="language" size={16} color="black"/>
            <ArkadText text={event.event_info.language} style={styles.headerText}/>
          </View>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <ArkadText text={event.event_info.description} style={styles.description}/>
      </View>
      
      <ArkadButton onPress={createTicket} style={styles.button}>
        <ArkadText text="Register to event" style={styles.title}/>
      </ArkadButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '90%',
    marginTop: 20,
    height: 100,
    backgroundColor: Colors.darkBlue,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
  },
  title: {
    justifyContent: 'center',
    fontSize: 16,
  },
  headerContainer: {
    width: '90%',
    marginTop: 24,
    flexDirection: 'row',
    alignContent: 'center',
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-around'
  },
  leftItem: {
    marginTop: 16,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  rightItem: {
    marginTop: 16,
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.black,
    fontSize: 12,
    paddingHorizontal: 8,
    textAlign: 'left'
  },
  descriptionContainer: {
    marginTop: 40,
    width: '90%',
  },
  description: {
    color: Colors.black,
    fontSize: 14,
    textAlign: 'left'
  },
  button: {
    marginTop: 40,
    width: '90%',
    height: 40,
    padding: 40,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
