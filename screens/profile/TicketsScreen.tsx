import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';

import ScreenActivityIndicator from '../../components/ScreenActivityIndicator';
import { ArkadText } from '../../components/StyledText';

import { Ticket } from '../../api/tickets';
import { TicketList } from '../../components/ticketList/TicketList';
import { API } from '../../api';
import { TicketItem } from '../../components/ticketList/TicketItem';

export default function ProfileScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketItems, setTicketItems] = useState<TicketItem[]>([]);


  

  const getTickets = async () => {
    setLoading(true);

    const tickets = await API.tickets.getAllTickets();
    setTickets(tickets);

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
    // TODO: When pressing a ticket
    // Open the event in EventDetailsScreen perhaps?
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
      <View style={styles.container}>
        <TicketList
          ticketItems={ticketItems}
          onPress={viewTicket} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
