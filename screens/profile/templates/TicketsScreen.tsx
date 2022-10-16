import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../../components/Themed';

import ScreenActivityIndicator from '../../../components/ScreenActivityIndicator';
import { ArkadText } from '../../../components/StyledText';

import { Ticket } from '../../../api/tickets';
import { TicketList } from '../../../components/ticketList/TicketList';
import { API } from '../../../api';
import { TicketItem } from '../../../components/ticketList/TicketItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../ProfileNavigator';
import { ScrollView } from 'react-native-gesture-handler';

export default function TicketScreen(navigation: StackNavigationProp<ProfileStackParamList,'ProfileSwitchScreen'>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketItems, setTicketItems] = useState<TicketItem[]>([]);

  const getTickets = async () => {
    setLoading(true);
    const tickets = await API.tickets.getAllTickets();

    const events = await API.events.getBookedEvents();
    const ticketItems: TicketItem[] = [];
    for (let i1 = 0; i1 < tickets.length; i1++) {
      for(let i2 = 0; i2 < events.length; i2++) {
        if(tickets[i1].eventId == events[i2].id) {
          const ticketItem: TicketItem = {
            ticket: tickets[i1],
            event: events[i2]
          }
          ticketItems.push(ticketItem);
          break;
        }
      }
    }
    setTicketItems(ticketItems);
    setLoading(false);
  }
  
  useEffect(() => {
    getTickets();
  }, []);

  const viewTicket = (ticketItem: TicketItem) => {
    const id = ticketItem.event.id;
    navigation.navigate('EventSwitchScreen', { id: id, screen: 'details' });
  }


  if (loading || ticketItems == undefined) {
    return (
      <View style={styles.container}>
        <ScreenActivityIndicator />
        <ArkadText text='Loading tickets...' style={{}} />
      </View>
    );
  }
  else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TicketList
            ticketItems={ticketItems}
            onPress={viewTicket} />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
