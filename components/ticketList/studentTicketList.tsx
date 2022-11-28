import React from 'react';
import { Text, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { TicketDto } from '../../api/Tickets';
import Colors from '../../constants/Colors';
import { StudentTicketListItem } from './studentTicketListItem';

type TicketListProps = {
  tickets: TicketDto[] | null;
}
const { width, height } = Dimensions.get('window')

export function StudentTicketList ({ tickets }: TicketListProps) {
  if(tickets?.length == 0 || tickets == null) {
    return (
      <Text style={styles.text}>No tickets =(</Text>
    )
  }
  
  tickets?.sort((a,b) => a.userFirstName.localeCompare(b.userFirstName));

  return (
    <FlatList
      style={{marginBottom: 160}}
      data={tickets}
      keyExtractor={({ ticket }) => ticket.id.toString()}
      renderItem={({ item: ticket }) => 
        <View style={styles.ticketsBox}>
          <StudentTicketListItem
            key={ticket.ticket.id}
            name={ticket.userFirstName + " " + ticket.userLastName} 
            isConsumed={ticket.ticket.isConsumed}/>
        </View>
      }
    />
  )
  
}
const styles = StyleSheet.create({
  ticketsBox: {
    width: width * 0.9,
    height: height * 0.07,
  },
  text: {
    paddingTop: 10,
    fontFamily: 'main-font-bold',
    fontSize: 24,
    color: Colors.darkBlue,
  },
});
